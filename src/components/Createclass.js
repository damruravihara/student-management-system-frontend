import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
// import { useForm } from "react-hook-form";

export default function Createclass(){

  // const { register, handleSubmit, formState: { errors }} = useForm();
  let history = useHistory();
  let path = '/public/login';
  let path2 = '/user/allclasses';

  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [classname, setClassName] = useState("");
  const [grade, setGrade] = useState("");

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

  function sendData(e){
   
    e.preventDefault();
    
    const newClass ={

      userId,
      userName,
      classname,
      grade,

    }

    axios.post('/student/createclass',newClass).then(()=>{
      swal({
      title: "Success!",
      text: "Class Successfully Created",
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
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Create Class</h1></center>
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
            <input type="text" className="form-control logininput" id="classname" placeholder="Class Name"
              onChange={(e) => {setClassName(e.target.value);
              }} required/>
              <label for="floatingInput">Class Name</label>
             
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="grade" placeholder="Grade"
                      onChange={(e) => {
                        setGrade(e.target.value);
                      } } required/>
                      <label for="floatingInput">Grade</label>
                  </div>
        </div>
        <br/>
                    <button type="submit" className="btnregister" onClick={sendData} id="regsubmit">Submit</button>
                    <button type="reset" className="btnreset" id="regreset">Reset</button>
      </form>
      <br/>
    </div>
    </>
  )
}