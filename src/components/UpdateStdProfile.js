import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
import { Link , useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Updatestudentprofile(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();
  const { register, handleSubmit, formState: { errors }} = useForm();

  const [user, setUser] = useState([]);
  const [stname, setStname] = useState("");
  const [address, setAddress] = useState("");
  const [parent, setParent] = useState("");
  const [contactno, setContactno] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [student, setStudent] = useState([]);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data)
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
    axios.get(`/student/getstudent/${id}`).then((res)=>{
    setStudent(res.data.student)
    setStname(res.data.student.stname)
    setAddress(res.data.student.address)
    setParent(res.data.student.parent)
    setContactno(res.data.student.contactno)
    setGender(res.data.student.gender)
    setSchool(res.data.student.school)
    }).catch((e)=>{
      alert("getclass " +e); 
      console.log(id);
  })
}, [])

  function updateData(e) {
    // e.preventDefault();
    const classupdate = {
      stname,
      address,
      parent,
      contactno,
      gender,
      school}

  axios.put(`/student/studentupdate/${id}`,classupdate).then(()=>{

    swal({          
  title: "Success!",
  text: "Student Successfully Updated",
  icon: "success",
  button: "Ok",
});history.push('/user/studentprofile/' +student._id);
    }).catch((e)=>{
       swal("Please fill Form correctly " +e);
      })
  
};
  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Update Student</h1></center>
      <br/>
      <form className="needs-validation" noValidate>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="stname" placeholder="Student Name" defaultValue={student.stname}
              onChange={(e) => {setStname(e.target.value);
              }} required/>
              <label for="floatingInput">Student Name</label>
              
          </div>

          <div className="col-md-6 form-floating">
          <select className="form-control logininput"  onChange={(e) => {setGender(e.target.value);
              }} required>
                  <option>{student.gender}</option>
                  <option>Male</option>
                  <option>Female</option>
                  </select>
                  <label for="floatingInput">Gender</label>
                  </div>
        </div>

        <br/>

        <div className="row g-2">
        <div className="col-md-6 form-floating">
            <textarea rows="3" className="form-control logininput" id="address" placeholder="Address" defaultValue={student.address}
              onChange={(e) => {setAddress(e.target.value);
              }} required/>
              <label for="floatingInput">Address</label>
              
          </div>


          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="parent" placeholder="Parent Name" defaultValue={student.parent}
              onChange={(e) => {setParent(e.target.value);
              }} required/>
              <label for="floatingInput">Parent Name</label>
        </div>      
        </div>

        <br/>

        <div className="row g-2">
        <div className="col-md-6 form-floating">
        <input type="number" {...register("contactno", { minLength:10, maxLength:12 })} className="form-control logininput" id="contactno" placeholder="Contact Number" defaultValue={student.contactno}
                      onChange={(e) => {
                        setContactno(e.target.value);
                      } } required/>
                      <label for="floatingInput">Contact Number</label>
                      {errors?.contactno?.type === "minLength" && (<p className="damrureq">*Contact No must be contain Min 10 numbers</p>)}
                      {errors?.contactno?.type === "maxLength" && (<p className="damrureq">*Contact No must be contain Max 12 numbers</p>)}
              
          </div>


          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="school" placeholder="School Name" defaultValue={student.school}
              onChange={(e) => {setSchool(e.target.value);
              }} required/>
              <label for="floatingInput">School Name</label>
        </div>      
        </div>
        <br/>
      
                    <button type="submit" className="btnregister" onClick={handleSubmit(updateData)} id="regsubmit">Submit</button>
                    <Link to={"/user/studentprofile/" +student._id}><button type="reset" className="btnreset" id="regreset">cancel</button></Link>
      </form>
      <br/>
    </div>
    </>
  )
}