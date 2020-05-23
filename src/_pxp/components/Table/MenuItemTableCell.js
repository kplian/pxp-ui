/**
 * Component for rendering the buttons in the menu (table cell) from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { forwardRef } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

// eslint-disable-next-line no-unused-vars
const MenuItemTableCell = forwardRef(({ buttons, row }, ref) => {
  return (
    <>
      {Object.entries(buttons).map(([nameKey, button]) => {
        // const IconButton = button.buttonIcon;

        return (
          <MenuItem
            key={`menuItem_${nameKey}`}
            onClick={() => button.onClick(row)}
            disabled={button.disabled}
          >
            <ListItemIcon>{button.buttonIcon}</ListItemIcon>
            <Typography variant="inherit">{button.label}</Typography>
          </MenuItem>
        );
      })}
    </>
  );
});

export default MenuItemTableCell;
