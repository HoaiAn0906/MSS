"use client";

import { getNumberCartItems } from "@/modules/cart/services/CartService";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const CartContext = createContext({
  numberCartItems: 0,
  fetchNumberCartItems: () => {},
});

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [numberCartItems, setNumberCartItems] = useState(0);

  useEffect(() => {
    fetchNumberCartItems();
  }, []);

  const fetchNumberCartItems = useCallback(() => {
    getNumberCartItems()
      .then((res) => setNumberCartItems(res))
      .catch((err) => console.log(err));
  }, []);

  const state = useMemo(
    () => ({
      numberCartItems,
      fetchNumberCartItems,
    }),
    [numberCartItems, fetchNumberCartItems]
  );

  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const { numberCartItems, fetchNumberCartItems } = useContext(CartContext);
  return { numberCartItems, fetchNumberCartItems };
};
