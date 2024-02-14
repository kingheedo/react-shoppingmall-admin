# Vite-React

## Usage

해당 프로젝트는 eslint, stylelint, 폴더 alias 세팅 등 기본 세팅이 적용된 template 입니다.

<br>

1. vscode 에 확장프로그램(extension) [ ***ESLint***, ***Stylelint*** ] 가 설치되어있어야 합니다.
2. vs code 세팅에 
```js
stylelint.validate: [
  "css",
  "scss"
]
```
가 있어야 합니다.

3. ```yarn install``` 실행.

4. rule 에 맞지 않음에도 빨간줄이 생기지 않거나 파일 저장 시 rule 에 의해 자동으로 수정 및 저장되지 않으면 vscode 를 껐다 켜주세요.

5. 그럼에도 빨간줄이 생기지 않으면 
```js
npx eslint src/App.tsx
```
를 실행하여 추가로 받아야하는 라이브러리가 있는지 확인합니다.(에러 내용 확인)

<br>
