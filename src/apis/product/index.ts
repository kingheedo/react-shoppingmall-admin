import request from 'apis/request';
import { AddProductImageReq, AddProductImageRes, AddProductReq, AddProductRes, GetProductsRes } from './schema';

/** 상품 이미지 추가하기 */
const addProductImage = (data:AddProductImageReq) => {
  return request.post<AddProductImageRes>('/product/images',data).then(res => res.data);
};

/** 상품 추가하기 */
const addProduct = (data: AddProductReq) => {
  return request.post<AddProductRes>('/product',data).then(res => res.data);
};

/** 상품정보들 가져오기 */
const getProducts = () => {
  return request.get<GetProductsRes>('/admin/products').then(res => res.data);
};

export default {
  addProductImage,
  addProduct,
  getProducts
};
