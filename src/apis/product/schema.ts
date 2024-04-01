type ProductType = {
  id: number;
  productName: string;
  price: number;
  stock: number;
  sex: number;
}

export type AddProductImageReq = FormData;
export type AddProductImageRes = string;

export type AddProductReq = Omit<ProductType, 'id'> & {
  images: string[];
  sizes: string[];
}
export type AddProductRes = string;

export type GetProductsRes = (ProductType & {
  Sizes: { option: string }[];
  Images: { src: string }[];
})[];

export type PatchProductReq = ProductType & {
  images: string[];
  sizes: string[];
};
export type PatchProductRes = string;

export type RemoveProductReq = number;
export type RemoveProductRes = string;
