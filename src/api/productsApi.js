import { SPARE_PARTS_CATALOG, SPARE_PARTS_CATEGORIES } from '../data/sparePartsProducts';

/**
 * Products API Service
 * Encapsulates all product fetching logic.
 * When connecting to backend: replace mock resolution with `fetch('/api/products...')`
 */

export const productsApi = {
  /**
   * Fetch list of spare parts with optional filtering
   * GET /api/products?category=...&search=...
   */
  async getSpareParts({ category = 'all', search = '', sort = 'featured' } = {}) {
    // Simulate real network latency (300ms)
    await new Promise((res) => setTimeout(res, 300));

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
          p.model.toLowerCase().includes(q) ||
          p.compatibility.some((c) => c.toLowerCase().includes(q))
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
    await new Promise((res) => setTimeout(res, 250));

    const product = SPARE_PARTS_CATALOG.find(
      (p) => p.id === idOrSku || p.sku.toLowerCase() === idOrSku.toLowerCase()
    );

    if (!product) {
      throw new Error(`Product with ID "${idOrSku}" was not found.`);
    }

    // Get related products in the same category
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
    return {
      success: true,
      data: SPARE_PARTS_CATEGORIES
    };
  }
};
