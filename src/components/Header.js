import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
const Header = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
          <Link to="/ReactTest1" className='header_test1'>테스트1</Link>
          <Link to="/ReactTest2" className='header_test2'>테스트2</Link>
          <Link to="/ReactTest3" className='header_test3'>테스트3</Link>
            <Link to="/" className="header_home">홈</Link>
            <Nav className="me-auto">
            <Link to="/saveForm" className="header_write">글쓰기</Link>
            <Link to="/end" className="end">할 것</Link>
            {/*<Link to="/JoinForm" className="header_newAccount">회원가입</Link>
            <Link to="/LoginForm" className="header_Login">로그인</Link>
    */}
            </Nav>
          </Container>
        </Navbar>
      </>
    );
};

export default Header;