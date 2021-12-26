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
         borderRadius: '5px',
         marginRight:'10px',
         width: '120px',
         height: '40px',
         color: 'white',
         border: `1px solid #d500f9 !important`,
         background: '#d500f9 !important',
    '&:hover': {
      backgroundColor: '#d500f9 !important',
      color: 'white !important',
    },
    '&:focus': {
      backgroundColor: '#d500f9 !important',
      color: 'white !important',
      border: '1px solid #d500f9 !important',
    },
    '&:disabled': {
      backgroundColor: '#d500f9 !important',
      color: 'white !important',
      border: '1px solid #d500f9 !important',
    }
         
     },
   
})
export default AddList;