//일기 리스트 컴포넌트

import { useContext } from "react";
import DiaryItem from "./DiaryItem";
import {DiaryStateContext} from "./ReactTest3";
//onDelete -> App -> DiaryList -> DiaryItem
//diaryList컴포넌트는 app컴포넌트로부터 diaryList처럼 데이터 state를 prop으로 전달 받아서
//map함수를 통해서 렌더링을 하고 있는데, diaryList는 결국엔 app컴포넌트의 data값이니까
//이젠 prop으로 받을 필요가 없어서 삭제함 ->context 전역 prop으로 app에서 데이터를 주기때문에
const DiaryList = () => {
    //console.log(diaryList);
    //context에서 데이터 공급받기
    const diaryList = useContext(DiaryStateContext);
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
        <div>
            {diaryList.map((it)=> (
                <DiaryItem key={it.id} {...it} />
                /*
            <div key={it.id}>
                <div>작성자 : {it.author}</div>
                <div>일기 : {it.content}</div>
                <div>감정 : {it.emotion}</div>
                <div>작성시간(ms) : {it.create_date} </div>
            </div>
            */
            ))}
        </div>
    </div>
    );
};
DiaryList.defaultProps = {
    diaryList:[]
};

export default DiaryList;