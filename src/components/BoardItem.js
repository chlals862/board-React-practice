import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
const BoardItem = (props) => {
    const {id,title,content,writer} = props.board;
    return (
        <Card>
            <Card.Body>
                <Card.Subtitle className='mb-2 text-muted'>{writer}</Card.Subtitle>
                <hr/>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{content}</Card.Text>
                <Link to={"/board/"+id} className="btn btn-primary">
                    상세보기    
                </Link>
            </Card.Body>
        </Card>
    );
};

export default BoardItem;