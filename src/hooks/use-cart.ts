'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

const KEY = ['cart'] as const;
const STORAGE = 'eg-cart';

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE) ?? '[]') as CartItem[];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(STORAGE, JSON.stringify(items));
}

export function useCart() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: KEY,
    queryFn: readCart,
    initialData: [],
    staleTime: Infinity,
  });

  function setItems(items: CartItem[]) {
    writeCart(items);
    queryClient.setQueryData(KEY, items);
  }

  function addItem(item: Omit<CartItem, 'qty'>, qty = 1) {
    const current = query.data ?? [];
    const existing = current.find(row => row.productId === item.productId);
    if (existing) {
      setItems(
        current.map(row =>
          row.productId === item.productId
            ? { ...row, qty: row.qty + qty }
            : row,
        ),
      );
      return;
    }
    setItems([...current, { ...item, qty }]);
  }

  function updateQty(productId: string, qty: number) {
    const current = query.data ?? [];
    setItems(
      qty <= 0
        ? current.filter(row => row.productId !== productId)
        : current.map(row =>
            row.productId === productId ? { ...row, qty } : row,
          ),
    );
  }

  function clear() {
    setItems([]);
  }

  const items = query.data ?? [];
  const total = items.reduce((sum, row) => sum + row.price * row.qty, 0);
  const count = items.reduce((sum, row) => sum + row.qty, 0);

  return { items, total, count, addItem, updateQty, clear };
}

export function useCartCount() {
  const { count } = useCart();
  return count;
}
