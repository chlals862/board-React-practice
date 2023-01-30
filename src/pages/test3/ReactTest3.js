import React,{ useMemo,useEffect, useRef, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
//import Lifecycle from './Lifecycle';
//import OptimizeTest from './OptimizeTest1';
//import OptimizeTest2 from './OptimizeTest2';
//api사용주소
//https://jsonplaceholder.typicode.com/comments




//일기 리스트 테스트용
/*
const dummyList =[
  {
    id : 1,
    author : "최민호",
    content : "일기1",
    emotion : 5,
    create_date : new Date().getTime(),
  },
  {
    id : 2,
    author : "오병호",
    content : "일기2",
    emotion : 3,
    create_date : new Date().getTime(),
  },
  {
    id : 3,
    author : "조재희",
    content : "일기3",
    emotion : 3,
    create_date : new Date().getTime(),
  },
  {
    id : 4,
    author : "박현철",
    content : "일기4",
    emotion : 4,
    create_date : new Date().getTime(),
  },
]
*/
//로직분리 6-13
const reducer = (state,action) => {
  switch(action.type) {
    case "INIT" :{
      return action.data; //getData함수에서 dispath을 일으켰을때 type을 "INIT"
                          //이라고 전달하면서 어떤데이터로 초기화 할것이냐 라고 지칭하는
                          //data 프로퍼티에 initData를 넣어놨기 때문에 return action.data
                          //reducer에서 받았을떈 action객체에서 data프로퍼티를 꺼내서
                          //그 값을 return해주면 action.data가 새로운 state가 된다.
    }

    case "CREATE" : {
      //create_date를 못받았기 때문에 여기서 작성
      const create_date = new Date().getTime();
      const newItem = {...action.data, 
                          create_date
                      }
      return [newItem, ...state];
    }

    case "REMOVE" : {
      return state.filter((it) => it.id !== action.targetId);
    }

    case "EDIT" : {
      return state.map((it) => it.id === action.targetId ? 
                {...it,content : action.newContent} : it
                );
    }
      
    default :
    return state;
  }
};


//data 스테이트를 전역적으로 공급할 수 있도록 도와줄 Context 생성
//app 컴포넌트에서는 App하나만 내보내고 있는데
//context도 내보내줘야한다.
//내보내줘야 다른 컴포넌트들이 context에 접근을 해서 사용하고 싶은 공급자가 공급하는 데이터를
//받을 수 있기 때문이다.
//따라서 export추가, default가 없는 이유는 파일 하나당 하나밖에 쓸 수 없음
export const DiaryStateContext = React.createContext(); //다이어리의 스테이트전용
//onCreate, onEdit, onRemove
export const DiaryDispatchContext = React.createContext();

function App() {
  //6-4 데이터 추가하기 , txt참고
  //데이터를 관리할 state, 일기데이터 배열을 저장할것이기 때문에, 배열로 초기값 설정
  //6-14 reducer를 통한 최적화를 위해 아래 const [data,setData] = useState([]);코드 주석
  //const [data,setData] = useState([]);
  const [data,dispatch] = useReducer(reducer,[]);
  //6-6삭제가 되려면 위에 data state를 바꿔야한다.
  //삭제버튼을 누르면 해당 id값을 가진 배열을 뺀 배열로 data state를 업데이트 시켜줘야함


  //새로운 일기를 작성할 때 id값은 자동으로 1씩 증가를 시켜야함 -> 레퍼런스 사용
  const dataId = useRef(0);

  
  //위의 일기 배열[data]에 새로운 일기를 추가하는 함수를 만든다.
  //DiaryEditor에 일기데이터를 추가할 수 있는 함수(onCreate)를 Prop으로 선언

  //useCallback -> onCreate함수 최적화 6-11
  const onCreate = useCallback((author, content, emotion) => {

    dispatch({type:"CREATE",
    data : {author, content, emotion, id : dataId.current}
    });
    //다이어리의 Author,content,emotion을 onCreate함수가 받아서 
    //data를 update시키는 로직을 setData를 이용해서 onCreate함수에 작성
    //현재 다이어리 안에 있는 데이터들의 값(author,content,emotion)을 모르니
    //파라미터로 값을 받는다.
    //현재시간은 따로 구함
    /*
    const create_date = new Date().getTime();
    //새로운 일기아이템 추가
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id : dataId.current //처음 0
      
    }; -->최적화 로직분리로 인해 주석
    */ 
    //id값 증가
    dataId.current += 1;
    
    //원래 데이터를 spread연산자를 사용할 수 있음
    //그리고 newItem으로 새로운 아이템을 추가 -> 원래 데이터에 가장 마지막에 newItem을 이어붙임
    //하지만 새로운 아이템을 만들면 가장 맨위로 해야하니까 newItem을 ...data보다 앞에다 선언
    //setData([newItem,...data]);
    
    //위의 코드와 다르게 최적화를 위해 함수형 업데이트
    //함수형 업데이트는 setData에 값을 전달을 해야하는데, 그 값이 새로운 state값으로 바뀐다.
    //여기서 함수를 전달을 할 수 있다.
    //인자로 data를 받아서 아이템을 추가한 데이터를 리턴하는 콜백함수
    //함수형 업데이트 -상태변화함수(setData)에 함수를 전달하는 것
    //setData((data) =>[newItem,...data]);
  },
  []
  );

  //6-6삭제, app컴포넌트에서 onDelete 함수를 호출하는게 아니기 때문에
  //targetId(매개변수)를 선언
  //onDelete는 어디서 호출 해야하냐면
  //삭제버튼을 클릭 했을 때 'id'값이 뜨는 엘리먼트를 onDelete함수에 전달을 해야한다.
  //그렇기 때문에 DiaryItem이 onDelete를 호출할 수 있어야한다.
  //그렇게 하려면 DiaryItem의 부모인 DiaryList로 props로 onDelete함수를 내려준다.
  
  //최적화 최종 , onCreate 최적화때처럼, onRemove와 onEdit최적화
  const onRemove = useCallback((targetId) => {

    dispatch({type:"REMOVE", targetId})

    //console.log(`${targetId}가 삭제되었습니다.`);
    //id를 가진 배열을 요소를 제외한 새로운 배열을 만들어서 setData함수에 전달해서
    //data배열을 바꿔주면 된다.
    //최적화 때문에 data.filter((it) => it.id !== targetId삭제
    //const newDiaryList = (data.filter((it) => it.id !== targetId); //원래 다이어리 리스트에서 필터링을 해주면 된다.
    //console.log(newDiaryList);
    //삭제적용
    //최적화 때문에 newDiaryList삭제
   //setData(data => data.filter((it) => it.id !== targetId));
  },[]);

  //수정완료하기 기능 DiaryItem용
  //targetId -> 어떤 id를 가진 일기를 수정할지 , 수정대상아이디
  //newContent -> 어떻게 content를 변경시킬건지 , 수정된데이터가 뭔지
  const onEdit = useCallback((targetId, newContent) => {

    dispatch({type:"EDIT", targetId, newContent})
    /*setData(
      data => //최적화 최종 data =>
      //각각 모든 요소들이 현재 매개변수로 전달받은 targetId와 일치하는 아이디를 갖는지 검사
      //일치하는 아이디는 1개밖에 없음
      //일치하는 아이디가 있으면 해당 id는 수정대상이 되는 id이다.
      //그래서 원본데이터(...it)를 불러와서 content를 newContent로 업데이트 시킨다.
      //아이디가 일치하지 않으면 수정대상이 아니기 때문에 it를 반환
      data.map((it)=>
        it.id === targetId ? {...it, content:newContent} : it
      )
    );*/
  },[]);

  //api사용 , promise를 반환하는 비동기 함수 async
  const getData = async() => {
    //fetch사용, 결과값(.then)으로 response의 json
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());
    //console.log(res);//app컴포넌트가 mount되자마자 호출해보자


   
    


    //slice -> 0~19인덱스까지 배열 자르기
    //0~19까지 자른 배열에서 map함수를 써서
    //배열의 각각 모든 요소들을 순회해서 
    //이 map함수의 콜백함수 안에서 return하는 값들을 모아서 배열을 만들어서 
    //initData 값에다가 집어넣음
    const initData = res.slice(0,20).map((it) => {
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5)+1, //랜덤0~4까지 난수 + 1
        create_date : new Date().getTime(),
        id : dataId.current++ //바로 return되기때문에 후위연산자 사용
      }
    });

     //최적화 - 로직분리 setData가 했었던 역할을 dispatch와 reducer에게 나눠보자
    //getData는 initData를 통해서 데이터를 초기화를 해야 하는거였으니까
    dispatch({type:"INIT", data:initData}); // -> reducer는 action객체(type)을 받는데
                                          //action의 타입이 "INIT"이고, 그 액션에 필요한 데이터는 
                                          //initData가 된다.

    //setData(initData);
  };

  useEffect(() => {
    getData(); //body - 일기본문, email - 작성자, id,name,postId는 사용안하고 해보기
  },[]);
  

