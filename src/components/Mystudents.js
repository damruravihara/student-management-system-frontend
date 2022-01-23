import React, { useEffect, useState} from "react";
import axios from "axios";
import { useHistory, Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import jspdf from 'jspdf'
import "jspdf-autotable"
import EditIcon from '@material-ui/icons/Edit';

export default function Mystudents(){

  let history = useHistory();
  let path = '/public/login';
  const [searchTerm, setsearchTerm] = useState("");
  const [student, setStudent] = useState([]);
  const [user, setUser] = useState([]);
  const{ id } = useParams();


  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/userprofile').then((res)=>{
      setUser(res.data);
      })
  }
    fetchUser();
  },[]);

  useEffect(()=>{
    const getStudent = async()=>{
     const res = await axios.get(`/student/mystudents/${id}`).then((res)=>{
      setStudent(res.data);
      }).catch(()=>{
        history.push(path);
        swal({title: "unauthorized",
        text: "Please Login First",
        icon: "warning"} );
    })
    }
    getStudent();
  }, [])

  const deleteStudent=(id) =>{
    swal({
        title: "Are you sure?",
        text: "The Student Will be removed from System",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
    axios.delete(`/student/deletestudent/${id}`).then(()=>{
     
        if (willDelete) {
          swal("The Student has been deleted!", 
          {icon :"success",});  
          setTimeout(function(){
          window.location.reload();
           },1000);
        } else {
          swal("Student Is Not Deleted");}
    });
  }
  })
} 

  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Student Name", "Gender","Address","Parent","Contact Number","School","Classname"];
    const tableRows = [];

    tickets.map(ticket => {
        const ticketData = [
          ticket.stname,
          ticket.gender,
          ticket.address,
          ticket.parent,
          ticket.contactno,
          ticket.school,
          ticket.classname    
        ];
        tableRows.push(ticketData);
    })
    doc.text(user.name+"'s All Students", 14, 15).setFontSize(12);
    const date = Date().split(" ");
const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    // right down width height
    // doc.addImage(img, 'JPEG', 190, 5, 15, 15);
    // doc.addImage(img, 'JPEG', 170, 8, 25, 15);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`MyStudents.pdf`);
  };

  return(
    <>
              <br/>
    <div className="container">
    <br/>
      <center><h1 style={{fontFamily:"be vietnam" , fontSize:"30px" , fontWeight:"800"}}>My Students</h1></center>
      <br/>
      <input className="search" type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>
      <div className="reportbtn" style={{padding:"10px"}}>
      <button type="button" className="btnregister" onClick={() => generatePDF(student)}>GenerateReport</button>
        </div>
        <br/><br/>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
                  <th>Student Name</th>
                  {/* <th>Gender</th> */}
                  {/* <th>Address</th> */}
                  {/* <th>Parent</th> */}
                  <th>Contact Number</th>
                  {/* <th>School</th> */}
                  <th>ClassName</th>
            </tr>
          </thead>
          <tbody>
          {student.filter(val=>{
                          if (searchTerm === ''){
                              return val;
                          } else if(
                              val.stname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              val.contactno.toLowerCase().includes(searchTerm.toLowerCase())||
                              val.school.toLowerCase().includes(searchTerm.toLowerCase())||
                              val.classname.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                              return val;
                          }
                      }).map((student,key)=>(
                        <tr key={key}>
                           <td className="damfont">{student.stname}</td>
                            {/* <td className="damfont">{student.gender}</td> */}
                            {/* <td className="damfont">{student.address}</td> */}
                            {/* <td className="damfont">{student.parent}</td> */}
                            <td className="damfont">{student.contactno}</td>
                            {/* <td className="damfont">{student.school}</td> */}
                            <td className="damfont">{student.classname}</td>


                            <td>
                              <Link to={"/user/updatestudent/" + student._id}>
                          <IconButton aria-label="delete">
                         <EditIcon fontSize="small" color="primary"/> 
                         </IconButton></Link>
                         <IconButton aria-label="delete"  onClick={() =>deleteStudent(student._id)}>
                         <DeleteForeverIcon fontSize="small" color="secondary"/> 
                         </IconButton>
                         <Link to={"/user/studentprofile/" +student._id}><button className="btnregister" id="regsubmit">Profile</button></Link>
                         </td>
                         
                        </tr>
                      ))}
          </tbody>
        </table>
        </div>
        <br/>
    </>
  )
}