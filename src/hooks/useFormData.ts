import { useMutation } from '@tanstack/react-query';
import apis from 'apis/index';
import { useRef } from 'react';

/** input type=file 핸들러
 * 
 * 1. ref 사용
 * 2. ref 클릭 시 호출 함수 
 * 3. onchange 실행시 formdata에 이미지 등록, 이미지 등록 api호출 및 해당 값 반환
 */
const useFormData = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  
  /** 상품이미지 업로드 api */
  const { mutateAsync: addProductImage } = useMutation({
    mutationFn: (data: FormData) => apis.Product.addProductImage(data)
  });

  /** 등록 버튼 클릭시 */
  const onClickSubmit = () => {
    inputFileRef.current?.click();
  };

  /** input file 핸들러 */
  const onChangeFile = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const image = e.target.files && e.target.files[0];
    
    if (!image) {
      return;
    }
    formData.append('image', image);

    try {
      const res = await addProductImage(formData);

      return res;
    }
    catch (error) {
      console.error(error);
    }
  };

  return {
    inputFileRef,
    onClickSubmit,
    onChangeFile
  };

};
export default useFormData;