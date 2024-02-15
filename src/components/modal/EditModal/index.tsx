import { TargetType } from 'pages/MainPage';
import './index.scss';
import ProductForm from 'components/ProductForm';

interface IEditModalProps{
  item: TargetType;
  onClose : () => void;
}

const EditModal = ({
  item,
  onClose
}: IEditModalProps) => {

  console.log('item',item);
  
  return (
    <div onClick={onClose} className="edit-modal-bg">
      <div onClick={e => e.stopPropagation()} className="edit-modal-content">
        <ProductForm 
          item={item}
        />
      </div>
    </div>
  );
};

export default EditModal;