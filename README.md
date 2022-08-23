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
    - 검색한 키워드를 찾아내기 위해서 `replaceAll` 과 `split` 메서드를 사용하였고 `map`을 이용하여 각 각의 단어를 `span태그`로 감싸주었습니다. 
    <br/>
    
    ```javascript
        {el.nickname
          .replaceAll(props.keyword, `#$%${props.keyword}#$%`)
          .split("#$%")
          .map((search: string) => (
            <span
              key={uuidv4()}
              isMatched={props.keyword === search}
            >
              {search}
            </span>
        ))}
                    
       ```
  
<br/>

### 2. 데이터 필터링

https://user-images.githubusercontent.com/99471927/186065101-d337e4d6-a11d-43ac-9395-01caa73d4d5d.mov

- 보유 빌딩의 수와 클릭한 태그의 id값이 동일한지 여부에 대해서 알아야 했는데 반대로 정렬을 하면 해결할 수 있을 것 같았습니다. <br/>
   그래서 `flex-direction: row-reverse;` 와 `flex-wrap: wrap-reverse;` 를 사용해서 필터의 id값과 인덱스 번호를 통일시켜 현재 누른 필터가 무엇인지 알 수 있도록 하였습니다. 
- 보유 빌딩의 수가 5개 이상인 데이터를 요청할 때는 Rest-api의 operator인 `gte`를 사용해서 데이터를 요청하였습니다. 
`http://localhost:9000/data?_page=${page}?building_count_gte=5`


<br/>

### 3. PC, 태블릿, 모바일에 맞는 반응형 서비스 

### PC
<img width="678" alt="스크린샷 2022-08-23 오후 1 31 14" src="https://user-images.githubusercontent.com/99471927/186070258-dc6c1c1c-d331-406a-9649-892d34f69358.png">

### Tablet
https://user-images.githubusercontent.com/99471927/186070789-219bcbd2-d5fa-4c97-957b-21980b281f42.mov


### Mobile
https://user-images.githubusercontent.com/99471927/186070675-a8bdce21-4fdb-4080-bf9b-b97eb42c66f4.mov

