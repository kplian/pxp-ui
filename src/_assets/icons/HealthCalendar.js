import React from 'react';
import { SvgIcon } from '@material-ui/core';

const HealthCalendar = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 50 50">
      <path d="M 12 0 C 10.906937 0 10 0.9069372 10 2 L 10 4 L 4 4 C 3.5737457 4 3.136697 4.0967565 2.734375 4.3808594 C 2.332053 4.6649623 2 5.2171896 2 5.7929688 L 2 46.042969 C 2 47.089927 2.8467513 48 3.9179688 48 L 46.083984 48 C 47.155321 48 48 47.089927 48 46.042969 L 48 5.7929688 C 48 5.2171896 47.667947 4.6649623 47.265625 4.3808594 C 46.863303 4.0967565 46.426254 4 46 4 L 40 4 L 40 2 C 40 0.9069372 39.093063 0 38 0 L 36 0 C 34.906937 0 34 0.9069372 34 2 L 34 4 L 16 4 L 16 2 C 16 0.9069372 15.093063 0 14 0 L 12 0 z M 12 2 L 14 2 L 14 8 L 12 8 L 12 2 z M 36 2 L 38 2 L 38 8 L 36 8 L 36 2 z M 4 6 L 10 6 L 10 8 C 10 9.0930628 10.906937 10 12 10 L 14 10 C 15.093063 10 16 9.0930628 16 8 L 16 6 L 34 6 L 34 8 C 34 9.0930628 34.906937 10 36 10 L 38 10 C 39.093063 10 40 9.0930628 40 8 L 40 6 L 46 6 L 46 13 L 4 13 L 4 6 z M 4 15 L 46 15 L 46 46 L 4 46 L 4 15 z M 20.5 21 C 16.9 21 14 23.900391 14 27.400391 C 14 32.900391 18.999219 36.200781 22.199219 38.300781 C 23.099219 38.900781 23.800781 39.300781 24.300781 39.800781 L 24.900391 40.300781 L 25.5 39.800781 C 26 39.400781 26.799609 38.900781 27.599609 38.300781 C 30.999609 36.100781 36 32.900391 36 27.400391 C 36 23.900391 33.1 21 29.5 21 C 27.8 21 26.2 21.700781 25 22.800781 C 23.8 21.700781 22.2 21 20.5 21 z M 20.5 23 C 22 23 23.299219 23.7 24.199219 25 L 25 26.199219 L 25.800781 25 C 26.600781 23.8 28 23 29.5 23 C 32 23 34 25.000391 34 27.400391 C 34 31.800391 29.799219 34.599609 26.699219 36.599609 C 25.999219 36.999609 25.5 37.399219 25 37.699219 C 24.5 37.299219 24.000781 36.999609 23.300781 36.599609 C 20.200781 34.599609 16 31.800391 16 27.400391 C 16 25.000391 18 23 20.5 23 z"/>
    </SvgIcon>
  );
};

export default HealthCalendar;
