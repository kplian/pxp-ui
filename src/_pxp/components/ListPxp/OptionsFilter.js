import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[8],
    },
    tabOption: {
        minWidth: '100px',
    },
    circle: {
        textAlign: 'center',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        border: '2px solid ' + theme.palette.action.disabledBackground,
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3rem',
    },
    image:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',  
        width: '57px',
        height: '57px', 
        borderRadius: '50%',
    },
    container: {
        display: 'flex'
    },
    active: {
        minWidth: '100px',
        '& > span > div ': {
            border: '2px solid ' + theme.palette.secondary.main,
        }
    }
}));

const OptionsFilter = ( { filters, handleFilter }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log(value);
        setValue(newValue);
        handleFilter( tabs[newValue].value );
    };

    const tabs =[
         {
             value: '',
             icon: 'format_list_bulleted',
             label: 'Todo'
         }
    , ...filters ];

    return (
        <AppBar position="static" color="default" className={ classes.root }>
            <Tabs
                variant="scrollable"
                scrollButtons="on"
                value={value}
                onChange={handleChange}
                textColor="secondary"
            >
                { tabs.map( (item, i) => 
                    <Tab key={ i } value={i}
                        className={ value===i ? classes.active : classes.tabOption }
                        label={
                            <React.Fragment>
                                <div className={ classes.circle }>
                                    { item.image && 
                                        <img src={ item.image } className={ classes.image }/> 
                                    }
                                    { item.icon && !item.image &&
                                        <Icon className={ classes.icon }>{ item.icon }</Icon>
                                    }
                                </div>
                                <span>{ item.label }</span>
                            </React.Fragment>
                        }
                    /> 
                )}
            </Tabs>
        </AppBar>
    )
};

export default OptionsFilter; 
