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