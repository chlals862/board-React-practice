import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const SaveForm = () => {
    const navigate = useNavigate();
    const [board,setBoard] = useState({
        title : "",
        content : "",
    });

    const changeValue = (e) => {
        setBoard({
            ...board, //기존값 지워지기 방지
            [e.target.name] : e.target.value
        });
    }

    const submitBoard = (e) => {
        e.preventDefault(); //submit이 action을 안타고 자기 할일을 그만함
        axios({
            url: "/board",
            method:"POST",
            headers: {"Content-Type" : "application/json;charset=utf-8"},
            data:JSON.stringify(board)
            }).then(res => {
               if(res.status === 201) {
                    console.log(res);
               }else {
                return null;
               }
            })
            .then(res => {
                if(res !== null) {
                    navigate("/");
                } else {
                    alert("게시글 등록에 실패하였습니다.");
                }
            })
        /*
        fetch("/board", {
            method:"POST",
            headers: {
                "Content-Type" : "application/json;charset=utf-8"
            },
            body : JSON.stringify(board)
        })
        .then(res => {
            console.log(1, res);
            if(res.status === 201) {
                return res.json();
            }else {
                return null;
            }
        })
        .then(res => {
            if(res !== null) {
                navigate("/");
            } else {
                alert("게시글 등록에 실패하였습니다.");
            }
        });
        */
    }

  return (
    <Form onSubmit={submitBoard}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>제목</Form.Label>
        <Form.Control type="text" placeholder="제목을 입력하세요." onChange={changeValue} name="title"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" placeholder="내용을 입력하세요." style={{height:'100px'}} onChange={changeValue} name="content"/>
      </Form.Group>

      <Button variant="primary" type="submit">
        글쓰기
      </Button>
    </Form>
  );
}


export default SaveForm;