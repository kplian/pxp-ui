import React, { useState, useEffect, FC } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Badge,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Icon,
} from '@mui/material';
import clsx from 'clsx';
import ModalDetail from '../ModalDetail';
import Features from '../Features';

import ItemTitle from './ItemTitle';
import ItemDescription from './ItemDescription';
import ItemRating from './ItemRating';
import { useObserver, IObserver } from '@pxp-ui/hooks';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    boxShadow: `inset 0 20px 25px -20px ${theme.palette.primary.main}a3, inset 0 -20px 25px -20px ${theme.palette.primary.main}a3`,
  },
  rating: {
    root: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  },
  header: {
    borderRadius: '10px 10px 0 0',
    height: '70%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
  },
  detail: {
    height: '30%',
  },
  expand: {
    transform: 'rotate(10deg)',
    marginLeft: 'auto',
  },
  actions: {
    justifyContent: 'center',
  },
  icon: {
    fontFamily: 'Material Icons',
  },
}));

export declare interface ItemProps {
  item?: any;
  config?: any;
}
const Item: FC<ItemProps> = ({ item, config }) => {
  const [stateActions, setStateActions] = useState(config.actions);
  const [stateItem, setStateItem] = useState(item);
  const [showImage, setShowImage] = useState(false);
  const classes = useStyles();
  const [openDetail, setOpenDetail] = React.useState(false);
  const { columns } = config;
  const [observer, setElement, entry] = useObserver({
    threshold: 0.1,
    root: null,
    rootMargin: '10px',
  });

  const handleOpen = () => {
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  useEffect(() => {
    const loaderRef = document.getElementById(`card${item.id_dama}`);
    setElement(loaderRef);

    return () => {
      if (entry && entry.target) observer.unobserve(entry.target);
    };
  }, []);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setShowImage(true);
    }
  }, [entry]);

  return (
    <Card className={classes.root} id={`card${item.id_dama}`}>
      <CardMedia
        className={classes.media}
        image={showImage ? config.urlImage(item) || 'empty' : 'default'}
        title="Image"
      />
      <CardContent>
        {typeof item[columns.title] === 'function' ? (
          item[columns.title]()
        ) : (
          <ItemTitle
            title={item[columns.title]}
            subtitle={item[columns.subtitle]}
            active={
              typeof columns.active === 'function'
                ? columns.active(item)
                : item[columns.active]
            }
          />
        )}
        <ItemDescription description={item[columns.description]} />
      </CardContent>
      <Features item={item} features={config.features} />
      <CardActions disableSpacing className={classes.actions}>
        {Object.entries(stateActions).map(([nameAction, act], i) => {
          const action: any = act;
          const expandedField: any = config.actions.length === i + 1;
          return (
            <IconButton
              key={`button_${item[config.idStore]}_${nameAction}`}
              onClick={
                action.showDetail
                  ? () => handleOpen()
                  : () => action.action({ item, setStateActions })
              }
              className={clsx({
                [expandedField]: classes.expand,
              })}
              aria-label="show more"
              color={action.color || 'primary'}
            >
              <Icon className={classes.icon}>
                {typeof action.icon === 'function'
                  ? action.icon(stateItem)
                  : action.icon}
              </Icon>
            </IconButton>
          );
        })}
      </CardActions>
      <ItemRating rating={item[columns.rating]} className={null}/>
      <ModalDetail
        open={openDetail}
        item={item}
        handleClose={handleClose}
        columns={columns}
      />
    </Card>
  );
};

export default Item;
