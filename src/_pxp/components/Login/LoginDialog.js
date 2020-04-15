import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import config from '../../../config';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { startLogin } from '../../actions/auth';
import { useSelector } from 'react-redux';
import { FormHelperText } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default (props) => {  
  const [open] = React.useState(props.open);
  const [login, setLogin] = React.useState(props.login || ''); 
  const [error, setError] = React.useState(''); 
  const [password, setPassword] = React.useState(''); 
  const sessionDied = useSelector(state => state.auth.sessionDied);

  const onLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!login || !password) {       
      setError('Username and password should not be empty *');
    } else {
      setError('');
      startLogin({ login, password }).then((error) => {
        if (error !== 'success') {
          setError(error);
        }
      });
    }    
  };

  const handleReset = () => {
    setLogin('');
    setPassword('');
    setError('');
  };

  const handleClose = () => {

  }

  return (     
      <Dialog open={open || sessionDied} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign in {config.applicationName}
        </DialogTitle>
        <DialogContent>            
            <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            value={login}
            onChange={onLoginChange}
            fullWidth
            required
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField            
            margin="dense"
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            fullWidth
            required
            onKeyPress={(e) => {              
              if (e.key === 'Enter') {                
                e.preventDefault();
                handleLogin();
              }
            }}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>
                      <VisibilityOff />
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}            
        </DialogContent>        
        <DialogActions>
            <Button variant="outlined" onClick={handleReset} color="primary">
            Reset
            </Button>
            <Button variant="contained" onClick={handleLogin} color="primary">
            Login
            </Button>
        </DialogActions>
      </Dialog> 
    
  );
}