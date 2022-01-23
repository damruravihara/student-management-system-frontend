import React,{useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import './landingPage.css';
import {Link} from 'react-router-dom';






export default function Home(){

  let history = useHistory();
  let path = '/public';

  const [user, setUser] = useState([]);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data);
      }).catch(()=>{
        history.push(path);
    })
  }
    fetchUser();
  },[]);

    return (
        <>
        <body className="landing-page-body">
    
        <div className="hero">
        <div className="hero__content">
          <h1>Star School</h1>
          <h3>Student Management System</h3>
          <hr />
        
            <p className ="description-landing-page">Star School ia a Web Application that help to manage students. Teachers those who do n't own a system can create account in this web Application and add their student. Teachers can also mark attendence and payment details.</p>
        
          
        <br/>
          
        <Link to="/user/profile" ><button className="btn btn--resume btn-getstarted">MY PROFILE</button></Link>
      
        <div className="row" style={{  padding:"40px"}}>
        <div className="col form-floating">
        <h5>Contact Me:</h5>
        <a className="social" target="_blank" href="https://www.facebook.com/Padfoot001"><img src="https://i.ibb.co/tPjpg68/facebook-brands.png" alt="facebook-brands" width="35px" height="35px"/></a>&nbsp;&nbsp;
        <a className="social" target="_blank" href="https://github.com/damruravihara"><img src="https://i.ibb.co/5WXgm0y/github-brands.png" alt="github-brands" width="35px" height="35px"/></a>&nbsp;&nbsp;
        <a className="social" target="_blank" href="https://www.linkedin.com/in/damru-ravihara-a068bb221/"><img src="https://i.ibb.co/qBVYRZP/linkedin-brands.png" alt="linkedin-brands" width="35px" height="35px"/></a>
            </div>
        </div>
        </div>
        <div className="hero__img hero__img-main">
          <img src="https://i.ibb.co/6R10B7H/main-01.png" className="landing_image" alt="astronut"/>
        </div>
      </div>
        </body>
        </>
    )
}