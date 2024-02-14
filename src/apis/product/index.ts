import request from 'apis/request';
import { AddProductImageReq, AddProductImageRes, AddProductReq, AddProductRes } from './schema';

const addProductImage = (data:AddProductImageReq) => {
  return request.post<AddProductImageRes>('/product/images',data).then(res => res.data);
};
const addProduct = (data: AddProductReq) => {
  return request.post<AddProductRes>('/product',data).then(res => res.data);
};

export default {
  addProductImage,
  addProduct
};
