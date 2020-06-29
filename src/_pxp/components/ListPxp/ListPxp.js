import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { MoreVert, ExpandMore, ExpandLess, Delete, Edit } from '@material-ui/icons/index';
import Divider from '@material-ui/core/Divider';
/////
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import InfiniteScroll from 'react-infinite-scroller';

import SkeletonItems from './SkeletonItems';
import SearchFab from './SearchFab';
import OptionsFilter from './OptionsFilter';
import _ from 'lodash';

import { defaultConfig } from './defaultConfig';

const useStyles = makeStyles(theme => ({
  root: {
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  drawer: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  },
  list: {
    marginTop: '8px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    paddingTop: 0,
    paddingBottom: 0,
  },
  inline: {
    display: 'inline',
  },
  detail: {
    margin: 0,
    backgroundColor: theme.palette.background.dark,
  },
  detailTitle: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.textPrimary,
    padding: '5px',
    textAlign: 'right',
    border: '1px solid ' + theme.palette.action.disabledBackground,
  },
  detailText: {
    backgroundColor: theme.palette.background.paper,
    padding: '5px',
    border: '1px solid ' + theme.palette.action.disabledBackground,
  },
}));

const defaultActions = [
  {
    icon: <Edit />,
    name: 'Editar',
    action: () => alert('ok')
  },
  {
    icon: <Delete />,
    name: 'Eliminar',
    action: () => alert('ok')
  }
];

// export const ListTable = ({ data, actions }) => {
const ListPxp = ({ data = [], actions = [], config = {} }) => {
  // IntersectionObserver revisar
  const configAll = { ...defaultConfig, ...config };
  const actionsAll = [...defaultActions, ...actions];
  const columns = configAll.columns || {};

  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleClick = (index) => {
    if (configAll.showDetail) {
      setState({ ...state, [index]: !state[index] });
    }
  }

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List className={classes.drawer} dense={true}>
        {actionsAll && actionsAll.map((item, index) => (
          <ListItem button key={item.name} onClick={item.action}>
            <ListItemIcon color="danger">{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleSearch = _.debounce((value) => {
    config.onSearch(value);
  }, 500);

  const handleFilter = (value) => {
    config.onSearch(value);
  }

  return (
    <div className={classes.root}>
      {configAll.showSearch && <SearchFab handleSearch={handleSearch}></SearchFab>}
      {configAll.showFilter && <OptionsFilter filters={configAll.filters} handleFilter={handleFilter} />}
      <List dense={true} className={classes.list}>
        <Divider />

        {data && data.length === 0 && configAll.infiniteScroll.hasMore && <SkeletonItems length={5} />}
        {data && data.length === 0 && !configAll.infiniteScroll.hasMore && <h3>No items to show...</h3>}
        <InfiniteScroll
          useWindow={false}
          pageStart={0}
          initialLoad={false}
          getScrollParent={() => config.infiniteScroll.parent}
          loadMore={config.infiniteScroll.onLoadMore}
          hasMore={config.infiniteScroll.hasMore}
          loader={<SkeletonItems length={1} key={0} />}
        >
          {data && data.length > 0 && data.map((item, index) => (<div key={index} >
            <ListItem button onClick={() => handleClick(index)}>
              {configAll.showDetail && <ListItemIcon>
                {state[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
              }
              {configAll.columns.render && configAll.columns.render(item)}
              {!configAll.columns.render &&
                <ListItemText
                  primary={<React.Fragment>
                    <Box display="flex"
                      flexWrap="wrap">
                      <Box flexGrow={1}>
                        {columns.primary.renderOption && columns.primary.renderOption(item)}
                        {!columns.primary.renderOption &&
                          <Typography
                            component="span"
                            variant="subtitle1"
                            className={classes.inline}
                            color="inherit"
                          >
                            {item[columns.primary.field]}
                          </Typography>
                        }
                      </Box>
                      <Box>
                        {columns.terciary.renderOption && columns.terciary.renderOption(item)}
                        {!columns.terciary.renderOption &&
                          <Typography
                            component="span"
                            variant="overline"
                            color="secondary"
                          >
                            <b>
                              {columns.terciary.text}:&nbsp;
                                    </b>
                            {item[columns.terciary.field]}
                          </Typography>
                        }
                      </Box>
                    </Box>
                  </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {columns.secondary.renderOption && columns.secondary.renderOption(item)}
                      {!columns.secondary.renderOption &&
                        <Typography
                          component="span"
                          variant="caption"
                          className={classes.inline}
                          color="primary"
                        >
                          {item[columns.secondary.field]}
                        </Typography>
                      }
                    </React.Fragment>
                  }
                />
              }
              {configAll.showActions && <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="options" color="primary" onClick={toggleDrawer('bottom', true)}>
                  <MoreVert />
                </IconButton>
              </ListItemSecondaryAction>
              }
            </ListItem>
            <Collapse in={state[index]} timeout="auto" unmountOnExit>
              <Grid container spacing={0} className={classes.detail}>
                {!columns.detailRender && columns.detail && columns.detail.map((option, index) =>
                  <React.Fragment key={index}>
                    <Grid item xs={4} sm={3} md={2} xl={1} className={classes.detailTitle}>
                      <b>{option.text}</b>
                    </Grid>
                    <Grid item xs={8} sm={9} md={4} xl={3} className={classes.detailText}>
                      {item[option.field]}
                    </Grid>
                  </React.Fragment>
                )}
                {columns.detailRender && columns.detailRender(item)}
              </Grid>
            </Collapse>
            <Divider />
          </div>
          ))}
        </InfiniteScroll>
      </List>
      <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
        {fullList('bottom')}
      </Drawer>
    </div>
  )
};

export default ListPxp;



