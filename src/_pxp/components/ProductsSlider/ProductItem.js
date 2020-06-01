import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme)=>({
    root: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent !important',
        display: 'flex',
        flexDirection: 'column'
    }, 
    containerImage: {
        width: '100%',
        height: '50%',
        maxHeight: '50%',
        textAlign: 'center',
    },
    container: {
        width: '80% !important',
        marginLeft: '10%',
        height: '40% !important',
        padding: '5px',
        background: 'white',
        borderRadius: '0 0 15px 15px',
        boxShadow: theme.shadows[12],
        backgroundColor: theme.palette.background.paper,
        position: 'relative'
    },
    image: {
        width: 'auto',
        height: '100%',
        borderRadius: '15px',
        boxShadow: theme.shadows[12]
    },
    buttons: {
        height: '50px !important',
        position: 'absolute',
        bottom: '-30px',
        textAlign: 'center'
    },
    btn: {
        borderRadius: '15px 0',
        boxShadow: theme.shadows[12],
        marginLeft: '5px',
        marginRight: '5px',
    }
  }));

const ProductItem = () => {
    const classes = useStyles();
    return (
        <div className={ classes.root }>
            <div className={classes.containerImage}>
                <img className={ classes.image }               
                    src="https://loremflickr.com/320/240?random=1"
                />
            </div>
            <div className={classes.container}>
                <h3>Item</h3> 
                
                <div className={classes.buttons}>
                    <Button className={classes.btn} variant="contained" color="secondary">
                        <Icon>close</Icon>
                    </Button>
                    <Button className={classes.btn} variant="contained" color="primary">
                        <Icon>check</Icon>
                    </Button>
                </div>
                
            </div>
        </div>
    )
}


export default ProductItem;