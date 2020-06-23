import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Badge,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Icon,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import ModalDetail from '../ModalDetail';
import Features from '../Features';

import ItemTitle from './ItemTitle';
import ItemDescription from './ItemDescription';
import ItemRating from './ItemRating';

const useStyles = makeStyles((theme) => ({
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
}));

const Item = ({ item, config }) => {
  const [stateActions, setStateActions] = useState(config.actions);
  const [stateItem, setStateItem] = useState(item);
  const classes = useStyles();
  const [openDetail, setOpenDetail] = React.useState(false);
  const { columns } = config;

  const handleOpen = () => {
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={
          config.urlImage(item) ||
          imagesDemo[parseInt(Math.random() * imagesDemo.length)]
        }
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
        {Object.entries(stateActions).map(([nameAction, action], i) => {
          return (
            <IconButton
              key={i}
              onClick={
                action.showDetail
                  ? () => handleOpen()
                  : () => action.action({ item, setStateActions })
              }
              className={clsx({
                [config.actions.length === i + 1]: classes.expand,
              })}
              aria-label="show more"
              color={action.color || 'primary'}
            >
              <Icon>
                {typeof action.icon === 'function'
                  ? action.icon(stateItem)
                  : action.icon}
              </Icon>
            </IconButton>
          );
        })}
      </CardActions>
      <ItemRating rating={item[columns.rating]} />
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

const imagesDemo = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcFYKy7CrMvjbL4hEu0JH4865Qk4zLv9AI58koNxq3HPDkio4Z&usqp=CAU',
  'https://c4.wallpaperflare.com/wallpaper/105/218/545/angels-barefoot-blondes-commercial-wallpaper-preview.jpg',
  'https://c.wallhere.com/photos/6d/98/women_Georgy_Chernyadyev_model_long_hair_looking_at_viewer_blonde_straight_hair_legs-282607.jpg!d',
  'https://pbs.twimg.com/media/DUJMTn8XcAAnuAR.jpg',
  'https://www.ctvnews.ca/polopoly_fs/1.4169897.1574420912!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg',
  'https://cdn1.thr.com/sites/default/files/imagecache/gallery_landscape_887x500/2015/03/Pretty_Woman_Still_1.jpg',
  'https://cache.desktopnexus.com/thumbseg/2378/2378782-bigthumbnail.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpudU9gPnYk67NQrYHTSuecu0btI0ddI8zU5KuuFKw-0--DdgH&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSApcWL18PJC04NBaivpP8WIRBbZuLK450-A58Ujo8ATKIcGRW6&usqp=CAU',
];
