/**
 * Central Orders API Service
 * Handles server-side order calculation, creation, verification, and retrieval.
 * In production: wires up to POST /api/orders, GET /api/orders/:id, etc.
 */

const STORAGE_ORDERS_KEY = 'boo_orders_ledger_v1';

// Helper to get orders from mock storage
const getSavedOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const saveOrderToStorage = (order) => {
  try {
    const orders = getSavedOrders();
    orders[order.id] = order;
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save order to local storage', e);
  }
};

export const ordersApi = {
  /**
   * Create a new order (POST /api/orders)
   * The backend validates inventory, computes authorative pricing, and issues payment URL.
   */
  async createOrder({ customer, shippingAddress, items }) {
    await new Promise((res) => setTimeout(res, 600));

    if (!customer?.name || !customer?.phone) {
      throw new Error('Customer name and phone number are required.');
    }
    if (!shippingAddress?.governorate || !shippingAddress?.city || !shippingAddress?.address) {
      throw new Error('Complete shipping address is required.');
    }
    if (!items || items.length === 0) {
      throw new Error('Your cart is empty. Please add products to checkout.');
    }

    // Generate unique corporate order number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `BOO-${randomNum}`;

    // Backend authoritative calculations
    const subtotal = items.reduce((acc, it) => acc + (it.price * it.quantity), 0);
    const shipping = 100; // Flat rate shipping across Egypt
    const total = subtotal + shipping;

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'pending_payment',
      paymentStatus: 'unpaid',
      paymentMethod: 'Fawaterk Secure Gateway',
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email ? customer.email.trim() : null
      },
      shippingAddress: {
        governorate: shippingAddress.governorate,
        city: shippingAddress.city.trim(),
        address: shippingAddress.address.trim()
      },
      items: items.map((it) => ({
        productId: it.id,
        sku: it.sku,
        name: it.name,
        brand: it.brand || 'BOO OEM',
        image: it.images ? it.images[0] : it.image,
        unitPrice: it.price,
        quantity: it.quantity,
        totalPrice: it.price * it.quantity
      })),
      pricing: {
        subtotal,
        shipping,
        total,
        currency: 'EGP'
      },
      timeline: [
        { title: 'Order Created', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
        { title: 'Payment Confirmed', completed: false },
        { title: 'Preparing Order', completed: false },
        { title: 'Shipped', completed: false },
        { title: 'Delivered', completed: false }
      ]
    };

    saveOrderToStorage(newOrder);

    // Mock Fawaterk Hosted Payment URL returned by backend
    // In production: URL is https://app.fawaterk.com/invoice/...
    // Here we route to payment simulation flow
    const paymentUrl = `/payment/success?order_id=${orderId}&ref=fawaterk_${Date.now()}`;

    return {
      success: true,
      orderId,
      paymentUrl,
      order: newOrder
    };
  },

  /**
   * Fetch verified order state by ID (GET /api/orders/:id)
   */
  async getOrder(orderId) {
    await new Promise((res) => setTimeout(res, 350));

    const orders = getSavedOrders();
    const order = orders[orderId];

    if (!order) {
      // Return a default demo order if someone visits directly with an arbitrary ID
      return {
        success: true,
        order: {
          id: orderId || 'BOO-10025',
          createdAt: new Date().toISOString(),
          status: 'paid',
          paymentStatus: 'successful',
          paymentMethod: 'Fawaterk (Credit Card / Meeza / Fawry)',
          customer: {
            name: 'Ahmed Mahmoud',
            phone: '01122559066',
            email: 'ahmed.m@example.com'
          },
          shippingAddress: {
            governorate: 'Menoufia (المنوفية - شبين الكوم)',
            city: 'Shebin El-Kom',
            address: '19 El-Galaa El-Bahary Street, Next to BOO Center'
          },
          items: [
            {
              productId: 'sp-1',
              sku: 'BP-TC-001',
              name: 'Front Ceramic Brake Pad Set',
              brand: 'Toyota Genuine / OEM',
              image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80',
              unitPrice: 1500,
              quantity: 2,
              totalPrice: 3000
            }
          ],
          pricing: {
            subtotal: 3000,
            shipping: 100,
            total: 3100,
            currency: 'EGP'
          },
          timeline: [
            { title: 'Order Created', time: '10:15 AM', completed: true },
            { title: 'Payment Confirmed', time: '10:18 AM', completed: true },
            { title: 'Preparing Order', time: 'In Progress', current: true },
            { title: 'Shipped', completed: false },
            { title: 'Delivered', completed: false }
          ]
        }
      };
    }

    return {
      success: true,
      order
    };
  },

  /**
   * Verify and confirm payment with backend webhook authority
   * GET /api/orders/:id/verify-payment
   */
  async verifyPayment(orderId) {
    await new Promise((res) => setTimeout(res, 400));

    const orders = getSavedOrders();
    const order = orders[orderId];

    if (order) {
      order.status = 'paid';
      order.paymentStatus = 'successful';
      order.timeline[1].completed = true;
      order.timeline[1].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      order.timeline[2].current = true;
      saveOrderToStorage(order);
      return { success: true, verified: true, order };
    }

    return {
      success: true,
      verified: true,
      order: {
        id: orderId,
        status: 'paid',
        paymentStatus: 'successful'
      }
    };
  },

  /**
   * Retry payment for an existing pending order (POST /api/orders/:id/retry-payment)
   */
  async retryPayment(orderId) {
    await new Promise((res) => setTimeout(res, 300));
    return {
      success: true,
      paymentUrl: `/payment/success?order_id=${orderId}&ref=fawaterk_retry_${Date.now()}`
    };
  }
};
