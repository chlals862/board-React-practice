import React,{ useContext, useEffect, useRef,useState } from "react";
import { DiaryDispatchContext } from "./ReactTest3";

const DiaryItem = ({
    author,
    content,
    create_date,
    emotion,
    id,
    //Remove,Edit -> App component로부터 받은 함수
    //onRemove,
    //onEdit
}) => {

    const {onRemove, onEdit} = useContext(DiaryDispatchContext);
    

    /*
        수정버튼 클릭시 내용이 수정을 할 수 있는 폼이 나타나야 함
        그래서 이것을 state로 만들어보자 - 기본값 false
        true, false는 현재 수정중인지 아닌지 판단하기 위함
    */
   const [isEdit, setIsEdit] = useState(false);
   //toggleIsEdit은 호출이 되는 순간 원래 isEdit이 갖고 있던 값을 반전 시킨다.
   //true -> false,   false -> true 
   //이 toggleIsEdit을 수정하기 버튼 클릭 했을때로 선언
   // <div className="content">{content}</div> 의 {content}를 삭제후 
   //새로운 코드로 변경
   const toggleIsEdit = () => setIsEdit(!isEdit);

    //수정폼에 입력한 데이터들도 리액트에서 state로 핸들링하게 만들어보자
    //useState(content)는 원래 있었던 값을 기본값으로 함, 수정취소,수정을 눌러도 값 유지
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef(); //포커스용
    //삭제하기 버튼을 보면, onClick 이벤트 핸들러가 길어서 여기 위치로 이동
    const handleRemove = () => {
        console.log(id);
            if(window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)){
                onRemove(id);
            }
    };
    //수정시 기존에 있던값에 다른 값을 추가 한뒤에 수정 취소를 하고
    //다시 수정하기 버튼을 하면 추가한 값이 남아 있는다.
    //왜냐하면 새로 추가한 값은 content가 아니라 localContent이기 때문에 아래와 같이 처리
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    //데이터는 위에서 아래, 이벤트는 아래에서 위로 가므로
    //수정완료시 이벤트를 App컴포넌트로 전달하기 위해서는 data를 가지고 있는
    //app 컴포넌트의 수정하는 기능을 하는 함수를 만들어서 DiaryItem 컴포넌트까지
    //보내줘야 한다.

    //수정하기
    const handleEdit =() => {
        //검사
        if(localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
            //targetId와 새로 전달된 localContent
            onEdit(id,localContent);
            toggleIsEdit(); //수정폼 닫기
        }

    }

    return <div className="DiaryItem">
        <div className="info">
            <span>작성자 : {author} | 감정점수 : {emotion}</span>
            <br/>
            <span className="date">
                {new Date(create_date).toLocaleString()}
            </span>
        </div>

        <div className="content">
            {isEdit ? <><textarea 
            ref={localContentInput}
            value={localContent} 
            onChange={(e) => setLocalContent(e.target.value)} /></> 
            :
            <>{content}</> }
        </div>
        {isEdit ? <>
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
        </> 
        :
        <>
            <button onClick={handleRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
        </>}
       
    </div>
}

export default React.memo(DiaryItem);