import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Badge, Card, CardMedia, 
  CardContent, CardActions, 
  Typography, IconButton, Icon
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ModalDetail from './ModalDetail';
import Features from './Features';
import clsx from 'clsx';

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
    boxShadow: `inset 0 20px 25px -20px ${ theme.palette.primary.main }a3, inset 0 -20px 25px -20px ${ theme.palette.primary.main }a3`
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
  actions:{
    justifyContent: 'center'
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: -12,
    backgroundColor: 'rgb(66, 183, 42)',
    border: 'solid 1px ' + theme.palette.background.dark,
  },
}));

const useStylesRating = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconFilled: {

  },
  iconEmpty: {
    color: 'white'
  },
}));

const capitalizeFirst = ( cad, separator=' ' ) => {
  const capilatizeWord = ( string ) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  return cad.split(separator).reduce( ( acc, curr) => acc + capilatizeWord(curr) + separator, '');
};
const Item = ({item, config}) => {
  const classes = useStyles();
  const [openDetail, setOpenDetail] = React.useState(false);
  const columns = config.columns;
  
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
        image={ imagesDemo[parseInt(Math.random() * imagesDemo.length)] }
        title="Image"
      />
      <CardContent>
        { typeof item[ columns.title ] === 'function' ?  item[ columns.title ]() :
          <ItemTitle 
            title={  item[ columns.title ] } 
            subtitle={  item[ columns.subtitle ] } 
            active={ typeof columns.active === 'function' ? columns.active(item) : item[ columns.active ] }
          />
       }
        <ItemDescription description={ item[ columns.description ] }/>
        
      </CardContent>
      <Features item={item} features={ config.features }/>
      <CardActions disableSpacing className={ classes.actions }>
        { config.actions.map( (item, i) =>(
          <IconButton
            key={i}
            onClick={ 
              item.showDetail ? () => handleOpen() : item.action               
            }
            className={ clsx({[config.actions.length === i+1 ]: classes.expand}) }
            aria-label="show more"
            color={ item.color || 'primary' }
          >
            <Icon>{ item.icon }</Icon>
          </IconButton>
        ))}
      </CardActions>
      <ItemRating rating={ item[columns.rating]}/>
      <ModalDetail open={ openDetail } item={ item } handleClose={ handleClose }/>
    </Card>
  )
};

export default Item;
 
/** TITLE
 * {
 *    title: string
 *    active: boolean
 *    description: string,
 *    actions: array object
 * }
 */

const ItemTitle = ({title, subtitle, active}) => {
  // const header = title + (subtitle ? ', ' + subtitle : '');
  const classes = useStyles();

  const titleRender = (title, subtitle) => (
    <Typography gutterBottom variant="h4" component="h2"> 
        { capitalizeFirst(title) }
      <Typography variant="subtitle2" component="span" color="textSecondary">
        { ', ' + capitalizeFirst(subtitle) }
      </Typography>
    </Typography>
  );

  return (
    <Badge color="secondary" variant="dot" invisible={!active} classes={{ badge: classes.badge }}>
      {titleRender( title, subtitle )}
    </Badge>
  )
};

const ItemDescription = ( {description} ) => {
  return (
    <Typography variant="body2" color="textSecondary" component="p">
      { description }
    </Typography>
  )
};

const ItemRating = ({ rating }) => {
  return (
    <Rating
        name="rating"
        value={ parseInt(rating) || 0 }
        classes={useStylesRating()}
        precision={0.5}
        size="small"
        readOnly
      />
  )
};

const imagesDemo = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcFYKy7CrMvjbL4hEu0JH4865Qk4zLv9AI58koNxq3HPDkio4Z&usqp=CAU',
  'https://c4.wallpaperflare.com/wallpaper/105/218/545/angels-barefoot-blondes-commercial-wallpaper-preview.jpg',
  'https://c.wallhere.com/photos/6d/98/women_Georgy_Chernyadyev_model_long_hair_looking_at_viewer_blonde_straight_hair_legs-282607.jpg!d',
  'https://pbs.twimg.com/media/DUJMTn8XcAAnuAR.jpg',
  'https://www.ctvnews.ca/polopoly_fs/1.4169897.1574420912!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg', 
  'https://cdn1.thr.com/sites/default/files/imagecache/gallery_landscape_887x500/2015/03/Pretty_Woman_Still_1.jpg',
  'https://cache.desktopnexus.com/thumbseg/2378/2378782-bigthumbnail.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpudU9gPnYk67NQrYHTSuecu0btI0ddI8zU5KuuFKw-0--DdgH&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSApcWL18PJC04NBaivpP8WIRBbZuLK450-A58Ujo8ATKIcGRW6&usqp=CAU'
];



