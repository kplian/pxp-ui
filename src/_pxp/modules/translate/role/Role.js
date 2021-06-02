import React from 'react';
import * as Yup from 'yup';
import TablePxp from '../../../../_pxp/components/Table/TablePxp';

import { IconButton, Box, Typography } from '@material-ui/core';
import { handleMouseTriggerComponent } from '../../../../_pxp/utils/Common';
import AddIcon from '@material-ui/icons/Add';


export const AddHelerBtn = ({ onClick }) => (
	<IconButton
	  size="small"
	  aria-label="toggle open form for adding new data"
	  onClick={onClick}
	  onMouseDown={handleMouseTriggerComponent}
	  color="primary"
	>
	  <AddIcon />
	</IconButton>
);

const dataReader = {
	dataRows: 'data',
};

const Role = (handleAddItem) => {
	const jsonRole = {
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
					type: 'AutoComplete',
					isSearchable: true,
					label: 'Subsystem Id',
					variant: 'outlined',
					grid: true,
					form: true,
					store: {
						dataReader,
						method: 'GET',
						url: `pxp/Subsystem/list`,
						idDD: 'subsystemId',
						descDD: 'name',
						parFilters: 'name',
						params: {
							sort: 'name',
							start: '0',
							limit: '50',
							dir: 'DESC',
							sort: 'subsystemId',
						  },
						  renderOption: (option) => (
							<span>
							  {option.name}
							</span>
						  ),
						},
						validate: {
						  shape: Yup.string().required(' es requerido'),
						},
						renderColumn: (row) => row.subsystem.name,

					gridForm: { xs: 12, sm: 6 },
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