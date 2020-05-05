import React, { useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { OutlinedInput, InputAdornment } from '@material-ui/core';
import { MoreVert, ExpandMore, ExpandLess, Delete, Edit } from '@material-ui/icons/index';
import Divider from '@material-ui/core/Divider';
/////
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import InfiniteScroll from 'react-infinite-scroller';
// import { data } from './demodata';

//hooks
import TabsOptions from './TabsOptions';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import SkeletonItems from './SkeletonItems';
import SearchFab from './SearchFab';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    drawer: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white, 
    },
    inline: {
        display: 'inline',
    },
    detail:{
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


// JSON CONFIG
const defaultConfig = {
    showActions: true,
    showSearch: true,
    infiniteScroll: false,
    render: {
      primary: {
        field: 'num_tramite',
        renderOption: ( row ) => {
          return <div>Render</div>
        }
      },
      secondary: {
        field: 'desc_funcionario',
        renderOption: ( row ) => {
          return <div>Render</div>
        }
      },
      terciary: {
        field: 'importe_total',
        text: 'Total',
        level: 3,
        renderOption: ( row ) => {
          return <div>Render</div>
        }
      },
      detail: [{
        field:'obs',
        text: 'Observaciones'
      },
      {
        field:'justificacion',
        text: 'Justificacion'
      },
      {
        field:'lugar_entrega',
        text: 'Lugar Entrega'
      }]
    }
};

const defaultActions = [
  { 
    icon: <Edit/>, 
    name: 'Editar',
    action: () => alert('ok')
  },
  { 
    icon: <Delete/>, 
    name: 'Eliminar',
    action: () => alert('ok')
  }
];

// export const ListTable = ({ data, actions }) => {
const ListPxp = ({ data = [], actions=[], config = {}, detail, loadMore }) => {
  // IntersectionObserver revisar
    const configAll = { ...defaultConfig, ...config };
    const actionsAll = [ ...defaultActions, ...actions ];
    const render = configAll.render || {};
    const originalData = data;

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

    const handleClick = (index ) => {
        setState({  ...state, [index]: !state[index] });
    }

    const fullList = side => (
      <div
        className={classes.fullList}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List className={ classes.drawer }>
          { actionsAll && actionsAll.map((item, index) => (
            <ListItem button key={item.name} onClick={ item.action }>
              <ListItemIcon color="danger">{ item.icon }</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    const handleSearch = (e) => {
      console.log('e', e.target.value );
      const value = e.target.value;
      data = originalData.filter( item => {
        console.log(item.desc_person.toLowerCase().includes(value.toLowerCase()));
        return item.desc_person.toLowerCase().includes(value.toLowerCase());
      });      
    }
    
    return (    
        <div>
            <SearchFab></SearchFab>
            <List dense={true}>
              <Divider/>
              
              { data && data.length == 0 && <SkeletonItems length={5}/> }
              <InfiniteScroll
                  useWindow={false}
                  pageStart={0}
                  initialLoad={false}
                  getScrollParent={ () => config.infiniteScroll.parent }
                  loadMore={ config.infiniteScroll.onLoadMore }
                  hasMore={ config.infiniteScroll.hasMore }
                  loader={<SkeletonItems length={1} key={0}/>}
              >
              {data && data.length > 0 && data.map( (item, index) =>(<div key={index} >
                <ListItem button onClick={ ()=> handleClick(index)}>
                  <ListItemIcon>
                    {state[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={<React.Fragment>
                      <Box display="flex"
                            flexWrap="wrap">
                          <Box flexGrow={1}>
                              <Typography
                              component="span"
                              variant="subtitle1"
                              className={classes.inline}
                              color="inherit"
                              >
                                {item[ render.primary.field ]}
                              </Typography> 
                          </Box>
                          <Box>
                              <Typography
                              component="span"
                              variant="overline"
                              color="secondary"
                              >
                                  <b>
                                    { render.terciary.text }:
                                  </b>
                                  { item[ render.terciary.field] }
                              </Typography>
                          </Box>
                      </Box>
                    </React.Fragment> 
                  }
                  secondary={ 
                    <React.Fragment>
                        <Typography
                          component="span"
                          variant="caption"
                          className={classes.inline}
                          color="secondary"
                        >
                          {item[ render.secondary.field ]}
                        </Typography>
                    </React.Fragment>
                  }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="options" color="primary" onClick={toggleDrawer('bottom', true)}> 
                      <MoreVert />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Collapse in={state[index]} timeout="auto" unmountOnExit>
                  <Grid container spacing={0} className={ classes.detail }>
                      { render.detail.map( (option, index) => 
                        <React.Fragment key={ index }>
                          <Grid item xs={4} sm={3} md={2} xl={1} className={ classes.detailTitle}>
                            <b>{ option.text }</b>
                          </Grid>
                          <Grid item xs={8} sm={9} md={4} xl={3} className={ classes.detailText}>
                            { item[option.field] }
                          </Grid>
                        </React.Fragment>
                      )}
                  </Grid>
                </Collapse>
                <Divider/>
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



