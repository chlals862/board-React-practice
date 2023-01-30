import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
const Detail = () => {
    const navigate = useNavigate();
    const propsParam = useParams();
    const id = propsParam.id;

    const [board,setBoard] = useState({
        id : "",
        title : "",
        writer : "",
        content : ""
    });

    useEffect(() => {
        fetch("/board/"+id)
        .then((res) => res.json())
        .then((res) => {
            setBoard(res);
        });
    },[]);

    //삭제
    const deleteBoard = () => {
        fetch("/board/"+id, {
            method:"DELETE",
        })
        .then(res => res.text()) //삭제 return "ok"
        .then(res => {
            if(res === "ok") {
                navigate("/");
            }else {
                alert("삭제에 실패하였습니다.");
            }
        });
    };

    const updateBoard = () => {
        navigate("/updateForm/"+id);
    }

    return (
        <div>
            <h1>글 상세보기</h1>
            <hr/>
            <h3>{board.writer}</h3>
            <h1>{board.title}</h1>
            <h2>{board.content}</h2>
            <Button variant="success" onClick={updateBoard}>수정</Button>
            {''}
            <Button variant="danger" onClick={deleteBoard}>삭제</Button>
        </div>
    );
};

export default Detail;