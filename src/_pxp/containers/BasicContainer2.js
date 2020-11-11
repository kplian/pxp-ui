/**
 * Collapsible master detail container
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { useRef } from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import ArrowBack from '@material-ui/icons/ArrowBack';
import history from '../routers/History';
import Breadcrumbs from '../utils/Breadcrumbs';

const useStyles = makeStyles((theme) => ({
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
    zIndex: '100',
  },
}));

const BasicContainer = ({
  backButton,
  showBreadcrumbs = true,
  scrollBarRef,
  children,
}) => {
  const classes = useStyles();
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
