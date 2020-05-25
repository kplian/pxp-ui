import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
// import { useTranslation } from 'react-i18next';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Scrollbars } from 'react-custom-scrollbars';
import Form from '../../../_pxp/components/Form/Form';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import MasterDetailContainer from '../../../_pxp/containers/MasterDetailContainer';
import am from '../../../_pxp/apiManager';
import userTableFields from './UserTableFields';
import userFormFields from './UserFormFields';
import userRoleFields from './UserRoleFields';
import fm from './UserFieldMapping';
import config from '../../../config';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </div>
  );
};

const ButtonNew = ({ handleClick }) => (
  <Tooltip title="new" aria-label="new">
    <IconButton aria-label="new" onClick={handleClick}>
      <AddIcon />
    </IconButton>
  </Tooltip>
);

const User = () => {
  // init states
  const [openDetail, setOpenDetail] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const refForm = useRef();
  const refTable = useRef();
  const refUserRoleForm = useRef();
  const refUserRole = useRef();
  const scrollBarRef = useRef();
  const [configUserRole, setConfigUserRole] = useState({
    nameForm: 'assignrole',
    nameTable: 'assignedroles',
    columns: userRoleFields,
    getDataTable: {
      url: am.segu.userRole.list,
      load: false,
      params: {
        start: '0',
        limit: '10',
        sort: fm.userRole,
        dir: 'desc',
        contenedor: 'docs-per',
      },
    },
    idStore: fm.userRole,
    buttonDel: false,
    buttonNew: true,
    buttonEdit: false,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: false,
    },
    onSubmit: {
      url: am.segu.userRole.save,
    },
    urlDelete: am.segu.userRole.delete,
  });

  useEffect(() => {
    if (!openDetail && scrollBarRef) {
      setTimeout(() => {
        scrollBarRef.current.scrollTop(scrollY);
      }, 500);
    }
  }, [openDetail, scrollBarRef]);
  /* BEGINT Init configuration objects */

  const configUserForm = {
    nameForm: 'User Form',
    columns: userFormFields,
    onSubmit: {
      url: am.segu.user.save,
    },
    groups: {
      groupPerson: {
        titleGroup: 'Persona',
        gridGroup: { xs: 12, sm: 6 },
      },
      groupUser: {
        titleGroup: 'Usuario',
        gridGroup: { xs: 12, sm: 6 },
      },
    },
  };

  const handleNew = () => {
    setTabValue(0);
    setOpenDetail(true);
    refForm.current.states[fm.person].setDisabled(false);
    Object.entries(refForm.current.states).forEach(([, value]) => {
      value.reset();
    });
    setScrollY(scrollBarRef.current.getScrollTop());
    scrollBarRef.current.scrollTop(0);
    scrollBarRef.current.scrollLeft(0);
  };

  const configUserTable = {
    nameForm: 'Users',
    columns: userTableFields,
    getDataTable: {
      url: am.segu.user.list,
      params: {
        start: '0',
        limit: '10',
        sort: fm.userId,
        dir: 'desc',
        contenedor: 'docs-per',
      },
    },
    idStore: fm.userId,
    buttonDel: false,
    buttonNew: false,
    buttonEdit: false,
    buttonsToolbar: {
      buttonAdd: { onClick: handleNew, button: ButtonNew },
    },
    actionsTableCell: {
      buttonDel: false,
      buttonEdit: false,
      icon: <SettingsIcon />,
      onClick: (row) => {
        refForm.current.states[fm.name].setValue(row[fm.name]);
        refForm.current.states[fm.surname1].setValue(row[fm.surname1]);
        refForm.current.states[fm.surname2].setValue(row[fm.surname2]);
        refForm.current.states[fm.person].setValue({
          [fm.person]: row[fm.person],
          [fm.pCompleteName2]: row[fm.completeName],
        });
        refForm.current.states[fm.email].setValue(row[fm.email]);
        refForm.current.states[fm.username].setValue(row[fm.username]);
        refForm.current.states[fm.person].setDisabled(true);
        refForm.current.states[fm.expireDate].setValue(
          moment(row[fm.expireDate], config.date.backendGetFormat).toDate(),
        );
        setConfigUserRole(
          _.merge(configUserRole, {
            onSubmit: { extraParams: { [fm.userId]: row[fm.userId] } },
          }),
        );
        // update user id for role
        const { set } = refUserRole.current.jsonStore;
        set((prevData) => ({
          ...prevData,
          params: {
            ...prevData.params,
            [fm.userId]: row[fm.userId],
          },
          load: true,
        }));
        setTabValue(0);
        setOpenDetail(true);
        setScrollY(scrollBarRef.current.getScrollTop());
        scrollBarRef.current.scrollTop(0);
        scrollBarRef.current.scrollLeft(0);
      },
    },
  };

  /* END Init configuration objects */

  const onCloseDetail = () => {
    setOpenDetail(false);
    refTable.current.handleRefresh();
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Scrollbars ref={scrollBarRef} autoHide>
      <MasterDetailContainer
        master={<TablePxp dataConfig={configUserTable} ref={refTable} />}
        detail={
          <div>
            <Paper square>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="User" />
                <Tab label="Roles" />
              </Tabs>
            </Paper>
            <TabPanel value={tabValue} index={0}>
              <Form data={configUserForm} ref={refForm} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TablePxp
                dataConfig={configUserRole}
                ref={refUserRole}
                refForm={refUserRoleForm}
              />
            </TabPanel>
          </div>
        }
        orientation="horizontal"
        openDetail={openDetail}
        onCloseDetail={onCloseDetail}
        forceMobileDetail
      />
    </Scrollbars>
  );
};

export default User;
