import { SPARE_PARTS_CATALOG, SPARE_PARTS_CATEGORIES } from '../data/sparePartsProducts';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Products API Service
 * Connects to live Node.js backend with robust local fallback for reliability.
 */
export const productsApi = {
  /**
   * Fetch list of spare parts with optional filtering
   * GET /api/products?category=...&search=...
   */
  async getSpareParts({ category = 'all', search = '', sort = 'featured' } = {}) {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());
      if (sort) params.append('sort', sort);

      const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          // Normalize items for frontend component consumption
          const normalized = json.data.map((item) => ({
            id: item._id || item.id,
            name: item.name,
            sku: item.sku,
            category: item.category?.slug || item.category?.name || item.category,
            brand: item.brand,
            carModel: item.compatibility ? item.compatibility.join(', ') : item.brand,
            price: item.price,
            stock: item.stock !== undefined ? item.stock : 10,
            stockCount: item.stock !== undefined ? item.stock : 10,
            inStock: item.stock !== undefined ? item.stock > 0 : (item.inStock !== undefined ? Boolean(item.inStock) : true),
            image: item.images && item.images.length > 0 ? item.images[0].url : 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
            images: item.images && item.images.length > 0 ? item.images.map((img) => img.url) : [],
            badge: item.badge || (item.stock < 5 && item.stock > 0 ? 'Low Stock' : 'In Stock'),
            rating: item.rating || 4.9,
            reviewsCount: item.reviewsCount || 12,
            isOem: item.isOem !== undefined ? item.isOem : true,
            featured: item.featured || false,
            description: item.description,
            compatibility: item.compatibility || []
          }));
          return {
            success: true,
            data: normalized,
            total: normalized.length
          };
        }
      }
    } catch (e) {
      console.warn('Backend products endpoint offline, using local fallback:', e);
    }

    // Local Fallback
    let items = [...SPARE_PARTS_CATALOG];

    if (category && category !== 'all') {
      items = items.filter((p) => p.category === category);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          (p.compatibility && p.compatibility.some((c) => c.toLowerCase().includes(q)))
      );
    }

    if (sort === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
      success: true,
      data: items,
      total: items.length
    };
  },

  /**
   * Fetch single product details by ID or SKU
   * GET /api/products/:id
   */
  async getSparePart(idOrSku) {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${idOrSku}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const item = json.data;
          const normalized = {
            id: item._id || item.id,
            name: item.name,
            sku: item.sku,
            category: item.category?.slug || item.category?.name || item.category,
            brand: item.brand,
            price: item.price,
            stock: item.stock !== undefined ? item.stock : 10,
            stockCount: item.stock !== undefined ? item.stock : 10,
            inStock: item.stock !== undefined ? item.stock > 0 : (item.inStock !== undefined ? Boolean(item.inStock) : true),
            image: item.images && item.images.length > 0 ? item.images[0].url : 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
            images: item.images && item.images.length > 0 ? item.images.map((img) => img.url) : [],
            badge: item.badge || 'In Stock',
            rating: 4.9,
            reviewsCount: 18,
            isOem: item.isOem !== undefined ? item.isOem : true,
            description: item.description,
            compatibility: item.compatibility || [],
            specs: [
              { label: 'Brand / Manufacturer', value: item.brand },
              { label: 'OEM SKU Code', value: item.sku },
              { label: 'Category', value: item.category?.name || item.category || 'Automotive Parts' },
              { label: 'Condition', value: '100% Brand New Genuine OEM' },
              { label: 'Stock Status', value: item.stock > 0 ? `${item.stock} Units Available` : 'Out of Stock' }
            ]
          };

          return {
            success: true,
            data: normalized,
            related: json.related || []
          };
        }
      }
    } catch (e) {
      console.warn('Backend product details offline, using local fallback:', e);
    }

    // Fallback
    const product = SPARE_PARTS_CATALOG.find(
      (p) => p.id === idOrSku || p.sku.toLowerCase() === idOrSku.toLowerCase()
    );

    if (!product) {
      throw new Error(`Product with ID "${idOrSku}" was not found.`);
    }

    const related = SPARE_PARTS_CATALOG.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 3);

    return {
      success: true,
      data: product,
      related
    };
  },

  /**
   * Get all product categories
   * GET /api/categories
   */
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const totalLocalCount = SPARE_PARTS_CATALOG.length;
          const totalBackendCount = json.data.reduce((acc, c) => acc + (c.productCount || 0), 0);
          const finalTotal = Math.max(totalBackendCount, totalLocalCount);

          const mapped = [
            { id: 'all', name: 'All Categories', slug: 'all', icon: 'Layers', count: finalTotal },
            ...json.data.map((c) => {
              const localCategoryCount = SPARE_PARTS_CATALOG.filter(
                (p) => p.category === c.slug || p.categorySlug === c.slug
              ).length;
              const actualCount = (c.productCount !== undefined && c.productCount > 0)
                ? c.productCount
                : (localCategoryCount || 0);

              return {
                id: c.slug || c._id,
                name: c.name,
                slug: c.slug,
                icon: c.icon || 'Cpu',
                count: actualCount
              };
            })
          ];
          return {
            success: true,
            data: mapped
          };
        }
      }
    } catch (e) {
      console.warn('Backend categories offline, using local fallback:', e);
    }

    return {
      success: true,
      data: SPARE_PARTS_CATEGORIES
    };
  }
};
