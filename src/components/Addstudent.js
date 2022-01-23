import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
import { useForm } from "react-hook-form";

export default function Addstudent(){

    const { register, handleSubmit, formState: { errors }} = useForm();
    let history = useHistory();
    let path = '/public/login';
    let path2 = '/user/allclasses';
    const {id} = useParams();

    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [classId, setClassId] = useState("");
    const [classname, setClassName] = useState("");
    const [gender, setGender] = useState("");
    const [stname, setStname] = useState("");
    const [address, setAddress] = useState("");
    const [parent, setParent] = useState("");
    const [contactno, setContactno] = useState("");
    const [school, setSchool] = useState("");

    const [classroom, setClassroom] = useState([]);

    useEffect(()=>{
      const fetchUser = async ()=>{
        const res = await axios.get('/user/userprofile').then((res)=>{
        setUser(res.data)
        setUserId(res.data._id)
        setUserName(res.data.name)
        }).catch(()=>{
          history.push(path);
          swal({title: "unauthorized",
          text: "Please Login First",
          icon: "warning"} ); 
      })
    }
      fetchUser();
    },[]);

    useEffect(()=>{
      axios.get(`/student/getclass/${id}`).then((res)=>{
      setClassroom(res.data.classroom)
      setClassName(res.data.classroom.classname)
      setClassId(res.data.classroom._id)
      }).catch((e)=>{
        alert("getclass " +e); 
        console.log(id);
    })
  }, [])

    function sendData(e){
   
      // e.preventDefault();
      
      const newStudent ={
  
        userId,
        userName,
        classname,
        classId,
        gender,
        stname,
        address,
        parent,
        contactno,
        school
      }
  
      axios.post('/student/addstudent',newStudent).then(()=>{
        swal({
        title: "Success!",
        text: "Your Successfully registered",
        icon: "success",
        button: "Ok",
      });history.push(path2);
      }).catch((e)=>{
        swal("Please fill Form correctly " +e);
      })
    };



  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Add Student</h1></center>
      <br/>
      <form className="needs-validation" noValidate>
      <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="userid" placeholder="User ID" defaultValue={user._id}
              onChange={(e) => {setUserId(e.target.value);
              }} disabled/>
              <label for="floatingInput">User ID</label>
              
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="username" placeholder="Name" defaultValue={user.name}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      } } disabled/>
                      <label for="floatingInput">Name</label>
                  </div>
        </div>

        <br/>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="classname" placeholder="Class Name" defaultValue={classroom.classname}
              onChange={(e) => {setClassName(e.target.value);
              }} disabled/>
              <label for="floatingInput">Class Name</label>
             
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="classid" placeholder="Class ID" defaultValue={classroom._id}
                      onChange={(e) => {
                        setClassId(e.target.value);
                      } } disabled/>
                      <label for="floatingInput">Class ID</label>
                  </div>
        </div>
        <br/>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="stname" placeholder="Student Name" 
              onChange={(e) => {setStname(e.target.value);
              }} required/>
              <label for="floatingInput">Student Name</label>
              
          </div>

          <div className="col-md-6 form-floating">
          <select className="form-control logininput"  onChange={(e) => {setGender(e.target.value);
              }} required>
                  <option>Select option..</option>
                  <option>Male</option>
                  <option>Female</option>
                  </select>
                  <label for="floatingInput">Gender</label>
                  </div>
        </div>

        <br/>

        <div className="row g-2">
        <div className="col-md-6 form-floating">
            <textarea rows="3" className="form-control logininput" id="address" placeholder="Address"
              onChange={(e) => {setAddress(e.target.value);
              }} required/>
              <label for="floatingInput">Address</label>
              
          </div>


          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="parent" placeholder="Parent Name" 
              onChange={(e) => {setParent(e.target.value);
              }} required/>
              <label for="floatingInput">Parent Name</label>
        </div>      
        </div>

        <br/>

        <div className="row g-2">
        <div className="col-md-6 form-floating">
        <input type="number" {...register("contactno", { minLength:10, maxLength:12 })} className="form-control logininput" id="contactno" placeholder="Contact Number"
                      onChange={(e) => {
                        setContactno(e.target.value);
                      } } required/>
                      <label for="floatingInput">Contact Number</label>
                      {errors?.contactno?.type === "minLength" && (<p className="damrureq">*Contact No must be contain Min 10 numbers</p>)}
                      {errors?.contactno?.type === "maxLength" && (<p className="damrureq">*Contact No must be contain Max 12 numbers</p>)}
              
          </div>


          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="school" placeholder="School Name" 
              onChange={(e) => {setSchool(e.target.value);
              }} required/>
              <label for="floatingInput">School Name</label>
        </div>      
        </div>
        <br/>
      
                    <button type="submit" className="btnregister" onClick={handleSubmit(sendData)} id="regsubmit">Submit</button>&nbsp;&nbsp;
                    <button type="reset" className="btnreset" id="regreset">Reset</button>
      </form>
      <br/>
    </div>
    </>
  )
}