/**
 * Dialog Pxp
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import makeStyles from '@mui/styles/makeStyles';
import Slide from '@mui/material/Slide';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    // marginBottom: theme.spacing(2),
    // marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  content: {
    flex: '1 1 auto',
    height: 'calc( 100vh - 70px)',
    width: '100%',
    padding: '0px 16px 16px 16px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 16px 0px',
    },
    backgroundColor: theme.palette.background.default,
  },
}));

const Transition: any = React.forwardRef(function Transition(props: any, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="right" ref={ref} {...props} />;
});

const DialogPxp: FC<any> = ({
  children,
  transition,
  fullScreen = true,
  fullWidth,
  iconToolbar,
  titleToolbar,
  open,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      {...(fullScreen && { fullScreen })}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {titleToolbar}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </Dialog>
  );
};

export default DialogPxp;
