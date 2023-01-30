//최적화2 6-11용

import React,{ useState,useEffect } from "react";

//2개의 자식 컴포넌트
const TextView = React.memo(({text}) => {
    useEffect(() => {
        console.log(`Update :: Text : ${text}`);
    })
    return <div>{text}</div>
});

const CountView = React.memo(({count}) => {
    useEffect(() => {
        console.log(`Update :: Count : ${count}`);
    })
    return <div>{count}</div>
});

//OptimizeTest => 컴포넌트를 재사용하는 실습용 
const OptimizeTest = () => {

    const [count,setCount] = useState(1);
    const [text,setText] = useState("");

    return <div style={{padding:50}}>
        <div>
            <h2>count</h2>
            <CountView count={count}/>
            <button onClick={() => setCount(count+1)}>+</button>
        </div>

        <div>
            <h2>text</h2>
            <TextView text={text}/>
            <input value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
    </div>
}

export default OptimizeTest;