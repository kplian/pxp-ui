import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, Box, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: 'fit-content'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    border: '1px solid ' + theme.palette.action.disabled 
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  
  const classes = useStyles();
  //get user from 
  const user = {
    name: 'Jaime Rivera',
    avatar: '/images/user.png',
    bio: 'Software Arquitect'
  };

  return (
    <div
      {...props}
      className={classes.root}
    >
      <Box display="flex" justifyContent="center">
        <Avatar
            alt="User"
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            to="/settings"
          />
      </Box>
      <Box
        mt={2}
        textAlign="center"
      >
        <Link
          component={RouterLink}
          to="/settings"
          variant="h5"
          color="textPrimary"
          underline="none"
        >
          {`${user.name}`}
        </Link>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {user.bio}
        </Typography>
      </Box>
    </div>
  );
};

export default Profile;