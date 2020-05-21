/**
 * Collapsible master detail container
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import Collapse from '../components/MUI/Collapse';
// import Collapse from '@material-ui/core/Collapse';
import { setDetail } from '../actions/app';
import eventsService from '../eventsService';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
  },
  rootColumn: {
    'flex-direction': 'column',
  },
  rootRow: {
    'flex-direction': 'row',
  },
  collapseVertical: {
    height: 'calc(50% - 15px)',
  },
  collapseHorizontal: {
    width: '100%',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    width: '100%',
    padding: 10,
  },
}));

const MasterDetailContainer = ({
  master,
  detail,
  orientation = 'horizontal',
  openDetail,
  onCloseDetail = undefined,
  forceMobileDetail = false,
}) => {
  // const containerId = uuidv4();
  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });
  const [showMaster, setShowMaster] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [containerId] = useState(uuidv4());

  const dispatch = useDispatch();

  useEffect(() => {
    eventsService.listenEvent('detail_go_back', containerId, (pageId) => {
      if (pageId === containerId) {
        dispatch(setDetail(false));
        if (onCloseDetail) {
          onCloseDetail();
        }
      }
    });
    return () => {
      eventsService.unlistenEvent('detail_go_back', containerId);
    };
  }, [containerId, dispatch, onCloseDetail]);

  useEffect(() => {
    if (isDesktop !== undefined) {
      if (isDesktop && !forceMobileDetail) {
        setShowDetail(true);
        setShowMaster(true);
      } else {
        setShowDetail(openDetail);
        dispatch(setDetail(openDetail, containerId));
        setShowMaster(!openDetail);
      }
    }
  }, [isDesktop, forceMobileDetail, openDetail, dispatch, containerId]);

  return (
    <div
      className={clsx(classes.root, {
        [classes.rootColumn]: orientation === 'vertical',
        [classes.rootRow]: orientation === 'horizontal',
      })}
    >
      <Collapse
        className={classes.collapseHorizontal}
        orientation={orientation}
        in={showMaster}
      >
        {master}
      </Collapse>
      <Collapse
        className={classes.collapseHorizontal}
        orientation={orientation}
        in={showDetail}
      >
        {detail}
      </Collapse>
    </div>
  );
};

export default MasterDetailContainer;
