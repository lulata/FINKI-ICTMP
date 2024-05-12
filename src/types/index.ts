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
  shoppingCartId: number;
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
  sizes: ProductSize[];
  reviews: Review[];
};

export type Review = {
  createdOn: string;
  description: string;
  id: number;
  productId: number;
  rating: number;
  user: string;
};

export type ProductSize = {
  id?: number;
  name: string;
  quantity: number;
};

export type CartItem = {
  id: number;
  productCartItemResponse: Product;
  quantity: number;
  shoppingCartId: number;
  sizeId: number;
  sizeName: string;
};

export type Orders = {
  address: string;
  card: {
    cardNumber: string;
    cvv: number;
    id: number;
    holderName: string;
  };
  creditCardId: number;
  id: number;
  orderItems: {
    productOrderItemResponse: Product;
    quantity: number;
    shoppingCartId: number;
    id: number;
    sizeId: number;
    sizeName: string;
  }[];
  phoneNumber: string;
  status: string;
  time: string;
  total: number;
};
