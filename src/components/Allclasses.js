import React,{useEffect, useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import jspdf from 'jspdf'
import "jspdf-autotable"
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import "./allusers.css"

export default function Allclasses(){

  let history = useHistory();
  let path = '/public/login';
  const [searchTerm, setsearchTerm] = useState("");
  const [user, setUser] = useState([]);

  const [classroom, setClassroom] = useState([]);

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
  
  useEffect(()=>{
    const getClassroom = async()=>{
     const res = await axios.get('/student/allclasses').then((res)=>{
      setClassroom(res.data);
      }).catch((e)=>{
        alert(e); 
    })
    }
    getClassroom();
  }, [])

  const deleteClass=(id) =>{
    swal({
        title: "Are you sure?",
        text: "If you delete class from system all the students also remove from system",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
    axios.delete(`/student/deleteallstudent/${id}`).then(()=>{
     
        if (willDelete) {
          swal("The Class has been deleted!", 
          {icon :"success",});  
          setTimeout(function(){
          window.location.reload();
           },1000);
        } else {
          swal("Class Is Not Deleted");}
    });
  }
  })
} 
const Attendencehistory=(id)=>{
  history.push(`/user/historyatten/${id}`);
}

            //generate PDF
            const generatePDF = tickets => {

              const doc = new jspdf();
              const tableColumn = ["Name", "Class Name","Grade"];
              const tableRows = [];
          
              tickets.map(ticket => {
                  const ticketData = [
                    ticket.userName,
                    ticket.classname,
                    ticket.grade    
                  ];
                  tableRows.push(ticketData);
              })
              doc.text(user.name+"'s All Classes", 14, 15).setFontSize(12);
              const date = Date().split(" ");
      const dateStr = date[1] + "-" + date[2] + "-" + date[3];
              // right down width height
              // doc.addImage(img, 'JPEG', 190, 5, 15, 15);
              // doc.addImage(img, 'JPEG', 170, 8, 25, 15);
              doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
              doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
              doc.save(`AllClasses.pdf`);
            };
  

  return(
    <>
      <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>{user.name}'s Classes</h1></center>
      <br/>
    {/* <i class="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i> */}
      <input className="search" type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
            <br/>
      <div className="row" style={{padding:"10px"}}>
          <div className="col form-floating">
      <button type="button" className="btnregister" onClick={() => generatePDF(classroom)}>GenerateReport</button>&nbsp;&nbsp;

        <Link to={"/user/createclass"}><button type="reset" className="btnregister" id="regreset">Create Class</button></Link>&nbsp;&nbsp;
        <button onClick={() => Attendencehistory(classroom._id)} className="btnregister" id="regsubmit">Attendence History</button>
        </div>  
        </div> 
        <br/>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
                  {/* <th>Name</th> */}
                  <th>Class Name</th>
                  <th>Grade</th>
            </tr>
          </thead>
          <tbody>
          {classroom.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.classname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.grade.toLowerCase().includes(searchTerm.toLowerCase()) 
                          ){
                              return val;
                          }
                      }).map((classroom,key)=>(
                        <tr key={key}>
                            {/* <td className="damfont">{classroom.userName}</td> */}
                            <td className="damfont">{classroom.classname}</td>
                            <td className="damfont">{classroom.grade}</td>


                            <td><Link to={"/user/updateclass/" + classroom._id}>
                          <IconButton aria-label="delete">
                         <EditIcon fontSize="small" color="primary"/> 
                         </IconButton></Link>
                         <IconButton aria-label="delete"  onClick={() =>  deleteClass(classroom._id)}>
                         <DeleteForeverIcon fontSize="small" color="secondary"/> 
                         </IconButton>
                         <Link to={"/user/addstudent/" + classroom._id}><button className="btnregister" id="regsubmit">Add Student</button></Link>&nbsp;
                         <Link to={"/user/allstudents/" + classroom._id}><button className="btnregister" id="regsubmit">All Students</button></Link>&nbsp;
                         <Link to={"/user/attendence/" + classroom._id}><button className="btnregister" id="regsubmit">Attendence</button></Link>&nbsp;
                         <Link to={"/user/paymentstudent/" + classroom._id}><button className="btnregister" id="regsubmit">payment</button></Link>
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