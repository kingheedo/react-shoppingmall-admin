import { TargetType } from 'pages/MainPage';
import './index.scss';
import ProductForm from 'components/ProductForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from 'apis/index';
import { PatchProductReq } from 'apis/product/schema';

interface IEditModalProps{
  item: TargetType;
  onClose : () => void;
}

const EditModal = ({
  item,
  onClose
}: IEditModalProps) => {
  const queryClient = useQueryClient();
  const { mutate: editProduct } = useMutation({
    mutationFn: (data: PatchProductReq) => apis.Product.patchProduct(data),
    onSuccess: async(data) => {
      alert(data);
      await queryClient.invalidateQueries({
        queryKey: ['getProducts']
      });
      onClose();
    }
  });
  
  return (
    <div onMouseDown={onClose} className="edit-modal-bg">
      <div onMouseDown={e => e.stopPropagation()} className="edit-modal-content">
        <ProductForm 
          item={item}
          onSumbit={(data) => editProduct({
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            sex: Number(data.sex)
          })}
        />
      </div>
    </div>
  );
};

export default EditModal;