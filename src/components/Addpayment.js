import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './register.css'
import { Link , useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Addpayment(){

  let history = useHistory();
  let path = '/public/login';
  const {id} = useParams();
  const { register, handleSubmit, formState: { errors }} = useForm();

  const [stname, setStname] = useState("");
  const [userId, setUserId] = useState("");
  const [classId, setClassId] = useState("");
  const [classname, setClassName] = useState("");
  const [stdId, setStdId] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [month, setMonth] = useState("");
  const [note, setNote] = useState("");
  const [student, setStudent] = useState([]);


  useEffect(()=>{
    axios.get(`/student/getstudent/${id}`).then((res)=>{
    setStudent(res.data.student)
    setStname(res.data.student.stname)
    setUserId(res.data.student.userId)
    setClassId(res.data.student.classId)
    setClassName(res.data.student.classname)
    setStdId(res.data.student._id)
    setNote("No Special Note")
    }).catch((e)=>{
      alert("getclass " +e); 
      console.log(id);
  })
}, [])


function sendData(e){
   
  e.preventDefault();
  
  const newPayment ={

    userId,
    classId,
    classname,
    stdId,
    stname,
    currentDate,
    month,
    note
  }

  axios.post('/student/addpayment',newPayment).then(()=>{
    swal({
    title: "Success!",
    text: "New Payment Added Successfully",
    icon: "success",
    button: "Ok",
  });history.push(`/user/allpayment/${student._id}`);
  }).catch((e)=>{
    swal("Please fill Form correctly " +e);
  })
};

  return(
    <>
    <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Add Payment</h1></center>
      <br/>
      <form onSubmit={sendData} className="needs-validation" noValidate>
      <div className="row g-2">
          <div className="col-md-6 form-floating">
            <input type="text" className="form-control logininput" id="stname" placeholder="Student Name" defaultValue={student.stname}
              onChange={(e) => {setStname(e.target.value);
              }} disabled/>
              <label for="floatingInput">Student Name</label>
              
          </div>

          <div className="col-md-6 form-floating">
          <select className="form-control logininput"  onChange={(e) => {setMonth(e.target.value);
              }} required>
                  <option>Select Month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                  </select>
                  <label for="floatingInput">Month</label>
                  </div>
        </div>
        <br/>
        <div className="row g-2">
        <div className="col-md-6 form-floating">
                  <input type="date" className="form-control logininput" id="dob"  onChange= {(e)=> {
                      setCurrentDate(e.target.value);
                    }} required/>
              <label for="floatingInput">Payment Date</label>
              
          </div>


          <div className="col-md-6 form-floating">
          <textarea rows="3" className="form-control logininput" id="note" placeholder="Special Note" defaultValue="No Special Note"
              onChange={(e) => {setNote(e.target.value);
              }} required/>             
              <label for="floatingInput">Special Note</label>
        </div>      
        </div>
        <br/>
        <button type="submit" className="btnregister" id="regsubmit">Submit</button>&nbsp;&nbsp;
        <Link to={"/user/allpayment/" +student._id}><button type="reset" className="btnreset" id="regreset">cancel</button></Link>




        </form>
        <br/>
    </div>
    </>
  )
}