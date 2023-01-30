import React from 'react';
import BoardItem from '../../components/BoardItem';
import { useEffect, useState } from 'react';

const Home = () => {
    const [boards, setBoards] = useState([]);
    useEffect(() => { //상태값이 변경될때마다 실행
        fetch("/board")
        .then((res) => res.json())
        .then((res) => {
            console.log(1, res);
            setBoards(res);
        });
        // .then(response => response.text())
        // .then(message => {
        //     setMessage(message);
        //});
    },[]);
        return (
            <div>
                {boards.map(board =><BoardItem key={board.id} board = {board}/>)}
            </div>
        );
    }
export default Home;