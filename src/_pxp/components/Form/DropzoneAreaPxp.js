/**
 * DropZoneArea Component
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Grid from '@material-ui/core/Grid';

const areEqual = (prev, next) =>
  next.memoDisabled !== false &&
  prev.value === next.value &&
  prev.name === next.name &&
  prev.error === next.error &&
  prev.disabled === next.disabled;

// eslint-disable-next-line react/prop-types
export const DropzoneAreaPxpComponent = ({
  name,
  value,
  configInput,
  handleChange,
  error,
  msgError,
  disabled = false,
  filesLimit,
}) => {
  const { label, gridForm } = configInput;

  return (
    <Grid key={`grid_${name}`} item {...gridForm}>
      <DropzoneArea
        fileObjects={value}
        acceptedFiles={['image/*']}
        dropzoneText={label}
        filesLimit={filesLimit}
        onChange={(files) =>
          handleChange({
            undefined,
            name,
            value: files,
          })
        }
      />
    </Grid>
  );
};

/**
 * A memoized component that will re-render only one of props described in areEqual change.
 */
const DropzoneAreaPxp = React.memo(
  (props) => <DropzoneAreaPxpComponent {...props} />,
  areEqual,
);

export default DropzoneAreaPxp;
