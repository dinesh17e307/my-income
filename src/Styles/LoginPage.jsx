const LoginPageStyle = (theme) => ({
  outerContainer: {
    margin:'40px !important',
    
    [theme.breakpoints.down('xs')]: {
      marginTop: '80px',

    },
  },
  marginFields: {
    marginTop: '10px',

    [theme.breakpoints.down('xs')]: {
      marginLeft: '50px',
    },
  },
  outerButton: {
    marginLeft: '50px',
    marginTop: '20px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0px'
    },
  },
  loginButton: {

    borderRadius: '5px',
  
    width: '120px',
    height: '40px',
    color: '#d500f9 !important',
    '&:hover': {
      color: 'grey !important',
    },
    '&:focus': {
      color: 'grey !important',
    },
    '&:disabled': {
      color: 'grey !important',
    }

  },
  signupButton: {
    borderRadius: '5px',
   
    width: '120px',
    height: '40px',
    color: '#d500f9 !important',
    '&:hover': {
      color: 'grey !important',
    },
    '&:focus': {
      color: 'grey !important',
    },
    '&:disabled': {
      color: 'grey !important',
    }
  },
  errorItem:{
fontSize:'14px',
fontWeight:500,
color:'red'
  },
  width: {
    width: '90%',
    marginTop: '10px',
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
})
export default LoginPageStyle;