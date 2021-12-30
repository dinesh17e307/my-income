const LoginPageStyle = (theme) => ({
  outerContainer: {
    marginTop: '30px',
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
    marginRight: '10px',
    width: '120px',
    height: '40px',
    color: 'white !important',
    border: `1px solid #028DE1 !important`,
    background: '#d500f9',
    '&:hover': {
      backgroundColor: '#d500f9 !important',
      color: 'white !important',
    },
    '&:focus': {
      backgroundColor: 'white !important',
      color: '#00acc1 !important',
      border: '1px solid #d500f9 !important',
    },
    '&:disabled': {
      backgroundColor: '#d500f9 !important',
      color: 'white !important',
      border: '1px solid #d500f9 !important',
    }

  },
  signupButton: {
    borderRadius: '5px',
    marginRight: '10px',
    width: '120px',
    height: '40px',
    color: 'white !important',
    border: `1px solid #028DE1 !important`,
    background: '#d500f9',
    '&:hover': {
      backgroundColor: '#d500f9 !important',
      color: 'white !important',
    },
    '&:focus': {
      backgroundColor: 'white !important',
      color: '#00acc1 !important',
      border: '1px solid #d500f9 !important',
    },
    '&:disabled': {
      backgroundColor: '#d500f9 !important',
      color: 'white !important',
      border: '1px solid #d500f9 !important',
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