//메모이제이션 - 6-10최적화
  const getDiaryAnalysis = useMemo(
    () => {
    //console.log("일기 분석 시작");
    //기분이 좋은일기 카운트 , 3점이상
    const goodCount = data.filter((it)=>it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    //좋은 일기의 비율
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};//리턴을 가지고 있는 함수를 메모이제이션을 해서 연산들을 최적화 하기 위해선
                  //useMemo함수를 사용
  }, [data.length]); //data의 길이가 변화할때만 콜백
  
  //useMemo는 함수를 반환하는게 아니라 값을 반환하므로 getDiaryAnalysis() -> getDiaryAnalysis;
  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  //create,edit,remove를 하나의 prop으로 묶자 context용
  //useMemo로 묶지 않고 하면 앱 컴포넌트가 재생성이 될때 
  //해당 새롭게 만든 디스패치 객체도 재생성이 된다. 그래서 useMemo를 사용해서 재생성이 되지않게 객체를 묶어줌
  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onEdit};
  },[]);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
    <div className="App">
      {/*<OptimizeTest/>*/}
      {/*<OptimizeTest2/>*/}
      {/*<Lifecycle />*/}
      <DiaryEditor/>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList/>
    </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
//위의 <DiaryList onEdit={onEdit} onRemove = {onRemove} diaryList = {data} />에서
//prop으로 diaryList = {data}는 이제 필요가 없어짐. context로 data를 받기 때문
export default App;

