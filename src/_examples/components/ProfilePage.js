/**
 * Example for Profile page
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Camera from '@material-ui/icons/Camera';
import Palette from '@material-ui/icons/Palette';
import People from '@material-ui/icons/People';
import Add from '@material-ui/icons/Add';
import Favorite from '@material-ui/icons/Favorite';
import { Scrollbars } from 'react-custom-scrollbars';
import Tooltip from '@material-ui/core/Tooltip';
import Rating from '@material-ui/lab/Rating';
import profilePageStyle from '../../_assets/jss/view/profilePageStyle';
import Parallax from '../../_pxp/components/Parallax/Parallax';

import GridContainer from '../../_pxp/components/Grid/GridContainer';
import GridItem from '../../_pxp/components/Grid/GridItem';
import Clearfix from '../../_pxp/components/Clearfix/Clearfix';
import favio from '../../_assets/img/favio.jpeg';
import ButtonPxp from '../../_pxp/components/ButtonPxp';
import CustomButton from '../../_pxp/components/CustomButtons/Button';
import ImageGallery from '../../_assets/icons/ImageGallery';
import GoogleMaps from '../../_assets/icons/GoogleMaps';
import HealthCalendar from '../../_assets/icons/HealthCalendar';
import { blackColor, hexToRgb } from '../../_assets/jss/pxp-ui';

const useStyles = makeStyles(profilePageStyle);

const ProfilePage = () => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid,
  );
  const [value, setValue] = React.useState(2);

  return (
    <Scrollbars>
      <div>
        <Parallax
          image={require('../../_assets/img/cover.jpg')}
          filter="dark"
          className={classes.parallax}
        >
          <GridContainer className={classes.pullRight}>
            <CustomButton color="primary">
              <HealthCalendar style={{ width: '25px', height: '25px' }} /> Fijar
              Cita
            </CustomButton>
          </GridContainer>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={favio} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title} style={{ marginBottom: 0 }}>
                      Favio Figueroa
                    </h3>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      classes={{
                        iconEmpty: classes.iconEmpty,
                      }}
                    />
                    <h6>DEVELOPER AND DESIGNER</h6>
                  </div>
                </div>
                <div className={classes.follow}>
                  <Tooltip
                    id="tooltip-top"
                    title="Follow this user"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <CustomButton
                      justIcon
                      round
                      color="primary"
                      className={classes.followButton}
                    >
                      <Favorite className={classes.followIcon} />
                    </CustomButton>
                  </Tooltip>
                </div>
              </GridItem>
            </GridContainer>
            <div
              className={classNames(classes.description, classes.textCenter)}
            >
              <p>
                full stack development , Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                Aenean massa. Cum sociis natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Donec quam felis,
                ultricies nec, pellentesque eu.{' '}
              </p>
              <CustomButton color="transparent" simple>
                <ImageGallery fontSize="large" /> Fotos
              </CustomButton>
              <CustomButton color="transparent" simple>
                <GoogleMaps fontSize="large" /> Mapa
              </CustomButton>
              <Clearfix />
              <CustomButton justIcon round color="primary">
                <HealthCalendar style={{ width: '30px', height: '30px' }} />
              </CustomButton>
              <Clearfix />
              Fijar Cita
            </div>

            <Clearfix />
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export default ProfilePage;
