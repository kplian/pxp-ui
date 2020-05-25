import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Typography from '@material-ui/core/Typography';
import { IconButton, Icon, Menu, MenuItem, ListItemIcon, ListItemText, Checkbox } from '@material-ui/core';


function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles((theme)=>({
  root: {
    // height: 264,
    flexGrow: 1,
    // maxWidth: 400,
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  iconOption: {
    padding: '5px'
  }
}));

export default function Tree(props) {
   const { config, data } = props;
   console.log('data', data);
   
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
    >
        <RecursiveMap data={data}/>
    </TreeView>
  );
}

const RecursiveMap = ({data, level = 0} ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [treeData, setTreeData] = React.useState(data || []);

    const auxData = [...treeData];

    const actionClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const checkedItem = (item) => {
      console.log( item );
      recursiveChecked(item);
      setTreeData([...auxData]);
    }

    const recursiveChecked = ( data, value = null ) => {
      data.checked = value == null ? !data.checked : value;
      if( data.childrens.length > 0 ) {
        data.childrens.forEach(child => recursiveChecked( child, data.checked ));
      }
    }

    return (
        <React.Fragment>
        { auxData.map( (item, i) => 
            <StyledTreeItem 
                nodeId={ (level + i  * 10).toString() } 
                onClick={(e) => e.preventDefault() }
                label={
                    <div className={classes.labelRoot}>
                        <Checkbox
                          className={classes.iconOption}
                          checked={ item.checked }
                          onChange={() => checkedItem(item) }
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Typography variant="body2" className={classes.labelText}>
                            {item.text}
                        </Typography>
                        
                        {
                            item.childrens.length === 0 && 
                            <Typography variant="caption" color="inherit">
                                <IconButton color="primary" aria-label="options" component="span"  onClick={actionClick} className={classes.iconOption}>
                                    <Icon>more_vert</Icon>
                                </IconButton>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={anchorEl}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                >
                                  <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                      <Icon fontSize="small">edit</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Edit" />
                                  </MenuItem>
                                  <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                      <Icon fontSize="small">delete</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary="Delete" />
                                  </MenuItem>
                                </Menu>
                            </Typography>
                        }
                    </div>
                }  
                key={level + i  * 10 }
            >
                { item.childrens.length > 0 && 
                    <RecursiveMap data={item.childrens} level={ level + 1 }/>
                }
            </StyledTreeItem>
        )}
        </React.Fragment>
    );
}


