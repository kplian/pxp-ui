/**
 * Component Button into of tooltip
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
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

const ButtonPxp = ({
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
