
import ProductForm from 'components/ProductForm';
import './index.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from 'apis/index';
import { AddProductReq, PatchProductReq } from 'apis/product/schema';

const AddProductPage = () => {

  const queryClient = useQueryClient();
  /** 상품 등록 api */
  const { mutate: addProduct, isSuccess } = useMutation({
    mutationFn: (data: AddProductReq) => apis.Product.addProduct(data),
    onSuccess: () => {
      alert('상품 등록 완료');
      queryClient.invalidateQueries({
        queryKey: ['getProducts']
      });
    },
    onError: () => {
      alert('상품 등록 에러 발생');
    }
  });
  
  const onSubmitForm = (data: PatchProductReq & AddProductReq) => {
    addProduct({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      sex: Number(data.sex)
    });
  };

  return (
    <div className="add-page">
      <ProductForm
        onSumbit={(data) => onSubmitForm(data)}
        isSuccess={isSuccess}
      />
    </div>
  );
};
export default AddProductPage;