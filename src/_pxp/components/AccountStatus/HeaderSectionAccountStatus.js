/**
 * HeaderSectionAccountStatus
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */

import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DataBox from './DataBox';
import { currencyFormat, formatNumber } from '../../utils/Common';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
const HeaderSectionAccountStatus = ({ data, currencyCode }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xs={12}>
            <DataBox
              title={t('initial_balance')}
              amount={currencyFormat({
                value: data.initialBalance.sum_initial_balance,
                currencyCode,
              })}
              currencyCode={currencyCode}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <DataBox
              title={t('total_balance')}
              amount={currencyFormat({
                value: data.totalBalance,
                currencyCode,
              })}
              currencyCode={currencyCode}
            />
          </Grid>
          {/* <Grid item lg={3} sm={6} xs={12}>
            <DataBox title={"Positive"} amount={0} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <DataBox title={"Negative"} amount={0} />
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default HeaderSectionAccountStatus;
