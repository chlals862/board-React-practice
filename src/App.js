import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/board/Home";
import SaveForm from "./pages/board/SaveForm";
import Detail from "./pages/board/Detail";
import UpdateForm from "./pages/board/UpdateForm";
import ReactTest1 from "./pages/test/reactTest1"
import ReactTest2 from "./pages/test2/ReactTest2"
import ReactTest3 from "./pages/test3/ReactTest3"
import Last from "./Last";
function App() {


  return (
    <div className="App">
      <div className="web-title">MEGA ZONE</div>

          <Header />
        <Routes>
          <Route path="/reactTest1" exact={true} element={<ReactTest1 />} />
          <Route path="/reactTest2" exact={true} element={<ReactTest2 />} />
          <Route path="/reactTest3" exact={true} element={<ReactTest3 />} />
          
          <Route path="/" exact={true} element={<Home/>} />
          <Route path="/saveForm" exact={true} element={<SaveForm />} />
          <Route path="/board/:id" exact={true} element={<Detail />} />
          <Route path="/updateForm/:id" exact={true} element={<UpdateForm />} />
          <Route path="/end" exact={true} element={<Last />} />
          {/*<Route path="/abouts" element={<About/>} />
          <Route path="/loginForm" exact={true} element={<LoginForm />} />
  <Route path="/joinForm" exact={true} element={<JoinForm />} />*/}
        </Routes>
    </div>
  );
}

export default App;
