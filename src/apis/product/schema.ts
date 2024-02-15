type ProductType = {
  id: number;
  productName: string;
  price: number;
  Sizes: { option: string }[];
  Images: { src: string }[];
  stock: number;
  sex: number;
}

export type AddProductImageReq = FormData;
export type AddProductImageRes = string[];

export type AddProductReq = {
  productName: string;
  price: number;
  stock: number;
  images: string[];
  sizes: string[];
}
export type AddProductRes = any;

export type GetProductsRes = ProductType[];