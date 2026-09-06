import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const CART_STORAGE_KEY = 'boo_automotive_cart_v1';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cartItems]);

  const showToast = (message, item = null) => {
    setToastMessage({ message, item, timestamp: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || quantity <= 0) return;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            sku: product.sku,
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            image: product.images ? product.images[0] : product.image,
            inStock: product.inStock,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to cart.`, product);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((it) => it.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((it) => (it.id === productId ? { ...it, quantity: newQuantity } : it))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        total,
        toastMessage,
        dismissToast: () => setToastMessage(null)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
