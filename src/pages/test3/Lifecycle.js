import React, {useEffect, useState} from "react";

const UnmountTest = () => {

    useEffect(() => {
        console.log("Mount");

        return () => {
            //Unmount 시점에 실행되게 함
            console.log("Unmount!");
        }
    },[]);

    return <div>UnMount Testing Component</div>
}

const Lifecycle = () => {
    /*
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    //컴포넌트가 태어나면 실행 -> Mount
    useEffect(()=>{
        console.log("Mount!");
    },[]);
    //컴포넌트가 변화 했을 때 실행 -> Update
    //스테이트가 변경되거나 부모에게서 내려받는 prop가 바뀌거나, 부모컴포넌트가 리렌더링 될때
    //디펜던시[]를 전달하지 않으면 된다.
    useEffect(()=>{
        console.log("Update");
    });

    //useEffect의 특별한기능
    //디펜던시의 값이 변화하면 콜백함수가 수행이되는데
    //아래의 콜백함수는 count State가 변화하는 순간 호출함
    useEffect(()=>{
        console.log(`count is update : ${count}`)
        if(count > 5) {
            alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다.");
            setCount(1);
        }
    },[count]);
    //위와 마찬가지로 Text도 해보자
    useEffect(() => {
        console.log(`Text is update : ${text}`);
    },[text]);
*/
    
    //Unmount -> 컴포넌트가 화면에서 사라지기 이전에 호출해서 사용하는 메서드
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);
    return (
        <div style={{ padding : 20}}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest/>}
        </div>

        );
    };
      /*<div style={{padding : 20}}>
        <div>
            {count}
            <button onClick={()=>setCount(count+1)}>+</button>
        </div>
        <div>
            <input value={text} onChange={(e)=>setText(e.target.value)} />
        </div>
      </div>
      */
     


export default Lifecycle;