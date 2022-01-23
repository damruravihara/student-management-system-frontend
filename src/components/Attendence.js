import React,{useEffect, useState} from "react";
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";


export default function Attendence(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();

  const [searchTerm, setsearchTerm] = useState("");
  const [attendence, setAttendence] = useState([]);



  useEffect(()=>{
    const getAttendence = async()=>{
     const res = await axios.get(`/student/getattendence/${id}`).then((res)=>{
      setAttendence(res.data);
      })
    }
    getAttendence();
  }, []);

  function viewstudent(){
    axios.get(`/student/attendance/${id}`).then((res) => {
      // setAttendence(res.data);
          console.log(res.data)
          setTimeout(function(){
            window.location.reload();
           });
      })
  }
  return(
    <>
              <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Attendence</h1></center>
      <br/>
      <input className="search" type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
        <br/>
          <div className="row" style={{padding:"10px"}}>
          <div className="col form-floating">
          <button type="button" className="btnregister" onClick={() => viewstudent()}>View Students</button>
        </div>  
        </div> 
        <br/>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
                  <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
          {attendence.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.stname.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                              return val;
                          }
                      }).map((attendence,key)=>(
                        <tr key={key}>
                            <td className="damfont">{attendence.stname}</td>
                            <td>
                              {/* <Link to={"/student/updatestudent/" + student._id}>
                          <IconButton aria-label="delete">
                         <EditIcon fontSize="small" color="primary"/> 
                         </IconButton></Link> */}
                         {/* <IconButton aria-label="delete"  onClick={() =>deleteStudent(student._id)}>
                         <DeleteForeverIcon fontSize="small" color="secondary"/> 
                         </IconButton> */}
                         <Link to={"/user/mark/" +attendence._id}><button className="btnregister" id="regsubmit">Mark</button></Link>
                         </td>
                         
                        </tr>
                      ))}
          </tbody>
        </table>
        <br/>
    </div>
    </>
  )
}