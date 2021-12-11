const CommonStyle = (theme) => ({
    commonbutton:{
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
      border: '1px solid #00acc19 !important',
    },
    '&:disabled': {
      backgroundColor: 'white !important',
      color: '#00acc1 !important',
      border: '1px solid blue !important',
    }
    },
    commonbuttonClose:{
      borderRadius: '5px',
  marginRight: '10px',
  width: '120px',
  height: '40px',
  color: 'white !important',
  border: `1px solid #028DE1 !important`,
  background: '#ffd54f',
  '&:hover': {
    backgroundColor: '#ffd54f !important',
    color: 'white !important',
  },
  '&:focus': {
    backgroundColor: 'white !important',
    color: '#00acc1 !important',
    border: '1px solid #ffd54f !important',
  },
  '&:disabled': {
    backgroundColor: 'white !important',
    color: '#00acc1 !important',
    border: '1px solid blue !important',
  }
  },
    width: {
        width: '90%',
        marginTop: '10px',
        [theme.breakpoints.down('xs')]: {
          width: '90%',
        },
      },
})
export default CommonStyle;