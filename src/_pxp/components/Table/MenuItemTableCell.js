import React, {forwardRef} from 'react';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

const MenuItemTableCell = forwardRef(({
                                        buttons,
                                        row
                                      }, ref) => {
  return (
    <>
    {
      Object.entries(buttons).map(([nameKey, button], index) => {
        const IconButton = button.buttonIcon;

        return(
         <MenuItem key={`menuItem_${nameKey}`} onClick={()=>button.onClick(row)}>
           <ListItemIcon>
             <IconButton/>
           </ListItemIcon>
           <Typography variant="inherit">{button.label}</Typography>
         </MenuItem>
        )
        })
    }
    </>

  );
});

export default MenuItemTableCell;
