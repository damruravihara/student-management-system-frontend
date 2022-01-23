import React,{useEffect, useState} from "react";
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function Attendencehistory(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();

  const [searchTerm, setsearchTerm] = useState("");
  const [attendence, setAttendence] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  function presentLabours(){

    axios.get(`/student/allpresent/${id}/${currentDate}`).then((res)=>{
      setAttendence(res.data);
}).catch((err)=>{
    alert(err.message);
})
}

function absentLabours(){

  axios.get(`/student/allabsent/${id}/${currentDate}`).then((res)=>{
    setAttendence(res.data);
}).catch((err)=>{
  alert(err.message);
})
}


  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam", fontSize:"30px" , fontWeight:"800"}}>Attendence History</h1></center>
      <br/>
      <div className="row">
        <div className="col form-floating">
                  <input type="date" className="form-control logininput" id="dob"  onChange= {(e)=> {
                      setCurrentDate(e.target.value);
                    }} required/>
              <label for="floatingInput">Select Date</label>
              
          </div>


          <div className="col form-floating">
          <button onClick={(e) => presentLabours(e)} className="btnregister" id="regsubmit">View Present</button>
          <button onClick={(e) => absentLabours(e)} className="btnreset" id="regsubmit">View Absent</button>
        </div>      
        </div>
        <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th className="table-head-align" scope="col">Date</th>               
                            <th className="table-head-align" scope="col">Student Name</th>
                            <th className="table-head-align" scope="col">Class Name</th>                 
                            </tr>
                        </thead>
                            <tbody> 
                                {
                                attendence.map(function (f){

                                return <tr>
                                
                                <td className="table-data-text">{f.currentDate}</td>
                                <td className="table-data-text">{f.stname}</td>
                                <td className="table-data-text">{f.classname}</td>
                                </tr>
                                })
                            } 
                            </tbody>
                    </table>
    </div>
    </>
  )
}