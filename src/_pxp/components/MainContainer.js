import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { startLogout } from '../actions/auth';
import { startSetExpenses } from '../actions/test';
import { useDispatch } from 'react-redux';
import LoginDialog from './LoginDialog';

const MainContainer = ({ InitPage: MyInitPage, Menu: MyMenu }) => {
  const dispatch = useDispatch();
  const PxpInitPage = () => (
    <div>
      <Typography variant="h1" component="h2" gutterBottom>
        PXP Init Page
      </Typography>        
    </div>
  );
  const InitPage = MyInitPage || PxpInitPage;

  const PxpMenu = () => (
    <div>
      <Typography variant="h1" component="h2" gutterBottom>
        PXP Menu
      </Typography>        
    </div>
  );
  const Menu = MyMenu || PxpMenu;
  return ( 
      <Container maxWidth="sm">
        <button onClick={() => { startLogout() }}>Logout</button>
        <button onClick={() => { startSetExpenses() }}>Request</button>
        <Menu />
        <InitPage />  
        <LoginDialog open={false}/>      
      </Container>
  );
};

export default MainContainer;