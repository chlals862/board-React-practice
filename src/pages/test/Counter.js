import React,{useState} from "react";
import OddEvenResult from "./OddEvenResult";
//상태를 사용함 - useState


//props - 부모(App.js에서 initialValue)에서 내려준 props를 매개변수로 받아와서 사용
const Counter = ({initialValue}) => { //비구조화 할당을 위해 props를 initialValue로 변경 + 중괄호
    //객체 안에 담겨서 옴
    //console.log(props);
    //객체 담겨 오는것을 꺼내 쓰려면
    //const[count,setCount] = useState(props.initialValue); 점표기법을 사용해야함


    //기본값이 0에서 출발하고,
    //1씩 증가하고, 1씩 감소하는
    //count 상태
    //useState - 리액트의 메서드, 배열을 반환, 배열의 비구조화 할당
    //0번째 index - count , 1번째 index - setCount라는 상수로 받아온 걸 확인 함
    //count는 상태의 값으로 활용 됨
    //setCount는 count라는 상태를 변화시키는 상태변화 함수로 사용이 됨
    //useState(0) - 0인자값은 카운트를 만드는데 초기값으로 사용이 됨

    //버튼클릭때마다 count가 변하여 Count()함수가 계속 새로 return하는데
    //이 컴포넌트는 자신이 가진 state가 변화하면 화면을 다시 그림(reRender)

    //useState(props.initialValue);를 비구조화 할당을 통해서도 받을 수 있음
    const [count,setCount] = useState(initialValue);
    
    //1씩 증가시키는 함수 만들기
    const onIncrease = () => {
        setCount(count + 1);
    };
    const onDecrease = () => {
        setCount(count - 1);
    };/*
    //여러개도 사용가능
    const [count2, setCount2] = useState(0);

    const onIncrease2 = () => {
        setCount2(count2 + 1);
    };
    const onDecrease2 = () => {
        setCount2(count2 - 1);
    };
*/
    //리액트와 jsx는 onclick=""가 아니라 {}안에 넣어서 사용함, 카멜케이스 방식으로 onClick
    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>
            <OddEvenResult count={count}/>

        </div>
    );
};
//defaultProps - 전달받지 못한 Props의 기본값을 설정해서 에러를 방지 할 수 있음
Counter.defaultProps = {
    initialValue : 0,
};

export default Counter;