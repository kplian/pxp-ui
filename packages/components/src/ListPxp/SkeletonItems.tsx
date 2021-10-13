import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const SkeletonItems = ({ length=4 }) => {
    const skeletonArray = Array.from({length}, (_, i) => i);
  
    return (
      <React.Fragment>
      { skeletonArray.map((val, i) => 
          <div  key={ i }>
            <ListItem>
              <ListItemIcon>
                <Skeleton variant="circular" width={32} height={32} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Box display="flex"
                          flexWrap="wrap">
                        <Box flexGrow={1}>
                          <Skeleton variant="text" width="80%" animation="wave"/>                                  
                        </Box>
                        <Box>
                          <Skeleton variant="rectangular" width={100} height={10} animation="wave"/>                                     
                        </Box>
                    </Box>
                  </React.Fragment> 
                }
                secondary={<Skeleton variant="text" width="30%" animation="wave"/>  }
              />
              <ListItemSecondaryAction>
                <Skeleton variant="circular" width={32} height={32} animation="wave"/>                      
              </ListItemSecondaryAction>                     
            </ListItem>
          <Divider/>
          </div>
      )}
      </React.Fragment>
      );
  };

  export default SkeletonItems;