import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));
const DrawGridListImage = ({ state, set, data, loading }) => {
  const classes = useStyles();

  console.log(data)
  const getUrl = (row) => {
    const  urlFile = `http://34.71.236.75/kerp/uploaded_files/sis_parametros/Archivo/mediano/${row.nombre_archivo}.${row.extension}`;
    return urlFile;
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {data.datos.map((image) => (
          <GridListTile
            key={image.nombre_archivo}
            /* cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1} */
            cols={1}
            rows={1}
          >
            <img src={getUrl(image)} alt={image.nombre_archivo} />
            <GridListTileBar
              title={image.nombre_archivo}
              titlePosition="top"
              actionIcon={
                <IconButton
                  aria-label={`star ${image.nombre_archivo}`}
                  className={classes.icon}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default DrawGridListImage;
