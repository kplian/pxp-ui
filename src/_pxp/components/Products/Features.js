import React from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme =>(
  {
    rootItem: {
      textAlign: 'center'
    },
    label: {
      fontSize: '0.7rem',
      color: theme.palette.primary.main
    },
    value: {
      fontSize: '1.3rem', 
    },
    divider: {
      backgroundColor: theme.palette.primary.light
    },
    grid: {
      paddingTop: '8px',
      backgroundColor: theme.palette.background.dark

    }
  }
));
const FeatureItem = ({item, feature}) => {
  const classes = useStyles();
  return (
    <div className={ classes.rootItem }>
      <Typography variant="h2" component="h5" align="center" color="textSecondary" className={ classes.value }>
        {
          feature.pipe && typeof feature.pipe==='function' && feature.pipe(item)
        }
        {
          !feature.pipe && typeof feature.pipe !== 'function' && item[ feature.field ]
        }
        {
          feature.unit && 
          <Typography variant="h5" component="span" color="textSecondary">
            {feature.unit}
          </Typography>
          
        }
      </Typography>
      <Typography variant="subtitle2" component="span" align="center" color="textSecondary" className={ classes.label }>
        {feature.label.toUpperCase() }
      </Typography>
    </div>
  )
};

const Features = ({item, features = []}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Divider className={ classes.divider }/>
      <Grid container spacing={0} 
          alignContent="space-between" 
          alignItems="center" 
          justify="space-around"
          className={ classes.grid }>
        { features.map( feature => 
          <Grid item key={ feature.label } xs={4}>
            <FeatureItem feature={feature} item={ item }/>
          </Grid>
        )}
      </Grid>
      <Divider  className={ classes.divider }/>
    </React.Fragment>
  )
};

export default Features;
