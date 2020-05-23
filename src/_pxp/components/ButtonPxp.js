/**
 * Component Button into of tooltip
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const ButtonPxp = ({ onClick, icon, title = 'title', disabled = false }) => {
  return (
    <Tooltip title={title} aria-label={title}>
      <span>
        <IconButton aria-label={title} onClick={onClick} disabled={disabled}>
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ButtonPxp;
