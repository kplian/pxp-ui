/**
 * Component Button into of tooltip
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  iconWithLabel: {
    '& span': {
      flexDirection: 'column',
    },
    // Aligns the content of the button vertically.
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.75rem',
    opacity: '1',
  },
}));

const ButtonPxp: FC<any> = ({
  onClick,
  icon,
  title = 'title',
  disabled = false,
  label,
}) => {
  const classes = useStyles();

  return (
    <Tooltip title={title} aria-label={title}>
      <span>
        <IconButton
          aria-label={title}
          onClick={onClick}
          disabled={disabled}
          {...(label && { className: classes.iconWithLabel })}
        >
          {icon}

          {label && <div className={classes.label}>{label}</div>}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ButtonPxp;
