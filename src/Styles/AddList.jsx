 const AddList = (theme) => ({
   outerContainer: {
    [theme.breakpoints.down('xs')]: {
       marginTop: '40% !important',
     },
  },
   width: {
     width: '90%',
     marginTop: '10px',
     [theme.breakpoints.down('xs')]: {
       width: '90%',
     },
   },
      loginButton: {
         marginTop:'20px',
         borderRadius: '25px',
         marginRight:'10px',
         width: '120px',
         height: '40px',
         color: 'white',
         border: `1px solid #028DE1 !important`,
         backgroundColor:'#028DE1',
        '&:hover': {
      backgroundColor: '#00acc1 !important',
      color: 'white !important',
    },
    '&:focus': {
      backgroundColor: 'white !important',
      color: '#00acc1 !important',
      border: '1px solid #00acc19 !important',
        },
        '&:disabled': {
      backgroundColor: 'lightgrey !important',
      color: '#00acc1 !important',
      border: '1px solid lightgrey !important',
    }
         
     },
   
})
export default AddList;