import React, { useEffect, useState } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
const UpdateForm = () => {
    const navigate = useNavigate();
    const propsParam = useParams();
    const id = propsParam.id;

    const [board,setBoard] = useState({
        title : "",
        content : "",
    });

    useEffect(() => {
        fetch("/board/"+id)
        .then((res) => res.json())
        .then((res) => {
            setBoard(res);
        });
    },[]);


    const changeValue = (e) => {
        setBoard({
            ...board, //기존값 지워지기 방지
            [e.target.name] : e.target.value
        });
    }

    const submitBoard = (e) => {
        e.preventDefault(); //submit이 action을 안타고 자기 할일을 그만함
        fetch("/board/"+id, {
            method:"PUT",
            headers: {
                "Content-Type" : "application/json;charset=utf-8"
            },
            body : JSON.stringify(board)
        })
        .then(res => {
            console.log(1, res);
            if(res.status === 200) { //PUT은 200
                return res.json();
            }else {
                return null;
            }
        })
        .then(res => {
            if(res !== null) {
                navigate("/board/"+id);
            } else {
                alert("게시글 수정에 실패하였습니다.");
            }
        });
    }

  return (
    <Form onSubmit={submitBoard}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>제목</Form.Label>
        <Form.Control type="text" placeholder="제목을 입력하세요." onChange={changeValue} name="title" value={board.title}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" placeholder="내용을 입력하세요." style={{height:'100px'}} onChange={changeValue} name="content" value={board.content}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        수정하기
      </Button>
    </Form>
  );
}


export default UpdateForm;