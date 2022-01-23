import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const eye = <FontAwesomeIcon icon={faEye} />;

export default function Register(){

  const [passwordShown, setPasswordShown] = useState(false);

  let history = useHistory();
  let path = '/public/login';

  const { register, handleSubmit, formState: { errors }} = useForm();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [contactno, setContactNo] = useState("");
  const [institute,setInstitute] = useState("");
  const [qulification, setQulification] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");

  function sendData(e){
   
    // e.preventDefault();
    
    const newUser ={

      name,
      address,
      gender,
      contactno,
      institute,
      qulification,
      subject,
      grade,
      email,
      username,
      password,
      // role="user"
    }

    axios.post("http://localhost:8070/user/Tregister",newUser).then(()=>{
     // refresh()
      swal({
      title: "Success!",
      text: "Supplier Successfully registered",
      icon: "success",
      button: "Ok",
    });history.push(path);
    }).catch(()=>{
      swal("Please fill Form correctly");
    })


  };
  

  return(
    <>
    <br/>
    <div className="container">
    <h6 style={{padding:"10px", fontSize:"18px"}}>Already Have an Account <Link to="/public/login">Login</Link></h6>
    <hr/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Register</h1></center>
      <br/>
      <form onSubmit={handleSubmit(sendData)} className="needs-validation" noValidate>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="name" placeholder="Name"
              onChange={(e) => {setName(e.target.value);
              }} required/>
              <label for="floatingInput">Name</label>
          </div>

          <div className="col-md-6 form-floating">
                    <input type="number" {...register("contactno", { minLength:10, maxLength:12 })} className="form-control logininput" id="contactno" placeholder="Contact Number"
                      onChange={(e) => {
                        setContactNo(e.target.value);
                      } } required/>
                      <label for="floatingInput">Contact Number</label>
                      {errors?.contactno?.type === "minLength" && (<p className="damrureq">*Contact No must be contain Min 10 numbers</p>)}
                      {errors?.contactno?.type === "maxLength" && (<p className="damrureq">*Contact No must be contain Max 12 numbers</p>)}
                  </div>
        </div>

        <br/>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
            {/* <input type="text" className="form-control logininput" {...register("gender")} id="gender" placeholder="Gender"
              onChange={(e) => {setGender(e.target.value);
              }} required/> */}
                  <select className="form-control logininput"  onChange={(e) => {setGender(e.target.value);
              }} required>
                  <option>Select option..</option>
                  <option>Male</option>
                  <option>Female</option>
                  </select>
                  <label for="floatingInput">Gender</label>
             
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="institute" placeholder="Institute Name"
                      onChange={(e) => {
                        setInstitute(e.target.value);
                      } } required/>
                      <label for="floatingInput">Institute Name</label>
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
                    <textarea className="form-control logininput" rows="3" id="qulification" placeholder="Qulifications"
                      onChange={(e) => {
                        setQulification(e.target.value);
                      } } required/>
                      <label for="floatingInput">Qulifications</label>
                  </div>
        </div>

        <br/>
        <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="subject" placeholder="Subjects"
              onChange={(e) => {setSubject(e.target.value);
              }} required/>
              <label for="floatingInput">Subjects</label>
             
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

        <div className="row g-2">
        <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" placeholder="Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      } } required/>
                      <label for="floatingInput">Email Address</label>
                      {errors.email && (<p>*email format is Incorrect</p> )}
                  </div>

                  <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" {...register("username", { minLength: 6, maxLength: 15 })} id="username" placeholder="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      } } required/>
                      <label for="floatingInput">Username</label>
                      {/* {errors.username && (<p>*Username must be minimum 6 letters and maximum 15 letters </p>)} */}
                      {errors?.username?.type=== "minLength" && (<p>*Username must be minimum 6 letters</p>)}
                      {errors?.username?.type=== "maxLength" && (<p>*Username must be maximum 15 letters</p>)}

                  </div>
        </div>

        <br/>
        <div className="input-group col-md-6 form-floating">
                    <input type={passwordShown ? "text" : "password"} {...register("password", { minLength: 8})} className="form-control logininput" id="" placeholder="Enter Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      } } required />
                      
                      <span class="input-group-text" id="basic-addon2"><i className="eye1" onClick={togglePasswordVisiblity}>{eye}</i></span>
                      <label for="floatingInput">Password</label>
                      {/* <button class="btn bg-white text-muted"> <span class="far fa-eye-slash"></span> </button> */}
                      {errors?.password?.type === "minLength" && (<p>*Password must contain minimum 8 characters </p> )}
                    </div>
                    <br/>
                    <button type="submit" className="btnregister" id="regsubmit">Submit</button>&nbsp;&nbsp;
                <button type="reset" className="btnreset" id="regreset">Reset</button>

      </form>
      <br/>
    </div>
    </>
  )
}