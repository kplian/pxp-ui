import React from 'react';
import { makeStyles } from '@mui/styles';
import { Badge, Typography } from '@mui/material';

const useStyles: any = makeStyles((theme: any) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: -12,
    backgroundColor: 'rgb(66, 183, 42)',
    border: `solid 1px ${theme.palette.background.dark}`,
  },
}));

/** TITLE
 * {
 *    title: string
 *    active: boolean
 *    description: string,
 *    actions: array object
 * }
 */

const capitalizeFirst = (cad, separator = ' ') => {
  const capilatizeWord = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return cad
    .split(separator)
    .reduce((acc, curr) => acc + capilatizeWord(curr) + separator, '');
};

const ItemTitle = ({ title, subtitle, active }) => {
  // const header = title + (subtitle ? ', ' + subtitle : '');
  const classes = useStyles();

  const titleRender = (title, subtitle) => (
    <Typography gutterBottom variant="h4" component="h2">
      {capitalizeFirst(title)}
      <Typography variant="subtitle2" component="span" color="textSecondary">
        {`, ${capitalizeFirst(subtitle)}`}
      </Typography>
    </Typography>
  );

  return (
    <Badge
      color="secondary"
      variant="dot"
      invisible={!active}
      classes={{ badge: classes.badge }}
    >
      {titleRender(title, subtitle)}
    </Badge>
  );
};

export default ItemTitle;
