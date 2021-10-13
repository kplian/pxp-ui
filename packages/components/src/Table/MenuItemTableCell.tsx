/**
 * Component for rendering the buttons in the menu (table cell) from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { forwardRef, FC } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

// eslint-disable-next-line no-unused-vars
const MenuItemTableCell: FC<any> = forwardRef(({ buttons, row, handleClose }, ref) => {
  return (
    <>
      {Object.entries(buttons).map(([nameKey, btn]) => {
        const button: any = btn;

        return (
          <MenuItem
            key={`menuItem_${nameKey}`}
            onClick={() => {
              handleClose(() => button.onClick(row));
            }}
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
