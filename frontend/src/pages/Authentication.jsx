import React,{useContext, useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FacebookIcon from '@mui/icons-material/Facebook';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import GoogleIcon from '@mui/icons-material/Google';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    '0 18px 45px rgba(224, 64, 160, 0.16)',
  borderRadius: '28px',
  border: '1px solid rgba(224, 64, 160, 0.14)',
  background: 'rgba(255, 255, 255, 0.96)',
  backdropFilter: 'blur(14px)',
  [theme.breakpoints.up('sm')]: {
    width: '460px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


function ForgotPassword({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Password reset flow is not wired up yet. Add your recovery form or API call here.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Authentication() {

  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [name,setName] = useState();
  const [formState,setFormState] = useState(0);
  const [messages,setMessages] = useState();
  const [error,setError] = useState("");

  const [forgotOpen, setForgotOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {handleRegister,handleLogin} = useContext(AuthContext);

   let handleAuth = async() =>{
    try{
      setError("");
      if(formState === 0){
        await handleLogin(username,password);
      }
      if(formState === 1){
        let result = await handleRegister(name,username,password);
        console.log(result);
        setMessages(result);
        setSnackbarOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
        setUsername("");

      }

    }catch(err){
       let message = err?.response?.data?.message || "Something went wrong";
       setError(message);
    }
  }

  const handleClickOpen = () => {
    setForgotOpen(true);
  };

  const handleClose = () => {
    setForgotOpen(false);
  };





  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        background: 'radial-gradient(circle at top left, rgba(255, 128, 195, 0.32), transparent 32%), radial-gradient(circle at bottom right, rgba(224, 64, 160, 0.14), transparent 28%), #fef7ff',
      }}
    >
      <Card variant="outlined">
       
        <Box
          component="form"
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 1 }}>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 800 }}>
              {formState === 0 ? "Welcome back" : "Create your account"}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              {formState === 0
                ? "Sign in to jump back into your meetings."
                : "Join the workspace and start collaborating in real time."}
            </Typography>
          </Box>
          {formState=== 1 ?
            <FormControl>
            <FormLabel htmlFor="name" sx={{ color: '#334155', fontWeight: 600, mb: 0.75 }}>Full Name</FormLabel>
            <TextField
            
              id="name"
              type="text"
              name="name"
              placeholder="Alex Hormoizi"
              autoComplete="name  "
              value={name}
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(224, 64, 160, 0.18)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(224, 64, 160, 0.42)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e040a0',
                  },
                },
              }}
              onChange={(e) => setName(e.target.value)}
        
            />
          </FormControl>:""
          }
         
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: '#334155', fontWeight: 600, mb: 0.75 }}>Username</FormLabel>
            <TextField
            
              id="username"
              type="text"
              name="username"
              value={username}
              placeholder="alex123"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(224, 64, 160, 0.18)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(224, 64, 160, 0.42)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e040a0',
                  },
                },
              }}
              onChange={(e) => setUsername(e.target.value)}
        
            />
          </FormControl>

          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password" sx={{ color: '#334155', fontWeight: 600 }}>Password</FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'baseline', color: '#e040a0', fontWeight: 600, textDecoration: 'none' }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
          
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  '& fieldset': {
                    borderColor: 'rgba(224, 64, 160, 0.18)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(224, 64, 160, 0.42)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#e040a0',
                  },
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Typography sx={{ minHeight: '24px', color: '#c62828', fontSize: '0.95rem' }}>{error}</Typography>

          <ForgotPassword open={forgotOpen} handleClose={handleClose} />
          <Button
             type="button"
             fullWidth
             variant="contained"
             sx={{
               py: 1.4,
               borderRadius: '999px',
               textTransform: 'none',
               fontSize: '1rem',
               fontWeight: 700,
               backgroundColor: '#e040a0',
               boxShadow: '0 12px 28px rgba(224, 64, 160, 0.28)',
               '&:hover': {
                 backgroundColor: '#d63391',
               },
             }}
             onClick={handleAuth}
              >
            {formState==0 ?"Sign In":"Register"}
          </Button>
          <Typography sx={{ textAlign: 'center', color: '#475569' }}>
        
            {formState === 0 ? "Don't have an account?    ":"Already have an account?      "}
            <span>
              <Button
                variant="contained"
                sx={{
                  ml: 1,
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontWeight: 700,
                  backgroundColor: '#f7c7e2',
                  color: '#9d174d',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#f2b4d8',
                    boxShadow: 'none',
                  },
                }}
                onClick={() => {setFormState(formState === 0 ? 1:0)}}
              > 
                {formState ===0 ?"Sign Up":" Sign In"}
              </Button>
             
            </span>
          </Typography>
        </Box>
        <Divider sx={{ my: 3, color: '#94a3b8' }}>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              py: 1.25,
              borderRadius: '16px',
              textTransform: 'none',
              borderColor: 'rgba(224, 64, 160, 0.24)',
              color: '#334155',
              '&:hover': {
                borderColor: '#e040a0',
                backgroundColor: 'rgba(224, 64, 160, 0.04)',
              },
            }}
            onClick={() => alert('Sign in with Google')}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              py: 1.25,
              borderRadius: '16px',
              textTransform: 'none',
              borderColor: 'rgba(224, 64, 160, 0.24)',
              color: '#334155',
              '&:hover': {
                borderColor: '#e040a0',
                backgroundColor: 'rgba(224, 64, 160, 0.04)',
              },
            }}
            onClick={() => alert('Sign in with Facebook')}
            startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </Card>

      <Snackbar
       
       open={snackbarOpen}
       autoHideDuration={2000}
       message={messages}
       onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
}
