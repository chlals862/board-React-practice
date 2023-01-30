//최적화2 6-11용
//OptimizeTest1과 다른 방법
import React,{ useState,useEffect } from "react";

//CounterA는 상태변화가 없기때문에 바뀌지 않음 setCount에서 count를 부르기 때문
const CounterA = React.memo(({count}) => {

    useEffect(() => {
        console.log(`CounterA Update - count :  ${count}`);
    });

    return <div>{count}</div>
});
//CounterB 는 리렌더링이 일어남 
//왜냐하면, prop인 obj가 객체이기 때문이다
//객체를 비교할때는 얕은 비교를 하기 때문에, 이런 문제가 발생한다.
//이것에 대해선6-11강 21분36초부터
//서로 다른 객체의 값이 같은데 비교를 해도 다른이유 , 객체의 주소가 다르기 때문
//한마디로 비원시 타입의 자료형을 비교할 때 값에 의한 비교가 아닌 주소에 의한 비교인 얕은 비교를 하기 때문이다.

//같게 하려면 a객체,b객체가 있을때 a = b;
const CounterB = ({obj}) => {

    useEffect(() => {
        console.log(`CounterB Update - count : ${obj.count}`);
    });

    return <div>{obj.count}</div>
};
//위의 얕은비교를 제대로 하기 위해 아래와 같이 작성
const areEqual = (prevProps, newxtProps) => {
    return prevProps.obj.count === newxtProps.obj.count;
   /*
    if(prevProps.obj.count === newxtProps.obj.count) {
        return true;
    }
    return false;
    */
    //return true -> 이전 프롭스와 현재 프롭스가 같다. ->리렌더링을 일으키지 않음
    //return false -> 이전과 현재가 다르다 -> 리렌더링을 함
    //https://ko.reactjs.org/docs/react-api.html 참고
};
//카운터B는 areEqual에 따라서 CounterB가 리렌더를 할지 말지 판단함
const MemoizedCounterB = React.memo(CounterB, areEqual);

//OptimizeTest => 컴포넌트를 재사용하는 실습용 
const OptimizeTest2 = () => {



    const [count,setCount] = useState(1);
    const [obj,setObj] = useState({
        count: 1
    });

    return (
        <div style={{padding:50}}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count}/>
                <button onClick={()=>setCount(count)}>A Button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj = {obj}/>
                <button onClick={() => setObj({
                    count : obj.count
                })}>B Button</button>
            </div>

        </div>   
    )
}

export default OptimizeTest2;