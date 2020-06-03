import React from 'react';
import { configTextField, simpleForm } from './config';
import BasicContainer from '../../../_pxp/containers/BasicContainer';
import Form from '../../../_pxp/components/Form/Form';

const ExampleDropzoneAreaBase = () => {
  const config = {
    ...simpleForm,
    columns: {
      dropzoneForOnlyImage: {
        type: 'DropzoneArea',
        label: 'Drag and drop an image here or click', // this is for dropzone text
        propsDropZoneArea: {
          // for this you can see the documentation about that
          filesLimit: 1,
          acceptedFiles: ['image/*'],
          useChipsForPreview: true,
        },
        gridForm: { xs: 12, sm: 6 },
      },
      name: configTextField,
    },
  };
  return (
    <BasicContainer>
      <Form data={config} />
    </BasicContainer>
  );
};

export default ExampleDropzoneAreaBase;
