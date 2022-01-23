import React, {useEffect, useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { useHistory, useParams, Link } from "react-router-dom";


export default function Mark(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();
  const { register, handleSubmit, formState: { errors }} = useForm();

  const [userId, setUserId] = useState("");
  const [userName, setUsername] = useState("");
  const [classId, setClassId] = useState("");
  const [classname, setClassname] = useState("");
  const [stdId, setStdID] = useState("");
  const [stname, setStname] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [attendence, setAttendence] = useState([]);

  // useEffect(()=>{
  //   const fetchUser = async ()=>{
  //     const res = await axios.get('/user/userprofile').then((res)=>{
  //     setUser(res.data)
  //     }).catch(()=>{
  //       history.push(path);
  //       swal({title: "unauthorized",
  //       text: "Please Login First",
  //       icon: "warning"} ); 
  //   })
  // }
  //   fetchUser();
  // },[]);

  useEffect(()=>{
    axios.get(`/student/oneattendence/${id}`).then((res)=>{
    setAttendence(res.data.attendence)
    setUserId(res.data.attendence.userId)
    setUsername(res.data.attendence.userName)
    setClassId(res.data.attendence.classId)
    setClassname(res.data.attendence.classname)
    setStdID(res.data.attendence._id)
    setStname(res.data.attendence.stname)
    }).catch((e)=>{
        swal({title: "Error",
        text: +e,
        icon: "warning"} ); 
  })
}, [])

function presenrData(e){
  e.preventDefault();

  const newpresent = {
    userId,
    userName,
    classId,
    classname,
    stdId,
    stname,
    currentDate
  }
  axios.post('/student/addpresent',newpresent).then((willAccept)=>{
    if(willAccept){
      swal({
        title: "Success",
        text: "You Successfully Marked Attendence",
        icon:  "success",
        type: "success"
      }).then(function(){
        //add my sup orders location
        window.location.href=`/user/attendence/${classId}`
       })
      }
  });
  axios.delete(`/student/deleteattendence/${id}`,newpresent)
}

function absentData(e){
  e.preventDefault();

  const newabsent = {
    userId,
    userName,
    classId,
    classname,
    stdId,
    stname,
    currentDate
  }
  axios.post('/student/addabsent',newabsent).then((willAccept)=>{
    if(willAccept){
      swal({
        title: "Success",
        text: "You Successfully Marked Attendence",
        icon:  "success",
        type: "success"
      }).then(function(){
        //add my sup orders location
        window.location.href=`/user/attendence/${classId}`
       })
      }
  });
  axios.delete(`/student/deleteattendence/${id}`,newabsent)
}

  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Mark Attendence</h1></center>
      <br/>
      <form className="needs-validation" noValidate>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="stname" placeholder="Student Name" defaultValue={attendence.stname}
              onChange={(e) => {setStname(e.target.value);
              }} disabled/>
              <label for="floatingInput">Student Name</label>
              
          </div>

          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="classname" placeholder="Class Name" defaultValue={attendence.classname}
              onChange={(e) => {setStname(e.target.value);
              }} disabled/>
              <label for="floatingInput">Class Name</label>
              
          </div>
        </div>
        <br/>
        <label for="nic" className="form-label">Date</label>
                  <input type="date" className="form-control logininput" id="dob"  onChange= {(e)=> {
                      setCurrentDate(e.target.value);
                    }} required/>

        <br/>
        <button type="submit" className="btnregister" onClick={presenrData} id="regsubmit">Present</button>&nbsp;&nbsp;
        <button type="submit" className="btnreset" onClick={absentData} id="regsubmit">Absent</button>&nbsp;&nbsp;
        <Link to={"/user/attendence/" +attendence.classId}><button type="reset" className="btnreset" id="regreset">cancel</button></Link>
        </form>
        <br/>
    </div>
    </>
  )
}

