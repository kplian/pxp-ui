/**
 * Dialog Pxp
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
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

const Transition = React.forwardRef(function Transition(props, ref) {
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
