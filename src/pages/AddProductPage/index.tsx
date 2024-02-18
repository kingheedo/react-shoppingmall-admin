
import ProductForm from 'components/ProductForm';
import './index.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from 'apis/index';
import { AddProductReq } from 'apis/product/schema';

const AddProductPage = () => {

  const queryClient = useQueryClient();
  /** 상품 등록 api */
  const { mutate: addProduct } = useMutation({
    mutationFn: (data: AddProductReq) => apis.Product.addProduct(data),
    onSuccess: () => {
      alert('상품 등록 완료');
      queryClient.invalidateQueries({
        queryKey: ['getProducts']
      });
    }
    // onSettled: () => {
    //   setInputVal({
    //     productName: '',
    //     price: 0,
    //     sizes: [],
    //     images: [],
    //     stock: 0,
    //     sex: -1
    //   });      
    // }
  });

  return (
    <div className="add-page">
      <ProductForm
        onSumbit={(data) => addProduct({
          ...data,
          price: Number(data.price),
          stock: Number(data.stock),
          sex: Number(data.sex)
        })}
      />
    </div>
  );
};
export default AddProductPage;