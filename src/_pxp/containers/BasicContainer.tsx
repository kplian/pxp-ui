/**
 * Collapsible master detail container
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useRef, FC } from 'react';
import { useSelector } from 'react-redux';
import { Toolbar, IconButton } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Pxp from '../../Pxp';

const useStyles = makeStyles((theme) => ({
  backBar: {
    backgroundColor: 'transparent',
  },
  content: {
    height: 'calc(100vh - 60px)',
  },
  fabContainer: {
    width: '0px',
    height: '0px',
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(5),
    left: theme.spacing(3),
    zIndex: '100',
    // backgroundColor: 'transparent',
  },
}));

interface ContainerInterface {
  scrollBarRef?: any;
  children: any;
}

const BasicContainer: FC<ContainerInterface> = ({ scrollBarRef, children }) => {
  const classes = useStyles();
  const detail = useSelector((state) => state.app.detailPage);
  const myScrollBarRef = useRef();
  const onGoBackButton = () => {
    Pxp.triggerEvent('detail_go_back', detail.masterDetailId);
  };

  return (
    <>
      {detail.isDetail && (
        <div className={classes.fabContainer}>
          <Fab
            className={classes.fab}
            size="small"
            aria-label="back"
            color="primary"
            onClick={onGoBackButton}
          >
            <ArrowBack />
          </Fab>
        </div>
      )}
      <Scrollbars
        className={classes.content}
        ref={scrollBarRef || myScrollBarRef}
        autoHide
      >
        {children}
      </Scrollbars>
    </>
  );
};

export default BasicContainer;
