export type UserInfo = {
  creditCards: unknown[];
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  orders: unknown[];
  reviews: unknown[];
  role: 'ADMIN' | 'USER';
  shoppingCart: unknown[];
};

export type Category = {
  id?: number;
  name: string;
  description: string;
};

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: File | null;
  categoryId: number;
  color: string;
  gender: string;
  byteImage?: string;
};
