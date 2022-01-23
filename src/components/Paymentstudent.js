import React,{useEffect, useState} from "react";
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import jspdf from 'jspdf'
import "jspdf-autotable"
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';

export default function Paymentstudent(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();

  const [searchTerm, setsearchTerm] = useState("");
  const [student, setStudent] = useState([]);

  useEffect(()=>{
    const getStudent = async()=>{
     const res = await axios.get(`/student/allstudents/${id}`).then((res)=>{
      setStudent(res.data);
      }).catch((e)=>{
        alert(e); 
    })
    }
    getStudent();
  }, [])

  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>My Students</h1></center>
      <br/>
      <input className="search" type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
        <br/><br/>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
                  <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
          {student.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.stname.toLowerCase().includes(searchTerm.toLowerCase()) 
                          ){
                              return val;
                          }
                      }).map((student,key)=>(
                        <tr key={key}>
                            <td className="damfont">{student.stname}</td>
                            <td>
                              {/* <Link to={"/student/updatestudent/" + student._id}>
                          <IconButton aria-label="delete">
                         <EditIcon fontSize="small" color="primary"/> 
                         </IconButton></Link> */}
                         {/* <IconButton aria-label="delete"  onClick={() =>deleteStudent(student._id)}>
                         <DeleteForeverIcon fontSize="small" color="secondary"/> 
                         </IconButton> */}
                         <Link to={"/user/allpayment/" + student._id}><button className="btnregister" id="regsubmit">Payment Details</button></Link>
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