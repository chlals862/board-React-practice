//import './App.css';
//인라인스타일링은 아래 const Style처럼

import React from 'react';
import MyHeader from './MyHeader';
import Counter from './Counter';
import Container from './Container';
//import MyFooter from './MyFooter';
function App() {

  let name = "최민호"
  //인라인 스타일링 -> import css빼고
  const style = {
    App : {
      backgroundColor : 'white',
    },
    h2: {
      color:"red"
    },
    bold_text: {
      color: "green",
    },
  }

  const func = () => {
    return 'func함수 출력';
  };

  const number = 5;

  //State - Counter.js

  //jsx -> js와 html을 합쳐서 사용할 수 있는 문법
  
  //jsx의 표현식은 반드시 1개의 부모가 필요함, 하나의 최상위 태그로 다른 모든 태그들을 묶어야함
  //그러고 싶지않으면 react.Fragment사용하면 됨 <React.Fragment>가 싫다면 그냥 <>로 해도 됨
  //jsx에서 class는 js예약어이기 떄문에 못씀, className으로 씀

  //props용 -> <Counter a={1} b={2} c={3} d={4} e={5} initialValue={5}/> 
  //위처럼 전달하는 것은 너무 코드가 길고 비효율적임
  //아래처럼
  const counterProps = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
    e : 5,
    //initialValue : 5, 만약 이게 없으면 Counter.js로 가서 
    //Counter.defaultProps = {
    //  initialValue : 0
    //} 으로 할 수 있음
  };

  return (
    <Container>
    <div style={style.App}>
      <MyHeader />
        <h2 style={style.h2}>안녕 리액트 {name}, {1 + 2}, {func()}</h2>
        <b style={style.bold_text}>
          {number}는 : {number % 2 === 0 ? "짝수" : "홀수"}
        </b>
       
        <div>
          <Counter {...counterProps}/> 
        </div>
      </div>

      </Container>
  );
}

//내보내는것 같긴 한데, module.export ={}방식이 아니였음
//새로운 리액트가 주로 사용하는 es모듈시스템,
//이 App이라는 내보내게 되면, 다른 파일에서 import App from "경로"로 가져올 수 있음
//1개만 내보낼 수 있음
export default App;
