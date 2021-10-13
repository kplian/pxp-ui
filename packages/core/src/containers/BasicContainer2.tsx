/**
 * Collapsible master detail container
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useRef, FC } from 'react';
import Fab from '@mui/material/Fab';
import { makeStyles } from '@mui/styles';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ArrowBack from '@mui/icons-material/ArrowBack';

import history from '../routers/History';
import Breadcrumbs from '../utils/Breadcrumbs';

const useStyles: any = makeStyles((theme: any) => ({
  backBar: {
    backgroundColor: 'transparent',
  },
  breadcrumbs: {
    padding: '16px 0px 16px 0px',
  },
  content: {
    height: 'calc(100% - 144px)',
  },
  fabContainer: {
    width: '0px',
    height: '0px',
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(3),
    zIndex: 100,
  },
}));

const BasicContainer: FC<any> = ({
  backButton,
  showBreadcrumbs = true,
  scrollBarRef,
  children,
}) => {
  const classes: any = useStyles();
  const myScrollBarRef = useRef();

  return (
    <>
      {backButton && (
        <div className={classes.fabContainer}>
          <Fab
            className={classes.fab}
            size="small"
            aria-label="back"
            color="primary"
            onClick={() => {
              history.goBack();
            }}
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
        {showBreadcrumbs && <Breadcrumbs className={classes.breadcrumbs} />}
        {children}
      </Scrollbars>
    </>
  );
};

export default BasicContainer;
