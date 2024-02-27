import './index.scss';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import EditModal from 'components/modal/EditModal';
import { useQuery } from '@tanstack/react-query';
import apis from 'apis/index';
import { useRecoilValue } from 'recoil';
import { UserState } from 'store/index';

export type TargetType = {
  id: number;
  productName: string;
  price: number;
  sizes: string[];
  images: string[];
  stock: number;
  sex: number;
}

const targetInit = {
  id: -1,
  productName: '',
  price: -1,
  sizes: [''],
  images: [''],
  stock: -1,
  sex: -1
};

const MainPage = () => {
  const [target, setTarget] = useState<TargetType>(targetInit);
  const getUserState = useRecoilValue(UserState);
  const { data: productList } = useQuery({
    queryKey: ['getProducts'],
    queryFn: () => apis.Product.getProducts(),
    enabled: !!getUserState?.id
  });

  /** edit 버튼 클릭 시 */
  const onClickEdit = (targetId: number) => {
    if (!productList) {
      return;
    }
    const item = productList?.find(product => product.id === targetId);
    if (item) {
      setTarget({
        ...item,
        sizes: item.Sizes.map(size => size.option),
        images: item.Images.map(image => image.src)
      });
    }
  };
  
  return (
    <div className="main-page">
      <table>
        <colgroup>
          <col width={80} />
          <col width={'*'} />
          <col width={200} />
          <col width={200} />
          <col width={200} />
          <col width={200} />
        </colgroup>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>price</th>
            <th>stock</th>
            <th>sex</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {productList?.map(item => (
            <tr key ={`${item.id}${item.productName}`}>
              <td>
                {item.id}
              </td>
              <td>
                {item.productName}
              </td>
              <td>
                {item.price}
              </td>
              <td>
                {item.stock}
              </td>
              <td>
                {item.sex === 0 ? '여성' : '남성'}
              </td>
              <td>
                <button 
                  onClick={() => onClickEdit(item.id)}
                  className="edit-btn">
                  <EditIcon sx={{ fontSize: 20, color: 'white' }} />
                    Edit
                </button>
                <button className="delete-btn">
                  <DeleteIcon sx={{ fontSize: 20, color: 'white' }} />
                    Delete
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
      {target.id >= 0 && (
        <EditModal 
          onClose={() => setTarget(targetInit)}
          item={target}
        />
      )}
    </div>
  );
};

export default MainPage;