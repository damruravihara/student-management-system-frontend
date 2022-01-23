import React,{useState,useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import profile from "./Assets/profile.png"
import women from "./Assets/woman.png"
import man from "./Assets/man.png"
import './profile.css'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
 


const Profile = props=>{

  let history = useHistory();
  let path = '/public/login';

  const [user, setUser] = useState([]);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data);
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} ); 
    })
  }
    fetchUser();
  },[]);

  const deleteUser=(id) =>{
    swal({
        title: "Are you sure?",
        text: "Your Account Will be permenatly remove from System",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
    axios.delete(`/user/delete/${id}`).then(()=>{
      axios.delete(`/student/deleteuserstudent/${id}`).then(()=>{
        axios.delete(`/student/deleteallpayment/${id}`).then(()=>{
          axios.delete(`/student/deleteuserabsent/${id}`).then(()=>{
            axios.delete(`/student/deleteuserpresent/${id}`).then(()=>{
              axios.delete(`/student/deleteuserclass/${id}`).then(()=>{
          
        if (willDelete) {
          swal("The User has been deleted!", 
          {icon :"success",});  
          setTimeout(function(){
          window.location.reload();
           },1000);
        } else {
          swal("User Is Not Deleted");}
      })
    })
    })
  })
    })
    });
  }
  })
} 

  return(
    <>
    <br/>
    <div className="fullprofile">
      <div className="row">
        <div className="column column-img">

        <div className="profile">
          <div className="image">
          {user.gender==="Female"?<center><img src={women}  width="200" height="200"></img></center>:user.gender==="Male"?<center><img src={man}  width="200" height="200"></img></center>:<center><img src={profile}  width="200" height="200"></img></center>}
          <center><h2 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800" , marginTop:"20px"}}>{user.name}</h2></center>
          <center><h6>{user.email}</h6></center>
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
      {/* <Link to={"/user/update/" + user._id} >
      <button type="button" 
              className="btn btn-outline-success" 
              >Update Profile</button> </Link> */}
      <div className="editbutton">     
      <div className="row">
        <div className="col form-floating">
          

        <Link to={"/user/update/" + user._id}>
      <IconButton aria-label="delete">
                         <EditIcon fontSize="medium" color="primary"/> 
                         </IconButton></Link>
                         <IconButton aria-label="delete"  onClick={() =>  deleteUser(user._id)}>
                         <DeleteForeverIcon fontSize="medium" color="secondary"/> 
                         </IconButton> 

        </div>
      </div>
                    
    </div>  
             
    </div>
    <br/>

      <table className="table table-light">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>

          <tr>
            <td>Address</td>
            <td>{user.address}</td>
          </tr>

          <tr>
            <td>Contact Number</td>
            <td>{user.contactno}</td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>{user.gender}</td>
          </tr>

          <tr>
            <td>Institute</td>
            <td>{user.institute}</td>
          </tr>

          <tr>
            <td>Qulification</td>
            <td>{user.qulification}</td>
          </tr>

          <tr>
            <td>Subject</td>
            <td>{user.subject}</td>
          </tr>

          <tr>
            <td>Grade</td>
            <td>{user.grade}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
        </div>
      </div>

    {/* <div className="profileleft">
      <h6>Name: {user.name}</h6>
      <h6>Address: {user.address}</h6>
      <h6>Contact Number: {user.contactno}</h6>
      <h6>Gender: {user.gender}</h6>
      <h6>Institute: {user.institute}</h6>
      <h6>Qulification: {user.qulification}</h6>
      <h6>Subject: {user.subject}</h6>
      <h6>Grade: {user.grade}</h6>
      <h6>Email: {user.email}</h6>
    </div> */}
    </>
  )
}

export default Profile;