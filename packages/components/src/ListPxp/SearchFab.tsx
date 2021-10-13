import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Slide from '@mui/material/Slide';

import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
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
  
const SearchFab = ({ handleSearch }) => {
    const theme: any = useTheme();
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
                     variant="circular" 
                     className={ classes.fab } 
                     onClick={ () => setVisible(prev => !prev )} 
                >
                    <SearchIcon/>
                </Fab>
            </Zoom>
            <Slide in={visible} timeout={300} direction="left" mountOnEnter unmountOnExit>
                <InputBase type="text" className={ classes.inputSearch } onChange={ (e) => handleSearch(e.target.value) }/>
            </Slide>
        </>
    )
};

export default SearchFab;
