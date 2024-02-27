import request from 'apis/request';
import { AddProductImageReq, AddProductImageRes, AddProductReq, AddProductRes, GetProductsRes, PatchProductReq, PatchProductRes } from './schema';

/** 상품정보들 가져오기 */
const getProducts = () => {
  return request.get<GetProductsRes>('/admin/products').then(res => res.data);
};

/** 상품 이미지 추가하기 */
const addProductImage = (data:AddProductImageReq) => {
  return request.post<AddProductImageRes>('/admin/product/images',data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => res.data);
};

/** 상품 추가하기 */
const addProduct = (data: AddProductReq) => {
  return request.post<AddProductRes>('/admin/product',data).then(res => res.data);
};

/** 상품 정보 수정 */
const patchProduct = (data: PatchProductReq) => {
  return request.patch<PatchProductRes>('admin/product',data).then(res => res.data);
};

export default {
  getProducts,
  addProductImage,
  addProduct,
  patchProduct
};
