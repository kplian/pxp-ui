/**
 * Label
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, Grid, Typography, makeStyles } from '@material-ui/core';
import Label from '../Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: theme.spacing(1),
  },
}));

const TotalsAccountStatus = ({
  data,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Grid alignItems="center" container justify="space-between">
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Initial Balance
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3" color="textPrimary">
              ${data.initialBalance.sum_initial_balance}
            </Typography>
            <Label className={classes.label} color="success">
              +25%
            </Label>
          </div>
        </Grid>

        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Total Balance
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3" color="textPrimary">
              ${data.totalAmount}
            </Typography>
            <Label className={classes.label} color="error">
              -20%
            </Label>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

TotalsAccountStatus.propTypes = {
  className: PropTypes.string,
};


export default TotalsAccountStatus;
