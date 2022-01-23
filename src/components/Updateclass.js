import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
import { Link , useParams } from "react-router-dom";

export default function Updateclass(){

  let history = useHistory();
  let path = '/public/login';
  let path2 = '/user/allclasses';
  const {id} = useParams();

  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [classname, setClassName] = useState("");
  const [grade, setGrade] = useState("");
  const [classId, setClassId] = useState("");
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
      setGrade(res.data.classroom.grade)
      setClassId(res.data.classroom._id)
      }).catch((e)=>{
        alert("getclass " +e); 
        console.log(id);
    })
  }, [])

  function updateData(e) {
    e.preventDefault();
    const classupdate = {
      userId,
      userName,
      classId,
      classname,
      grade}

  axios.put(`/student/stdclsupdate/${id}`,classupdate).then(()=>{

    swal({          
  title: "Success!",
  text: "Class Successfully Updated",
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
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Update Class</h1></center>
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
              }} required/>
              <label for="floatingInput">Class Name</label>
             
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="grade" placeholder="Grade" defaultValue={classroom.grade}
                      onChange={(e) => {
                        setGrade(e.target.value);
                      } } required/>
                      <label for="floatingInput">Grade</label>
                  </div>
        </div>
        <br/>

        <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="classId" hidden="true" placeholder="Class ID" defaultValue={classroom._id}
              onChange={(e) => {setClassId(e.target.value);
              }} disabled/>
              <label for="floatingInput" hidden="true">Class ID</label>
              
          </div>
                    <button type="submit" className="btnregister" onClick={updateData} id="regsubmit">Submit</button>
                    <Link to={"/user/allclasses"}><button type="reset" className="btnreset" id="regreset">cancel</button></Link>
      </form>
      <br/>
    </div>
    </>
  )
}