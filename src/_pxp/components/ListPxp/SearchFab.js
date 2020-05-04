import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      top: theme.spacing(12),
      right: theme.spacing(2),
      float: 'right',
      zIndex: 20
    },
    inputSearch: {
      position: 'fixed',
      top: theme.spacing(12.7),
      right: theme.spacing(4),
      float: 'right',
      zIndex: 10,
      border: '1px solid ' + theme.palette.secondary.main,
      background: `${ theme.palette.background.paper }`,
      borderRadius: '20px',
      padding: '10px',
      paddingRight: '45px',
      paddingTop: '5px',
      paddingBottom: '5px',
      width: '300px',
    },
    slide: {
    }
    // fabGreen: {
    //   color: theme.palette.common.white,
    //   backgroundColor: green[500],
    //   '&:hover': {
    //     backgroundColor: green[600],
    //   },
    // },
  }));
  
const SearchFab = () => {
    const theme = useTheme();
    const classes = useStyles();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const [ visible, setVisible ] = React.useState(false);

    return (
        <>
            <Zoom
                key={'inherit'}
                in={true}
                timeout={transitionDuration}
                style={{
                transitionDelay: `${transitionDuration.exit }ms`,
                }}
                unmountOnExit
            >
                <Fab aria-label='Search' 
                     color="secondary" 
                     variant="round" 
                     className={ classes.fab } 
                     onClick={ () => setVisible(prev => !prev )} 
                >
                    <SearchIcon/>
                </Fab>
            </Zoom>
            <Slide in={visible} timeout={700} direction="left" mountOnEnter unmountOnExit>
                <InputBase type="text" className={ classes.inputSearch }/>
            </Slide>
        </>
    )
};

export default SearchFab;
