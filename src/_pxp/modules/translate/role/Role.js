import React from 'react';
import * as Yup from 'yup';
import TablePxp from '../../../../_pxp/components/Table/TablePxp';

const Role = () => {
	const jsonRole = {
		tableName:'Roles',
		idStore: 'roleId',
		buttonDel: true,
		buttonNew: true,
		buttonEdit: true,
		dataReader: {
			dataRows: 'data',
			total: 'count',
		},
		columns: {
			role: {
				type: 'TextField',
				label: 'Role',
				gridForm: { xs: 12, sm: 6 },
				variant: 'outlined',
			},
			description: {
				type: 'TextField',
				label: 'Description',
				gridForm: { xs: 12, sm: 6 },
				variant: 'outlined',
			},
			subsystemId: {
				type: 'TextField',
				label: 'Subsystem Id',
				gridForm: { xs: 12, sm: 6 },
				variant: 'outlined',
			},
			
		},
		getDataTable: {
			url: 'pxp/Role/list',
			method: 'GET',
			params: {
				start: '0',
				limit: '10',
				dir: 'DESC',
				sort: 'roleId',
			},
			load: true,
		},
		onSubmit: {
			urlAdd: 'pxp/Role/add',
			urlEdit: 'pxp/Role/edit',
		},
		urlDelete: 'pxp/Role/delete',
		actionsTableCell: {
			buttonDel: true,
			buttonEdit: true,
		},
	};

	return <TablePxp dataConfig={jsonRole} />;
}

export default Role;