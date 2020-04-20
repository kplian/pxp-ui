import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LoginDialog from '../containers/components/LoginDialog';

const LoginContainer = () => {
  const PxpLoginPage = () => (
    <div>
      <Typography variant="h1" component="h2" gutterBottom>
        PXP Login Page
      </Typography>        
    </div>
  );
  return ( 
      <Container maxWidth="sm">
        <PxpLoginPage />
        <LoginDialog open={true} />  
      </Container>
  );
};

export default LoginContainer;