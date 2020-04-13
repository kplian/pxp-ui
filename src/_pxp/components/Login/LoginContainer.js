import React from 'react';
import Container from '@material-ui/core/Container';
import LoginDialog from './LoginDialog';
import Typography from '@material-ui/core/Typography';

const LoginPage = ({ LoginPage:MyLoginPage }) => {
  const PxpLoginPage = () => (
    <div>
      <Typography variant="h1" component="h2" gutterBottom>
        PXP Login Page
      </Typography>        
    </div>
  );
  const LoginPage = MyLoginPage || PxpLoginPage;
  return ( 
      <Container maxWidth="sm">
        <LoginPage />
        <LoginDialog open={true}/>  
      </Container>
  );
};

export default LoginPage;