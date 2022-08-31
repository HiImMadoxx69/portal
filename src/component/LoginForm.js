import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { PUT_USER, GET_USER, REMOVE_USER } from '../slice/UserSession/userSession';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect,useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const theme = createTheme();
export function LoginForm(){
    
//global store states from redux dev
const isLogin = useSelector(state=>state.isAuth)
//dispatch from redux
const dispatch = useDispatch();
//UseNavigate
  const navigate = useNavigate();

  const [isLoading , setisLoading] = useState(false);

  const [open, setOpen] = React.useState(false);// for snackbar

  //snackbar status
  const [loginStatus, setStatus] = useState("failed");// default is failed for login atttempt alert

  //Message of snackbar
  const [loginMessage, setMessage ] = useState("Try again");// Default message of alert
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Email: data.get('Email'),
      Password: data.get('Password'),
    });
    try{
      //online api
        const sendRequest = await fetch("https://my-aisat-portal.herokuapp.com/employee/backend/login.php",{
            method: "POST",
            body: data,
        });

      //offline api
    //   const sendRequest = await fetch("http://localhost/student_portal/employee/backend/login.php",{
    //     method: "POST",
    //     body: data,
    // });
        
        const getResponse = await sendRequest.json();
        setisLoading(true)
        if(getResponse.statusCode === 201){
          setOpen(true);
          setStatus("error");
          setMessage("Wrong email or password")
          setisLoading(false);
        }else{
          setisLoading(false);
          setMessage("Log in successfull")
          setStatus("success");
          dispatch(PUT_USER(getResponse.statusCode));
          setisLoading(false);
          navigate('employee/dashboard')
        }
    }catch(e){
      console.log(e)
    }
  };

  //Snackbar

 


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


    return(
        <ThemeProvider theme={theme}>
          <div className=''></div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className='grid h-screen place-items-center'>
          <Paper  elevation={3}
  style={{
    padding: 12,
    paddingRight: 20,
    paddingLeft: 20,
    margin: 8,
  }}>        
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
         {isLoading === true ? (<LoadingButton loading variant="outlined">
  Submit
</LoadingButton>) : (<Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
              </Button>)}     
             
              <Grid container>
                <Grid item xs>
                  {/* <Typography>{user.value.email}</Typography>  */}
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
             </Box>
            </Paper>
          </div>
          {/* Snackbar */}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity= {loginStatus} sx={{ width: '100%' }}>
                {loginMessage}
             </Alert>
            </Snackbar>
        </Container>
      </ThemeProvider>  
    )
}