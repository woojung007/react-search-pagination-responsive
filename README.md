# JEJODO Frontend Coding Test

## 프로젝트 시작하기
json-server 시작하기 : `yarn server`<br/>
react 시작하기 : `yarn start`

<br/>

## 사용한 기술 스택 및 라이브러리
`React` `Typescript` `recoil` `lodash`  `json-server` `Emotion` `react-icons`

<br/>

## 디렉토리 구조
### public

```
├── data/
│   └── db.json
├── images/
└── index.html

```

### src

```
├── components/
│   ├── board/
│   ├── filter/
│   └── pagination/
├── pages/
│   ├── board/
│   │    └── index.jsx
├── store/
│   └── recoil.ts
├── App.tsx
└── index.tsx

```

<br/>

## 상세 구현 사항


### 1. `lodash` 라이브러리를 사용한 키워드 실시간 검색 기능

https://user-images.githubusercontent.com/99471927/186064749-cddfd642-43c5-400e-a94f-10c4988645d4.mov

  - 키워드를 눌렀을 때 누른 키워드게 맞게 데이터가 새로 fetch 됩니다.
  - 키워드에 해당하는 단어의 배경 색상이 달라집니다. 
  
<br/>

### 2. 데이터 필터링

https://user-images.githubusercontent.com/99471927/186065101-d337e4d6-a11d-43ac-9395-01caa73d4d5d.mov

- `flex-direction: row-reverse;` 와 `flex-wrap: wrap-reverse;` 를 사용해서 필터의 id값과 인덱스 번호를 통일시켜 현재 누른 필터를 알 수 있도록 하였습니다. 
- 보유 빌딩의 수가 5개 이상인 데이터를 요청할 때는 Rest-api의 operator인 `gte`를 사용해서 데이터를 요청하였습니다. 
`http://localhost:9000/data?_page=${page}?building_count_gte=5`


<br/>

### 3. PC, 태블릿, 모바일에 맞는 반응형 서비스 

