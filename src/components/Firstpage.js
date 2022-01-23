import React from "react";
import './landingPage.css';
import {Link} from 'react-router-dom';

export default function FirstPage(){

  return (
      <>
      <body className="landing-page-body">  

      <div className="hero">
      <div className="hero__content">
        <h1>Star School</h1>
        <h3>Student Management System</h3>
        <hr />
      
          <p className ="description-landing-page">Cautious !!! This web application only for learning purpose do not use real passwords or data.</p>
      
        
      <br/>
        
      <Link to="/public" ><button className="btn btn--resume btn-getstarted">HomePage</button></Link>
      
      <div className="row" style={{  padding:"40px"}}>
      <div className="col form-floating">
      <h5>Contact Me:</h5>
      <a className="social" target="_blank" href="https://www.facebook.com/Padfoot001"><img src="https://i.ibb.co/tPjpg68/facebook-brands.png" alt="facebook-brands" width="40px" height="40px"/></a>&nbsp;&nbsp;
      <a className="social" target="_blank" href="https://github.com/damruravihara"><img src="https://i.ibb.co/5WXgm0y/github-brands.png" alt="github-brands" width="40px" height="40px"/></a>&nbsp;&nbsp;
      <a className="social" target="_blank" href="https://www.linkedin.com/in/damru-ravihara-a068bb221/"><img src="https://i.ibb.co/qBVYRZP/linkedin-brands.png" alt="linkedin-brands"width="40px" height="40px"/></a>
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