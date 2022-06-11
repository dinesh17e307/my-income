import React, { Component } from 'react'
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden'
import {Card,CardContent,CardMedia,Typography,Modal,TextField, Table} from '@mui/material'
import withStyles from '@material-ui/core/styles/withStyles';
import AllBillsstyles from '../Styles/AllBillsStyles';
import CloseIcon from '@mui/icons-material/Close';
import LogoCard from './LogoCard';
import NativeSelect from '@material-ui/core/NativeSelect';
import FileUpload from "react-mui-fileuploader"
import { getDatabase, ref, child, set, get } from "firebase/database";

import {app} from '../firebasedb'
import { Button, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { ViewColumnSharp } from '@mui/icons-material';
const querystring = require('querystring');
var ArrayCount=['1','2','3','4','5','6','7','8','9','10']
var column=['S.No','NO,of.Item','weight','Cost']
class AllBills extends Component{
    state={
        openModal:false,
        img:'',
        members:[],
        admin:false,
        customer:'',
        date:new Date().toLocaleDateString(),
        allImg:[],
        custImg:[],
        data:[],
        weight:'',
        noItem:'4',
        totalWeight:'',
        extra:'',
        status:'1',
        rate:''
        
    }
    openModal=(item)=>{
this.setState({
    openModal:true,
    img:item
})
    }
    async componentDidMount(){
        // let queryParams = window.location.search;
        var totArr=[]
        let sesArr=window.sessionStorage.getItem('weightdet')?JSON.parse(window.sessionStorage.getItem('weightdet')):[]
        let total=0
        sesArr.map(item=>{
            total=total+parseInt(item.weight)
        })
    //     console.log(sesArr)
    // queryParams = querystring.parse(queryParams);
    // console.log()
    //     const dbRef = ref(getDatabase());
    //     await get(child(dbRef, `/signup`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             this.setdatainState(snapshot.val())
    //            // console.log(snapshot.val());
    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     })

    //     await  get(child(dbRef, `allbills/${queryParams['?user']}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     this.setdatainState(snapshot.val())
    //     //console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // })
    // if (queryParams['?user'] === 'dheena5880@gmail') {
    //         this.setState({
    //     admin:true
    // })
    //     }
        this.setState({
            data:sesArr,
            totalWeight:total
        })
    
    }

        setdatainState=(data,via)=> {
        
        }

        
        
    
    
    uploadWeight = async (item) => {
        let totArr=[],sesArr=[{name:'ijihh'}]
        if(this.state.weight!='' &&this.state.noItem!=''){        let currentObj = {
           weight:this.state.weight,
           noItem:this.state.noItem
        }
        sesArr=window.sessionStorage.getItem('weightdet')?JSON.parse(window.sessionStorage.getItem('weightdet')):[]
        console.log(sesArr)

totArr=[...sesArr,currentObj]
       
console.log("ALLL",totArr)
        window.sessionStorage.setItem('weightdet', JSON.stringify(
           totArr
        ))
        let total=0
        totArr.map(item=>{
            total=total+parseInt(item.weight)
        })
this.setState({
    
    weight:'',
    data:totArr,
    totalWeight:total
})
        }

    }
  handleFilesChange = async(files) => {
  console.log(files.target,files)
  await this.setState({
      ...this.state.allImg,
      allImg:files.target.files[0]
  })
  }
  uploadBills=()=>{
      let weight=parseInt(this.state.weight)
     let data={
         noofitem:this.state.noItem,
         weight:this.state.status=='2'?weight/2:weight
         
     }
      const db = getDatabase();
        set(ref(db, `allbills/${this.state.customer.replace('.com','')}`),data );
        this.setState({
            kg: '',
            rate: '',
            date: '',
            loading: false,
            enable: false
        })
  }
   handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    showFinal=()=>{
        this.setState({
            openModal:true
        })
    }
    componentWillUnmount(){
        window.sessionStorage.clear('weightdet')
    }
    render(){
        const{classes}=this.props;
        const{data}=this.state;
        console.log(this.state)
        return(
            <>
            <LogoCard title={'Banana'}/>
           
                <div style={{margin:'20px'}}>
                    <Grid container style={{maxHeight:'600px'}}>
                    <Grid item xs={12} sm={12} lg={2} md={2} className={classes.fieldWidth} >
<NativeSelect variant="outlined" fullWidth onChange={ this.handleChange} id="noItem" value={this.state.noItem}>
    
                    {ArrayCount.map(item => {
                        return <option value={item}>{item}</option>
                    })}
</NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={2} md={2} className={classes.fieldWidth} >
<NativeSelect variant="outlined" fullWidth onChange={ this.handleChange} id="status" value={this.state.status}>
    
                    {['1','2'].map(item => {
                        return <option value={item}>{item}</option>
                    })}
</NativeSelect>
                    </Grid>
                <Grid item  xs={12} sm={12} lg={2} md={2} className={classes.fieldWidth}>
<TextField  inputProps={{ inputMode: 'numeric' }} fullWidth id="weight" variant='standard' value={this.state.weight} onChange={this.handleChange} style={{height:'40px'}}/>
                </Grid>
               <Grid item xs={12} sm={12} lg={2} md={2} className={classes.fieldWidth}>
                    <Button fullWidth variant='outlined' color="primary"  onClick={this.uploadWeight}>+ Add</Button>
                   </Grid> 
                   </Grid>
                   <Grid item>
                       <Table>
                           <TableHead>
                               <TableRow>
                              {
                                  column.map(item=>{
                                      return(
                                          <TableCell>

{item}
                              </TableCell> )
                                  })
                              } 
                              </TableRow>
                           </TableHead>
                           <TableBody>
                               {
                                   data.map((item,indx)=>{
                                       console.log(item)
                                       return(
                                           <TableRow>
                                              <TableCell>
    {indx}
</TableCell>
 <TableCell>
    {item.noItem}
</TableCell>
 <TableCell>
    {item.weight}
</TableCell>
                                           </TableRow>
                                       )
                                   })
                               }
                           </TableBody>
                       </Table>
<Grid container className={classes.content}>
    <Grid item xs={5} md={2}>Total Weight:<span style={{color:"blue"}}>&#8377;{this.state.totalWeight}</span></Grid>
    <Grid item xs={3} md={2}> 

                  <TextField  inputProps={{ inputMode: 'numeric' }} fullWidth id="extra" variant='standard' value={this.state.extra} onChange={this.handleChange} style={{height:'40px'}}/>
               </Grid>
               <Grid item xs={4} md={2}>
                   reduced
               </Grid>
               <Grid item xs={6} md={2}>
final weight:<span style={{color:"blue"}}>&#8377;{parseInt(this.state.totalWeight)-this.state.extra}</span>
               </Grid>
               <Grid item xs={12} md={12} style={{marginTop:'15px'}}>
                  <Button fullWidth variant='outlined' color="primary"  onClick={this.showFinal}>Okay</Button>
               </Grid>
                </Grid>
                </Grid>
    <Modal open={this.state.openModal} ><Grid style={{ marginTop: '100px', textAlign: 'center' }}>
               <Card>
               
                    {this.state.totalWeight}
                    <TextField  inputProps={{ inputMode: 'numeric' }} fullWidth id="rate" variant='standard' value={this.state.rate} onChange={this.handleChange} style={{height:'40px'}}/>
{parseInt(this.state.totalWeight)*parseInt(this.state.rate)}
               
               </Card>
                </Grid>
            </Modal>
    </div>
           
           
 
  

             
            </>
           
              
        
    
)
                }
            }
export default withStyles(AllBillsstyles)(AllBills)