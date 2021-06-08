import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const SkeletonItems = ({ length = 4 }) => {
    const skeletonArray = Array.from({ length }, (_, i) => i);

    return (
      <>
      { skeletonArray.map((val, i) =>
          <div  key={ i }>
            <ListItem>
              <ListItemIcon>
                <Skeleton variant="circle" width={32} height={32} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <>
                    <Box display="flex"
                          flexWrap="wrap">
                        <Box flexGrow={1}>
                          <Skeleton variant="text" width="80%" animation="wave"/>
                        </Box>
                        <Box>
                          <Skeleton variant="rect" width={100} height={10} animation="wave"/>                                     
                        </Box>
                    </Box>
                  </> 
                }
                secondary={<Skeleton variant="text" width="30%" animation="wave"/>  }
              />
              <ListItemSecondaryAction>
                <Skeleton variant="circle" width={32} height={32} animation="wave"/>                      
              </ListItemSecondaryAction>                     
            </ListItem>
          <Divider/>
          </div>
      )}
      </>
      );
  };

  export default SkeletonItems;