import React, { useRef, useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import './index.scss';
import apis from 'apis/index';
import { useMutation } from '@tanstack/react-query';
import backUrl from 'config/backUrl';

type InputValType = {
  productName: string;
  price: number;
  stock: number;
  images: string[];
  sizes: string[];
  sex: number;
}

const sizeList = ['SM', 'M', 'L', 'XL'];

const AddProductPage = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const formData = new FormData();
  const [inputVal, setInputVal] = useState<InputValType>({
    productName: '',
    price: 0,
    sizes: [],
    images: [],
    stock: 0,
    sex: -1
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
  /** 상품 등록 api */
  const { mutate: addProduct } = useMutation({
    mutationFn: () => apis.Product.addProduct(inputVal),
    onSuccess: () => {
      alert('상품 등록 완료');
    },
    onSettled: () => {
      setInputVal({
        productName: '',
        price: 0,
        sizes: [],
        images: [],
        stock: 0,
        sex: -1
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
    addProduct();
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
    } else {
      setInputVal({
        ...inputVal,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <section className="add-product">
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
              type="number" 
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
                value="woman"
                onChange={onChangeInput}
              />
            </label>
            <label>
              남성
              <input 
                id="man"
                type="radio" 
                name="sex"
                value="man"
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
            <div className="img-wrap">
              {inputVal.images.length > 0 ? <img src={`${backUrl}/${inputVal.images[0]}`} /> : <UploadFileIcon fontSize="large" />}
              {inputVal.images.length > 1 && <img src={`${backUrl}/${inputVal.images[1]}`} /> }
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
          <button type="submit">상품등록</button>
        </div>
      </form>
    </section>
  );
};
export default AddProductPage;