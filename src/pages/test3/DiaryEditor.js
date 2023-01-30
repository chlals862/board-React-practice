import React,{useContext, useEffect,useRef,useState} from "react";
import { DiaryDispatchContext } from "./ReactTest3";
//useRef - > 어떤 엘리먼트에 포커스를 줘야 하는지 js코드가 알고 있어야 하는데
//dom요소를 선택할 수 있는 기능 -> useRef
//onCreate함수 -> 일기 저장하기 버튼을 눌렀을 때 데이터에 아이템을 추가하는 함수

//컴포넌트 최적화를 위해 DiaryEditor = React.memo를 하면 되지만 안에 있는 코드가 길기 때문에
//마지막 줄에 export default DiaryEditor에서 React.memo를 추가하자
const DiaryEditor =() => {
    //아래처럼 비구조화 할당으로 받아와야함 -> DiaryDispatchContext는 onCreate,onEdit,onRemove 3개의 함수로 이루어진 객체이기 때문에
    const {onCreate} = useContext(DiaryDispatchContext);
    //6-12 최적화3
    useEffect(() => {
        //콘솔이 2개 뜬다. App컴포넌트에서 처음 data스테이트 초기값이
        //빈배열인 상태에서 App컴포넌트가 한번 렌더링 일어나면서 다이어리 에디터도 한번 렌더링이 일어난다.
        //컴포넌트가 Mount 됐을때 호출한 getData()함수에서 결과를 setData()에 넣으면서
        //한번더 렌더링이 된다.
        //console.log("DiaryEditor 렌더");
    });


    const authorInput = useRef(); //작성자 인풋에 접근하기용
    const contentInput = useRef(); //textarea 인풋에 접근하기용

    //아래 두 개의 state와 이벤트 핸들링의 코드는 거의 비슷한데,
    //1개의 state로도 할 수 있다.
    const [state,setState] = useState({
        author : "",
        content : "",
        //select박스용
        emotion : 1 //기본값 1
    });

    //두 개의 이벤트 하나로 줄이기
    const handleChangeState = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = () => {
        //console.log(state);
        if(state.author.length < 1) {
            //alert("작성자는 최소 1글자 이상 입력해주세요."); 트렌디하지 않음
            //focus 작성자 인풋
            authorInput.current.focus();
            return; //더이상 진행이 되지 않도록 방지
        }

        if(state.content.length < 5) {
            //alert("일기 본문은 최소 5글자 이상 입력해주세요."); 트렌디하지 않음
            //focus textarea
            contentInput.current.focus();
            return; //더이상 진행이 되지 않도록 방지
        }

        //props로 받은 onCreate를 호출
        onCreate(state.author, state.content, state.emotion);
        //console.log(state); //저장한 일기는 state에 담겨져있음
        alert("저장 성공");
        //저장후에 초기화
        setState({
            author : "",
            content : "",
            emotion : 1,
        });
    }

    //const [author,setAuthor] = useState("");
    //textArea의 값은 이 content라는 스테이트가 가진 값으로 고정이 되어있음
    //const [content,setContent] = useState(""); 
    return ( 
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
            ref={authorInput} //인풋태그에 이제 접근이 가능함 useRef
            name = "author"
            value={state.author} 
            onChange={handleChangeState}
            placeholder="작성자"/*{(e)=>{
                //console.log(e.target.value);
                //console.log(e.target.name); //target element의 name도 가져올 수 있음
                //setAuthor(e.target.value);

                //작성자만 바뀌어야 함, 내용도 바뀌면 안되니까
                setState({
                    //content : state.content, 만약 수십개가 있다면 아래의 ...처럼
                    ...state,
                    author : e.target.value,
                });
            }}*/
            />
        </div>
        
        <div>
            <textarea 
            ref = {contentInput}
            name = "content"
            value={state.content} 
            onChange={handleChangeState}
            placeholder="일기"/*{(e) => {
                //setContent(e.target.value);

                //내용만 바뀌어야함, 작성자도 같이 바뀌면 안됨
                setState({
                    ...state,
                    content : e.target.value,
                });
            }}*/
            />
        </div>



        <div>
            <span>오늘의 감정점수 : </span>
            <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
        
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>

    </div>
    );
};
export default React.memo(DiaryEditor);

//select box 실행 순서
/*
1. state에 있는 emotion 프로퍼티가 셀렉트가 선택하는 값을 계속 해서 저장을함
2. 어떻게 저장을 시키냐면 - onChange로 인해 셀렉트박스의 변화가 일어나면
3. 온체인지 이벤트가 발생함 -> handleChangeState
4. handleChangeState에서  e.target.name -> "emotion"인데,
5. 온체인지로 인해 새로 값이 바뀌어 버리면(e.target.value)
6. 이 state가 변화가 되면서 이모션의 값이 변화가 된걸 select에 value로 사용하게 되면
7. 브라우저에서 자동으로 값이 바뀐다. 
*/ 