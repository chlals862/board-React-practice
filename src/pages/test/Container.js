
//App.js에서 Container 태그 안에 있는 자식 요소들은
/*
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

    Container 컴포넌트에 children이라는 Prop으로 전달하게 된다.
    그래서 children에 위의 html,js요소들이 전달됨
*/
const Container = ({children}) => {
    return (<div style={{margin : 20, padding: 20, border: "1px solid gray"}}>
         {children}
    </div>
    );
};

export default Container;