/**
 * Collapsible master detail container
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Toolbar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Pxp from '../../Pxp';

const useStyles = makeStyles(() => ({
  backBar: {
    backgroundColor: 'transparent',
  },
}));

const BasicContainer = ({ scrollBarRef, children }) => {
  const classes = useStyles();
  const detail = useSelector((state) => state.app.detailPage);
  const myScrollBarRef = useRef();
  const onGoBackButton = () => {
    Pxp.triggerEvent('detail_go_back', detail.masterDetailId);
  };

  return (
    <>
      {detail.isDetail && (
        <Toolbar className={classes.backBar}>
          <IconButton color="inherit" onClick={onGoBackButton}>
            <ArrowBack />
          </IconButton>
        </Toolbar>
      )}
      <Scrollbars ref={scrollBarRef || myScrollBarRef} autoHide>
        {children}
      </Scrollbars>
    </>
  );
};

export default BasicContainer;
