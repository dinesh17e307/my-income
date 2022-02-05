import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../Spinner/Spinner.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddList from './AddList'
import { getDatabase, ref, child, set, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Hidden, Grid, Card, Button } from '@material-ui/core';
import { TextField } from '@mui/material';
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import LogoCard from '../Pages/LogoCard';
import { useState } from 'react';
import FormStyle from '../Styles/AddList'
const querystring = require('querystring');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAI3gpzWCvFAn6O2WS1FkrZEPG2_ykHcA",
  authDomain: "my-income-fbd33.firebaseapp.com",
  databaseURL: "https://my-income-fbd33-default-rtdb.firebaseio.com",
  projectId: "my-income-fbd33",
  storageBucket: "my-income-fbd33.appspot.com",
  messagingSenderId: "571957745936",
  appId: "1:571957745936:web:99190cd33c602ad45eed95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const columns = [
  { id: 'kg', label: 'Kg', minWidth: 50 },
  { id: 'rate', label: 'Rate', minWidth: 50 },
  {
    id: 'cost',
    label: 'Cost Per Day',
    minWidth: 50,


  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 50,


  },

];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [open, setopen] = React.useState(false)
  const [isEdit, setEdit] = React.useState(false)
  const [editValue, setEditValue] = React.useState({})
  const [deleteValue, setDelete] = React.useState(false)
  const [curValue, setCurValue] = React.useState(0)
  const [nextValue, setnextValue] = React.useState(7)
  const [OrgData, setOrgData] = React.useState([])
  const [Todate,setTodate]=React.useState(new Date())
  const [Fromdate,setFromdate]=React.useState(new Date())
  const [WeekIncome, setWeekIncome] = React.useState(0)
  // React.useEffect(() => {
  //   axios.get('https://goweb-1c5e7-default-rtdb.firebaseio.com/flower.json').then(res => {
  //     setdatainState(res.data)
  //     console.log(res)
  //   }

  //   ).catch(err => {
  //     console.log(err)
  //   })
  // }, [])
  React.useEffect(() => {
    let queryParams = window.location.search;
    queryParams = querystring.parse(queryParams);
    console.log(queryParams)
    const dbRef = ref(getDatabase());
    get(child(dbRef, `sambanki/${queryParams['?user']}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setdatainState(snapshot.val())
        console.log(snapshot.val());
      } else {
        console.log("No data available");
        setLoading(false)
      }
    }).catch((error) => {
      console.error(error);
    })
  }, [open, deleteValue])
  React.useEffect(()=>{
    let sum=0
    var data=OrgData.filter(item=>new Date(Fromdate)<= new Date(item.date) && new Date(item.date)<=new Date(Todate))
    let weekCost=data.map(item=>{
      sum+=item.cost
    })
    setWeekIncome(sum)
    setData(data)
  },[Todate,Fromdate])
  function setdatainState(data) {
    let arr = [];
    for (let key in data) {
      console.log(data[key])
      let value = data[key]
      arr.push({
        kg: value.kg,
        cost: value.cost,
        rate: value.rate,
        date: value.date,


      })


    }
    console.log(arr)
    setOrgData(arr)
    setData(arr.slice(curValue,nextValue))
    setLoading(false)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  console.log(OrgData.slice(nextValue*newPage,nextValue*(newPage+1)),nextValue*newPage,nextValue*(newPage+1))
    setData(OrgData.slice(nextValue*newPage,nextValue*(newPage+1)))
    
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteData = async (row) => {
    let queryParams = window.location.search;
    queryParams = querystring.parse(queryParams);
    setDelete(!deleteValue)
    const db = getDatabase();
    set(ref(db, `sambanki/${queryParams['?user']}/` + row.date), null);

  }
  const editForm = (row) => {
    setEdit(true);
    setopen(true);
    setEditValue(row)
    console.log('edit', row)
  }
  const updateDate=(date)=>{
    console.log(date.target.value)
  }
  const handleClose = () => {
    setopen(false)
  }
  return (
    <>
     <LogoCard title={'Sambangi List'}/>
      <div>
        <Hidden smDown>{loading && (
          <div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '20%' }} className="lds-dual-ring"></div>
        )}</Hidden>
        <Hidden mdUp>{loading && (
          <div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '70%' }} className="lds-dual-ring"></div>
        )}</Hidden>
      </div>
      {!loading && (<div style={{ padding: '20px' }}>
        <Card style={{height:'200px'}}>
          <Grid container style={{ padding: '20px' }}>
            <Grid xs={12} lg={5} style={{ marginBottom: "20px" }}>
              <Grid xs={12} lg={6}>FromDate</Grid>
            <TextField  id="date" className={FormStyle.width} type='date'fullWidth  onChange={(event)=>setFromdate(event.target.value)} value={Fromdate} /></Grid>
            <Grid xs={12} lg={5} style={{ marginBottom: "20px" }}>
            <Grid xs={12} lg={6}>ToDate</Grid>
            <TextField className={FormStyle.width} id="date" type='date' fullWidth  onChange={(event)=>setTodate(event.target.value)} value={Todate} /></Grid>
            {WeekIncome>0&&(<Grid xs={12} lg={6} style={{ marginBottom: "20px",fontWeight:400,fontFamily:"Roboto" }}>
             Week Income:   <span style={{color:"blue",fontWeight:600,fontFamily:'Roboto'}}>&#8377;{WeekIncome}</span>
            </Grid>)}
          </Grid>
        </Card>
        <Hidden smDown>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align} >
                            <span style={{ color: column.id == 'date' ? 'red' : 'black' }}> {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}</span>
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <EditSharpIcon color='success' style={{ cursor: 'pointer' }} onClick={() => editForm(row)} />
                      </TableCell>
                      <TableCell>
                        <DeleteIcon color='error' style={{ cursor: 'pointer' }} onClick={() => deleteData(row)} />
                      </TableCell>
                    </TableRow>
                  );
                })}

              </TableBody>
            </Table>
          </TableContainer></Hidden>
        <Hidden mdUp>
          <Grid item style={{ padding: '10px' }}>{
            data.map(item => {
              return (
                <Card style={{ height: '100px', marginBottom: '10px', border: '2px solid blue' }}>
                  <Grid container style={{ padding: '10px' }}>
                    <Grid xs={4} style={{ display: 'inline-grid' }}>
                      <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Roboto' }}>Kilogram</span>
                      <span style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Roboto' }}> {item.kg}</span>
                    </Grid>
                    <Grid xs={4} style={{ display: 'inline-grid' }}>
                      <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Roboto' }}>Date</span>
                      <span style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Roboto', color: 'blue' }}> {item.date}</span>
                    </Grid>
                    <Grid xs={4} style={{ display: 'inline-grid' }}>
                      <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Roboto' }}>Cost</span>
                      <span style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Roboto' }}>    {item.cost}</span>
                    </Grid>
                    <Grid xs={4} style={{ display: 'inline-grid' }}>
                      <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Roboto' }}>Rate</span>
                      <span style={{ fontSize: '16px', fontWeight: 400, fontFamily: 'Roboto' }}>  {item.rate}</span>
                    </Grid>
                    <Grid xs={4} style={{ display: 'inline-grid' }}>
                      <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Roboto' }}>Edit</span>
                      <span> <EditSharpIcon color='success' style={{ cursor: 'pointer' }} onClick={() => editForm(item)} /></span>
                    </Grid>
                    <Grid xs={4} style={{ display: 'inline-grid' }}>
                      <span style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'Roboto' }}>Delete</span>
                      <span><DeleteIcon color='error' style={{ cursor: 'pointer' }} onClick={() => deleteData(item)} /></span>
                    </Grid>

                  </Grid>
                </Card>
              )
            })
          }</Grid></Hidden>
          <Hidden mdUp>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={OrgData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Hidden>
        <Hidden smDown>
        <TablePagination
          rowsPerPageOptions={[7, 25, 100]}
          component="div"
          count={OrgData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Hidden>
      </div>

      )}
      {isEdit && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit your Records and update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <AddList data={editValue} closedialog={handleClose} />
            </DialogContentText>

          </DialogContent>

        </Dialog>
      )}
    </>
  );
}