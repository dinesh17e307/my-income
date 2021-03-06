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
import LogoCard from '../Pages/LogoCard';
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

    {
        id: 'userName',
        label: 'userName',
        minWidth: 50,


    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 50,


    },
    { id: 'password', label: 'password', minWidth: 50 },
    { id: 'phoneNumber', label: 'phone Number', minWidth: 50 },

];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

export default function ColumnGroupingTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [open, setopen] = React.useState(false)
    const [isEdit, setEdit] = React.useState(false)
    const [editValue, setEditValue] = React.useState({})
    const [deleteValue, setDelete] = React.useState(false)
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
        get(child(dbRef, `/signup`)).then((snapshot) => {
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
    function setdatainState(data) {
        let arr = [];
        for (let key in data) {
            console.log(data[key])
            let value = data[key]
            arr.push({
                phoneNumber: value.phoneNumber,
                password: value.password,
                email: value.email,
                userName: value.userName,


            })


        }
        console.log(arr)
        setData(arr)
        setLoading(false)
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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
    const handleClose = () => {
        setopen(false)
    }
    return (
        <>
         <LogoCard/>
            <div>
                {loading && (<div style={{ textAlign: 'center', marginLeft: '40%', marginTop: '10%' }} className="lds-dual-ring"></div>)}
            </div>
            {!loading && (<div>
                {console.log(data)}

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
                               
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                       
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[7, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
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