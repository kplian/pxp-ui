/**
 * Component for rendering the menu(buttons) in each cell from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItemTableCell from './MenuItemTableCell';

const ITEM_HEIGHT = 48;
const MenuTableCell = ({ buttons, row, icon }) => {
  // the children is the buttons

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (callback) => {
    console.log('asdasdasd');
    setAnchorEl(null);
    if (typeof callback === 'function') {
      callback();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon || <MoreVertIcon />}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '50ch',
          },
        }}
      >
        <MenuItemTableCell
          buttons={buttons}
          row={row}
          handleClose={handleClose}
        />
      </Menu>
    </div>
  );
};

export default MenuTableCell;
