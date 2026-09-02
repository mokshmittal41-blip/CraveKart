import { useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useCart() {
  const [cart, setCart] = useLocalStorage('cravekart_cart', []);

  const addToCart = useCallback((dish, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === dish.id);

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...dish, quantity }];
      }
    });
  }, [setCart]);

  const updateQuantity = useCallback((dishId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, [setCart]);

  const removeFromCart = useCallback((dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  }, [setCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  const cartSummary = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 40;
    const tax = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + tax + deliveryFee;

    return {
      totalItems,
      subtotal,
      deliveryFee,
      tax,
      grandTotal,
      freeDeliveryThreshold: 500,
      amountNeededForFreeDelivery: subtotal < 500 && subtotal > 0 ? 500 - subtotal : 0,
    };
  }, [cart]);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    ...cartSummary,
  };
}
