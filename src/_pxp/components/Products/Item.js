import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Badge, Card, CardMedia, CardContent, CardActions, Typography, IconButton, Icon } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ModalDetail from './ModalDetail';

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
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
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

  const handleOpen = () => {
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  const title = (value) => (
    <Typography gutterBottom variant="h5" component="h2">
            { capitalizeFirst(value) }
    </Typography>
  );

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={ item.urlImage || 'https://picsum.photos/400/300' }
        title="Image"
      />
      <CardContent>
        { item.available ? 
          <Badge color="secondary" variant="dot">
            {title( item[ config.columns.title ] )}
          </Badge>
        :
          title( item[ config.columns.title ] )
        }
        
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook.
              </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleOpen} color="primary">
          <Icon>favorite</Icon>
        </IconButton>
        <IconButton aria-label="share"  color="primary">
          <Icon>share</Icon>
        </IconButton>
        <IconButton
          className={ classes.expand }
          aria-label="show more"
        >
          <Icon>star</Icon>
        </IconButton>
      </CardActions>
      <Rating
        name="rating"
        value={ item.rating }
        classes={useStylesRating()}
        precision={0.5}
        size="small"
        readOnly
      />
      <div>
        <IconButton
          className={ classes.expand }
          aria-label="show more"
        >
          <Icon>star</Icon>
        </IconButton> 
      </div>
      <ModalDetail open={ openDetail } handleClose={ handleClose }/>
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
