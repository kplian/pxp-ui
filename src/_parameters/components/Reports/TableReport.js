import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PdfIcon from '@material-ui/icons/PictureAsPdfRounded';
import Icon from '@material-ui/core/Icon';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import Pxp from '../../../Pxp';

const TableReport = ({ columns, filters = null, isDetail = false }) => {
  const params = useParams();
  const refTable = useRef();

  const generateData = () => {
    const { set } = refTable.current.jsonStore;
    set((prevData) => ({
      ...prevData,
      params: {
        ...prevData.params,
        filters,
      },
      load: true,
    }));
  };

  const generateReport = (type) => {
    // Pxp.apiClient.doRequest({
    //   url: `reports/${params.reportId}/generate/${type}`,
    //   method: 'GET',
    // }).then((result) => {

    // }).catch((err) => {

    // });
    window.open(`
    ${Pxp.apiClient.protocol}://${Pxp.apiClient.host}:${Pxp.apiClient.port}/${
      Pxp.apiClient.baseUrl
    }/reports/${params.reportId}/generate/${type}?filters=${encodeURIComponent(
      filters,
    )}`);
  };

  const tableConfig = {
    nameForm: 'Report',
    dataReader: {
      dataRows: isDetail ? 'dataDetail' : 'data',
      total: isDetail ? 'countDetail' : 'count',
      isDetail,
    },
    columns,
    idStore: Object.keys(columns)[0] || 'id',
    buttonNew: false,
    getDataTable: {
      url: `reports/${params.reportId}/generate`,
      method: 'GET',
      params: {
        start: '0',
        limit: '10',
      },
      load: false,
    },
    actionsTableCell: {
      buttonDel: false,
      buttonEdit: false,
    },
    buttonsToolbar: {
      exportPdf: {
        onClick: (e) => generateReport('pdf'),
        icon: <PdfIcon />,
        title: 'Exportar a Pdf',
      },
      exportXlsx: {
        onClick: (e) => generateReport('xlsx'),
        icon: <Icon>table_view</Icon>,
        title: 'Exportar a Excel',
      },
    },
  };

  useEffect(() => {
    const ac = new AbortController();
    if (columns) {
      generateData();
    }
    return () => ac.abort();
  }, [columns, filters]);

  return (
    <div>
      <TablePxp dataConfig={tableConfig} ref={refTable} />
    </div>
  );
};

export default TableReport;
