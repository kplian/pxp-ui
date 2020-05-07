/**
 * Component Button into of tooltip
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const ButtonPxp = ({ onClick, icon }) => {
  return (
    <Tooltip title="new" aria-label="new">
      <IconButton aria-label="new" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ButtonPxp;
