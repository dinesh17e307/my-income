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

    borderRadius: '25px',
    marginRight: '10px',
    width: '120px',
    height: '40px',
    color: 'skyblue',
    border: `1px solid #028DE1 !important`,
    background: 'white',


  },
  signupButton: {
    borderRadius: '25px',
    width: '120px',
    height: '40px',
    color: 'white',
    borderColor: 'skyblue',
    background: '#028DE1',
    '&:hover': {
      backgroundColor: '#028DE8 !important',
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
  width: {
    width: '90%',
    marginTop: '10px',
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
})
export default LoginPageStyle;