import './App.css';
import React,{useContext} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Header from "./components/Header/Header";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Updateprofile from './components/Updateprofile';
import Allusers from './components/Allusers';
import Createclass from './components/Createclass';
import Allclasses from './components/Allclasses';
import Updateclass from './components/Updateclass';
import Addstudent from './components/Addstudent';
import Allstudentclass from './components/Allstudentclass';
import Updatestudent from './components/Updatestudent';
import Attendence from './components/Attendence';
import Mark from './components/Mark';
// import NavBar from './components/Header/Header';
import Viewpayment from './components/Viewpayment';
import Paymentstudent from './components/Paymentstudent';
import Addpayment from './components/Addpayment';
import Attendencehistory from './components/Attendencehistory';
import LandingPage from './components/landingPage';
import Home from './components/Home';
import AutharizeHeader from './components/Header/AutharizeHeader';
import Mystudents from './components/Mystudents';
import Studentprofile from './components/Studentprofie';
import Updatestudentprofile from './components/UpdateStdProfile';




function App() {

  // const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(AuthContext);
  // console.log(user);
  // console.log(isAuthenticated);
  return (
    <Router>
      <div>
        <Route path="/public" component={Header}/>
        <Route path="/user" component={AutharizeHeader}/>
        <Route path="/user" exact component={Home}/>
        <Route path="/public" exact component={LandingPage}/>
        <Route path="/public/login" component={Login}/>
        <Route path="/public/register" component={Register}/>
        <Route path="/user/profile" component={Profile}/>
        <Route path="/user/update/:id" component={Updateprofile}/>
        <Route path="/user/alluser" component={Allusers}/>
        <Route path="/user/createclass" component={Createclass}/>
        <Route path="/user/allclasses" component={Allclasses}/>
        <Route path="/user/updateclass/:id" component={Updateclass}/>
        <Route path="/user/addstudent/:id" component={Addstudent}/>
        <Route path="/user/allstudents/:id" component={Allstudentclass}/>
        <Route path="/user/updatestudent/:id" component={Updatestudent}/>
        <Route path="/user/attendence/:id" component={Attendence}/>
        <Route path="/user/mark/:id" component={Mark}/>
        <Route path="/user/allpayment/:id" component={Viewpayment}/>
        <Route path="/user/paymentstudent/:id" component={Paymentstudent}/>
        <Route path="/user/addpayment/:id" component={Addpayment}/>
        <Route path="/user/historyatten/:id" component={Attendencehistory}/>
        <Route path="/user/mystudents/:id" component={Mystudents}/>
        <Route path="/user/studentprofile/:id" component={Studentprofile}/>
        <Route path="/user/updatestdprofile/:id" component={Updatestudentprofile}/>
      </div>
    </Router>
    
  );
}

export default App;
