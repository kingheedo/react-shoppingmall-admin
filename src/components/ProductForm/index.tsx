import React, { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import './index.scss';
import apis from 'apis/index';
import { useMutation } from '@tanstack/react-query';
import backUrl from 'config/backUrl';
import classNames from 'classnames';
import { AddProductReq, PatchProductReq } from 'apis/product/schema';

type InputValType = {
  id: number;
  productName: string;
  price: number;
  stock: number;
  images: string[];
  sizes: string[];
  sex: number;
}

const sizeList = ['SM', 'M', 'L', 'XL'];

interface IProductFormProps{
  item?: InputValType
  onSumbit: (data: PatchProductReq & AddProductReq) => void;
}

const ProductForm = ({
  item,
  onSumbit
}: IProductFormProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const formData = new FormData();
  const [inputVal, setInputVal] = useState<InputValType>({
    id: item?.id || -1,
    productName: item?.productName || '',
    price: item?.price || 0,
    sizes: item?.sizes || [],
    images: item?.images || [],
    stock: item?.stock || 0,
    sex: item?.sex === 0 ? 0 : item?.sex || -1
  });
  
  /** 상품이미지 업로드 api */
  const { mutate: addProductImage } = useMutation({
    mutationFn: () => apis.Product.addProductImage(formData),
    onSuccess: (data) => {
      setInputVal({
        ...inputVal,
        images: [...data]
      });
    }
  });

  /** 폼 제출시 */
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.productName 
      || !inputVal.price 
      || inputVal.sizes.length === 0 
      || inputVal.images.length === 0 
      || inputVal.stock === 0) {
      return;
    }
    /** props의 submit 함수 실행 */
    onSumbit(inputVal);
    
  };

  /** 등록 버튼 클릭 시 */
  const onClickEnroll = () => {
    inputFileRef.current?.click();
  };

  /** 파일 이미지 선택 시 */
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const firstImage = e.currentTarget.files?.[0];
    const secondImage = e.currentTarget.files?.[1];
    if (!firstImage || !secondImage) {
      return;
    }
    formData.append('image', firstImage);
    formData.append('image', secondImage);

    addProductImage();
  };

  /** input 핸들러 */
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'sizes') {
      setInputVal({
        ...inputVal,
        sizes: inputVal.sizes.includes(e.target.value) 
          ? inputVal.sizes.filter(size => size !== e.target.value) 
          : [...inputVal.sizes, e.target.value]
      });

      return;
    } 
    if (e.target.name === 'price' || e.target.name === 'stock') {
      setInputVal({
        ...inputVal,
        [e.target.name]: e.target.value.replace(/[^\d]/g, '')
      });
      
      return;
    } 
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value
    });
  };

  /** 이미지 클릭 시
   * 
   * 1. 이미지 대상 선택(삭제대상 선택가능)
   */
  const onClickImage = (payload: number) => {
    // 
  };
  
  console.log('inputVal',inputVal);
  
  return (
    <div className="product-form">
      <form onSubmit={handleOnSubmit}>
        <div className="list-wrap">
          <label htmlFor="name">
            상품명
          </label>
          <div className="input-wrap">
            <input
              id="productName" 
              name="productName" 
              type="text"
              value={inputVal.productName}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="list-wrap">
          <label htmlFor="price">
            판매가
          </label>
          <div className="input-wrap">
            <input
              id="price" 
              name="price" 
              type="text"
              value={inputVal.price || ''}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="list-wrap">
          <label>
            사이즈
          </label>
          <div className="size-option-container">
            {sizeList.map(size => (
              <div key={size} className="op">
                {size}
                <input
                  id={size} 
                  name="sizes"
                  type="checkbox"
                  value={size}
                  checked={inputVal.sizes.includes(size)}
                  onChange={onChangeInput}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="list-wrap">
          <label htmlFor="stock">
            재고
          </label>
          <div className="input-wrap">
            <input 
              id="stock"
              name="stock"
              min={1}
              type="text" 
              value={inputVal.stock || ''}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="list-wrap">
          <label htmlFor="stock">
            성별
          </label>
          <div className="input-wrap">
            <label>
              여성
              <input 
                id="woman"
                type="radio" 
                name="sex"
                value={0}
                defaultChecked={inputVal.sex === 0}
                onChange={onChangeInput}
              />
            </label>
            <label>
              남성
              <input 
                id="man"
                type="radio" 
                name="sex"
                value={1}
                defaultChecked={inputVal.sex === 1}
                onChange={onChangeInput}
              />
            </label>
          </div>
        </div>
        <div className="list-wrap img">
          <label htmlFor="">
              상품이미지 등록
          </label>
          <div className="input-wrap">
            <div className={classNames('img-wrap', inputVal.images.length > 0 && 'exist')}>
              {inputVal.images.length > 0 ? (
                <img 
                  onClick={() => onClickImage(0)} 
                  src={`${backUrl}/${inputVal.images[0]}`} />
              ) : <UploadFileIcon fontSize="large" 
              />}
              {inputVal.images.length > 1 && (
                <img 
                  onClick={() => onClickImage(1)} 
                  src={`${backUrl}/${inputVal.images[1]}`} />
              ) }
              <button type="button" onClick={onClickEnroll}>등록</button>
            </div>
            <p>
              - 쇼핑몰에 기본으로 보여지는 상품이미지를 등록합니다.
            </p>
            <input 
              ref={inputFileRef}
              type="file"
              name={'image'}
              accept="image/*"
              onChange={onChangeFile}
            />
          </div>
        </div>
        <div className="submit-btn-wrap">
          <button type="submit">{item?.id ? '상품수정' : '상품등록'}</button>
        </div>
      </form>
    </div>
  );
};
export default ProductForm;