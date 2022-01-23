import React,{useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import profile from "./Assets/profile.png"
import women from "./Assets/woman.png"
import man from "./Assets/man.png"
import './profile.css'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const Studentprofile = props=>{

  let history = useHistory();
  let path = '/public/login';
  const [student, setStudent] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    axios.get(`/student/getstudent/${id}`).then((res)=>{
    setStudent(res.data.student)
    }).catch(()=>{
      history.push(path);
      swal({title: "unauthorized",
      text: "Please Login First",
      icon: "warning"} ); 
  })
}, [])



return(
  <>
      <br/>
    <div className="fullprofile">
      <br/>
    <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>Student Profile</h1></center>
      <div className="row">
        <div className="column column-img">

        <div className="profile">
          <div className="image">
          {student.gender==="Female"?<center><img src={women}  width="200" height="200"></img></center>:student.gender==="Male"?<center><img src={man}  width="200" height="200"></img></center>:<center><img src={profile}  width="200" height="200"></img></center>}
          <center><h2 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800" , marginTop:"20px"}}>{student.stname}</h2></center>
          <center><h6>{student.classname}</h6></center>
          </div>
        </div>

        </div>
        <div className="column column-hrline">
          <div class="vl"></div>
        </div>
        <div className="column column-profle">
        <div className="profileleft">
      <br/>

      <div>
      {/* <Link to={"/student/update/" + student._id} >
      <button type="button" 
              className="btn btn-outline-success" 
              >Update Profile</button> </Link> */}
      <div className="editbutton">     
      <Link to={"/user/updatestdprofile/" + student._id}>
      <IconButton aria-label="delete">
                         <EditIcon fontSize="medium" color="primary"/> 
                         </IconButton></Link>
                         </div>  
    </div>
    <br/>

      <table className="table table-light">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{student.stname}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{student.address}</td>
          </tr>

          <tr>
            <td>Contact Number</td>
            <td>{student.contactno}</td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>{student.gender}</td>
          </tr>

          <tr>
            <td>ClassName</td>
            <td>{student.classname}</td>
          </tr>

          <tr>
            <td>Parent</td>
            <td>{student.parent}</td>
          </tr>

          <tr>
            <td>School</td>
            <td>{student.school}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
        </div>
      </div>
  </>
)
}

export default Studentprofile;