const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://boobackend-production.up.railway.app/api';

const DEFAULT_PART_IMAGES = {
  engine: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
  brake: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80',
  suspension: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
  electrical: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
  filters: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
  accessories: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
};

export const productsApi = {
  /**
   * Fetch Hero Slides from DB
   * GET /api/slides
   */
  async getSlides() {
    try {
      const res = await fetch(`${API_BASE_URL}/slides`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return {
            success: true,
            data: json.data.map((s, idx) => ({
              id: s._id || idx + 1,
              title: s.title,
              badge: s.badge || 'BOO Solutions',
              description: s.description,
              ctaText: s.ctaText || 'Explore Now',
              ctaLink: s.ctaLink || '/spare-parts',
              secondaryCtaText: s.secondaryCtaText || '',
              secondaryCtaLink: s.secondaryCtaLink || '',
              image: s.image?.url || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=2000&q=85'
            }))
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load slides from API:', e);
    }
    return { success: false, data: [] };
  },

  /**
   * Fetch Website Content & Settings from DB
   * GET /api/content
   */
  async getContent() {
    try {
      const res = await fetch(`${API_BASE_URL}/content`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return { success: true, data: json.data };
        }
      }
    } catch (e) {
      console.warn('Failed to load website content from API:', e);
    }
    return { success: false, data: null };
  },

  /**
   * Fetch Maintenance Services from DB
   * GET /api/services
   */
  async getServices() {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return { success: true, data: json.data };
        }
      }
    } catch (e) {
      console.warn('Failed to load maintenance services from API:', e);
    }
    return { success: false, data: [] };
  },

  /**
   * Fetch list of spare parts with filtering
   * GET /api/products?category=...&search=...
   */
  async getSpareParts({ category = 'all', search = '', sort = 'featured', limit = '100' } = {}) {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());
      if (sort) params.append('sort', sort);
      params.append('limit', limit);

      const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const normalized = json.data.map((item) => {
            const catSlug = item.category?.slug || item.categorySlug || 'engine';
            const defaultImg = DEFAULT_PART_IMAGES[catSlug] || DEFAULT_PART_IMAGES.engine;
            const imgUrl = (item.images && item.images.length > 0)
              ? (typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url)
              : defaultImg;

            return {
              id: item._id || item.id,
              name: item.name,
              sku: item.sku,
              category: catSlug,
              categoryName: item.category?.name || catSlug,
              brand: item.brand,
              model: item.model || (item.compatibility ? item.compatibility[0] : ''),
              price: item.price,
              stock: item.stock !== undefined ? item.stock : 0,
              inStock: item.stock !== undefined ? item.stock > 0 : true,
              image: imgUrl || defaultImg,
              images: (item.images && item.images.length > 0)
                ? item.images.map((img) => (typeof img === 'string' ? img : img?.url)).filter(Boolean)
                : [imgUrl || defaultImg],
              badge: item.stock < 5 && item.stock > 0 ? 'Low Stock' : item.stock === 0 ? 'Out of Stock' : 'In Stock',
              rating: 4.9,
              reviewsCount: 15,
              featured: item.featured || false,
              description: item.description || '',
              shortDescription: item.shortDescription || '',
              compatibility: item.compatibility || []
            };
          });
          return {
            success: true,
            data: normalized,
            total: json.pagination?.total || normalized.length
          };
        }
      }
    } catch (e) {
      console.warn('Products endpoint error:', e);
    }
    return { success: false, data: [], total: 0 };
  },

  /**
   * Fetch single product details by ID or SKU
   * GET /api/products/:id
   */
  async getSparePart(idOrSku) {
    const res = await fetch(`${API_BASE_URL}/products/${idOrSku}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const item = json.data.product || json.data;
        const catSlug = item.category?.slug || item.categorySlug || 'engine';
        const defaultImg = DEFAULT_PART_IMAGES[catSlug] || DEFAULT_PART_IMAGES.engine;
        const normalized = {
          id: item._id || item.id,
          name: item.name,
          sku: item.sku,
          category: item.category?.slug || item.categorySlug,
          categoryName: item.category?.name || item.categorySlug,
          brand: item.brand,
          price: item.price,
          stock: item.stock !== undefined ? item.stock : 0,
          inStock: item.stock !== undefined ? item.stock > 0 : true,
          image: item.images && item.images.length > 0 ? item.images[0].url : defaultImg,
          images: item.images && item.images.length > 0 ? item.images.map((img) => img.url) : [defaultImg],
          badge: item.stock > 0 ? 'In Stock' : 'Out of Stock',
          rating: 4.9,
          reviewsCount: 18,
          description: item.description || '',
          shortDescription: item.shortDescription || '',
          compatibility: item.compatibility || [],
          specs: item.specs && item.specs.length > 0
            ? item.specs.map(s => ({ label: s.key, value: s.value }))
            : [
                { label: 'Brand', value: item.brand },
                { label: 'SKU Code', value: item.sku },
                { label: 'Category', value: item.category?.name || 'Spare Parts' }
              ]
        };

        return {
          success: true,
          data: normalized,
          related: json.data.related || []
        };
      }
    }
    throw new Error(`Product "${idOrSku}" not found.`);
  },

  /**
   * Fetch all accessories with optional filtering
   * GET /api/accessories
   */
  async getAccessories({ category = 'all', search = '', sort = 'createdAt', limit = '100' } = {}) {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());
      if (sort) params.append('sort', sort);
      params.append('limit', limit);

      const res = await fetch(`${API_BASE_URL}/accessories?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const defaultImg = DEFAULT_PART_IMAGES.accessories;
          const normalized = json.data.map((item) => {
            const imgUrl = item.images && item.images.length > 0
              ? (typeof item.images[0] === 'string' ? item.images[0] : item.images[0]?.url)
              : defaultImg;

            return {
              id: item._id || item.id,
              name: item.name,
              sku: item.sku,
              category: item.categorySlug || 'accessories',
              categoryName: item.category?.name || 'Accessories',
              brand: item.brand,
              price: item.price,
              stock: item.stock !== undefined ? item.stock : 0,
              inStock: item.stock !== undefined ? item.stock > 0 : true,
              image: imgUrl || defaultImg,
              images: item.images && item.images.length > 0
                ? item.images.map((img) => (typeof img === 'string' ? img : img?.url)).filter(Boolean)
                : [imgUrl || defaultImg],
              badge: item.stock < 5 && item.stock > 0 ? 'Low Stock' : item.stock === 0 ? 'Out of Stock' : 'In Stock',
              rating: 4.8,
              reviewsCount: 8,
              featured: item.featured || false,
              description: item.description || '',
              shortDescription: item.shortDescription || '',
              compatibility: item.compatibility || []
            };
          });
          return { success: true, data: normalized, total: json.pagination?.total || normalized.length };
        }
      }
    } catch (e) {
      console.warn('Accessories endpoint error:', e);
    }
    return { success: false, data: [], total: 0 };
  },

  /**
   * Fetch single accessory by ID or SKU
   * GET /api/accessories/:id
   */
  async getAccessory(idOrSku) {
    const res = await fetch(`${API_BASE_URL}/accessories/${idOrSku}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const item = json.data.product || json.data;
        const defaultImg = DEFAULT_PART_IMAGES.accessories;
        const normalized = {
          id: item._id || item.id,
          name: item.name,
          sku: item.sku,
          category: item.categorySlug || 'accessories',
          categoryName: item.category?.name || 'Accessories',
          brand: item.brand,
          price: item.price,
          stock: item.stock !== undefined ? item.stock : 0,
          inStock: item.stock !== undefined ? item.stock > 0 : true,
          image: item.images && item.images.length > 0 ? item.images[0].url : defaultImg,
          images: item.images && item.images.length > 0 ? item.images.map((img) => img.url) : [defaultImg],
          badge: item.stock > 0 ? 'In Stock' : 'Out of Stock',
          rating: 4.8,
          reviewsCount: 8,
          description: item.description || '',
          shortDescription: item.shortDescription || '',
          compatibility: item.compatibility || [],
          specs: [
            { label: 'Brand', value: item.brand },
            { label: 'SKU Code', value: item.sku },
            { label: 'Category', value: item.category?.name || 'Car Accessories' }
          ]
        };
        return { success: true, data: normalized, related: json.data.related || [] };
      }
    }
    throw new Error(`Accessory "${idOrSku}" not found.`);
  },

  /**
   * Get all product categories from DB
   * GET /api/categories
   */
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const totalCount = json.data.reduce((acc, c) => acc + (c.productCount || 0), 0);
          const mapped = [
            { id: 'all', name: 'All Categories', slug: 'all', icon: 'Layers', count: totalCount },
            ...json.data.map((c) => ({
              id: c.slug || c._id,
              name: c.name,
              slug: c.slug,
              icon: c.icon || 'Cpu',
              count: c.productCount || 0
            }))
          ];
          return {
            success: true,
            data: mapped
          };
        }
      }
    } catch (e) {
      console.warn('Categories endpoint error:', e);
    }
    return {
      success: true,
      data: [{ id: 'all', name: 'All Categories', slug: 'all', icon: 'Layers', count: 0 }]
    };
  }
};
