/**
 * ExampleMapping.js
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React from 'react';
import { Box, Button, Card, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Marker from '../../../boa-manager-file/assets/icons/Marker';
import Label from '../../../_pxp/components/Label';
import OfficeChair2 from '../../../boa-manager-file/assets/icons/OfficeChair2';
import Email from '../../../boa-manager-file/assets/icons/Email';
import { getUrlForView } from '../../../_pxp/utils/Common';
import ProductDocuments from '../../../boa-manager-file/assets/icons/ProductDocuments';
import ComponentMapping from '../../../_pxp/components/ComponentMapping/ComponentMapping';

const useStylesComponent = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 88,
    width: 88,
  },
}));

const ExampleMapping = ({ rest }) => {
  const classesComponent = useStylesComponent();

  const handleTest = (row, statesFromMappging) => {
    console.log(row);
    console.log(statesFromMappging[row.id_persona]);
    alert('assdas');
  };
  const config = {
    name: 'Grid Shop',
    idStore: 'id_persona',
    grid: { xs: 12, sm: 6, md: 4 },
    getDataTable: {
      url: 'organigrama/Funcionario/listarFuncionario',
      params: {
        start: '0',
        limit: '10',
        sort: 'id_funcionario',
        dir: 'ASC',
      },
      load: true,
    },
    renderComponent: (row, statesFromMappging) => {
      return (
        <>
          <Card className={clsx(classesComponent.root)} {...rest}>
            <Box flexGrow={1}>
              <Typography
                component="h3"
                gutterBottom
                variant="overline"
                color="textSecondary"
              >
                Boa - Sistemas
              </Typography>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <Typography variant="h6" color="textPrimary">
                  {row.desc_person}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <Typography color="textSecondary">
                  {row.nombre_cargo}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" flexWrap="wrap" pt="20px">
                <Marker />
                <Label className={classesComponent.label} color="success">
                  {row.nombre_lugar_ofi}
                </Label>
              </Box>
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <OfficeChair2 />
                <Label className={classesComponent.label}>
                  {row.nombre_oficina}
                </Label>
              </Box>
              <Box display="flex" alignItems="center" flexWrap="wrap" m={1}>
                <Email />
                <Typography color="textSecondary">
                  {row.email_empresa}
                </Typography>
              </Box>
            </Box>
            <Avatar
              className={classesComponent.avatar}
              src={getUrlForView({
                nameFile: row?.nombre_archivo,
                folder: row?.folder,
                extension: row?.extension,
                // size: 'pequeno',
              })}
              onClick={() => handleTest(row, statesFromMappging)}
            />
          </Card>
          <Card>
            <Divider />
            <Box py={2} pl={2} pr={3} display="flex" alignItems="center">
              <Box flexGrow={1} />
              <Button
                color="primary"
                variant="contained"
                startIcon={<ProductDocuments />}
              >
                Archivos
              </Button>
            </Box>
          </Card>
        </>
      );
    },
  };

  return <ComponentMapping config={config} />;
};

export default ExampleMapping;
