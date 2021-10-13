import React, { FC } from 'react';
import Split from 'react-split';
import makeStyles from '@mui/styles/makeStyles';
import Hidden from '@mui/material/Hidden';
import { Box, Fab } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    '& .gutter': {
      border: `${theme.palette.action.disabled} 1px solid`,
      backgroundColor: theme.palette.action.disabledBackground,
      width: '4px !important',
    },
  },
  backButton: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    position: 'absolute',
    zIndex: theme.zIndex.modal,
  },
}));

const MasterDetail: FC<any> = ({
  children,
  sizes = [25, 75],
  showDetail = false,
  setShowDetail = (value: boolean) => {},
}) => {
  const classes = useStyles();
  const master = children[0];
  const detail = children[1];

  return (
    <>
      <Hidden smDown>
        <Split sizes={sizes} className={classes.root}>
          <div>{master}</div>
          <div>{detail}</div>
        </Split>
      </Hidden>
      <Hidden mdUp>
        <Box>
          {showDetail && (
            <Fab
              color="primary"
              size="small"
              className={classes.backButton}
              onClick={() => {
                console.log('[CLCI]');
                setShowDetail(false);
              }}
            >
              <ArrowBack />
            </Fab>
          )}
          <div
            style={{
              display: !showDetail ? 'block' : 'none',
              opacity: !showDetail ? 1 : 0,
              transition: 'display 2s, opacity 5s linear',
            }}
          >
            {master}
          </div>
          {showDetail && <div>{detail}</div>}
        </Box>
      </Hidden>
    </>
  );
};

export default MasterDetail;
