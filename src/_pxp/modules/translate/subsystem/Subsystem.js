import React from 'react';
import * as Yup from 'yup';
import TablePxp from '../../../../_pxp/components/Table/TablePxp';

const Subsystem = () => {
	const jsonSubsystem = {
		idStore: 'subsystemId',
		buttonDel: true,
		buttonNew: true,
		buttonEdit: true,
		dataReader: {
			dataRows: 'data',
			total: 'count',
		},
		columns: {
			code: {
				type: 'TextField',
				label: 'Code',
				gridForm: { xs: 12, sm: 6 },
				variant: 'outlined',
			},
			name: {
				type: 'TextField',
				label: 'Name',
				gridForm: { xs: 12, sm: 6 },
				variant: 'outlined',
			},
			folderName: {
				type: 'TextField',
				label: 'Folder Name',
				gridForm: { xs: 12, sm: 6 },
				variant: 'outlined',
			},
			prefix: {
				type: 'TextField',
				label: 'Prefix',
				gridForm: { xs: 12, sm: 6 },
				variant: 'outlined',
			},
		},
		getDataTable: {  
			url: 'pxp/Subsystem/list',
			method: 'GET',
			params: {
				start: '0',
				limit: '10',
				dir: 'DESC',
				sort: 'subsystemId',
			},
			load: true,
		},
		onSubmit: {
			urlAdd: 'pxp/Subsystem/add',
			urlEdit: 'pxp/Subsystem/edit',
		},
		urlDelete: 'pxp/Subsystem/delete',
		actionsTableCell: {
			buttonDel: true,
			buttonEdit: true,
		},
	};

	return <TablePxp dataConfig={jsonSubsystem} />;
}

export default Subsystem;