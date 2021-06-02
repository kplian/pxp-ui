import { makeStyles } from '@material-ui/core';
import React,{useState} from 'react';
import * as Yup from 'yup';
import TablePxp from '../../components/Table/TablePxp';
import MasterDetail from '../../components/MasterDetail/index';
import MaterialTree from './MaterialTree';
// import MaterialTree from './MaterialTree';

const useStyles = makeStyles((theme) => ({
	content: {
	  display: 'flex',
	  height: '100%',
	  '& .gutter': {
		border: theme.palette.action.disabled + ' 1px solid',
		backgroundColor: theme.palette.action.disabledBackground,
		width: '4px !important',
	  }
	},
	avatar: {
	  height: 42,
	  width: 42,
	  marginRight: theme.spacing(1),
	},
  }));

const Subsystem = () => {
	const classes = useStyles();
	const [showDetail, setShowDetail] = useState(false);


	const jsonSubsystem = {
		tableName: 'Subsistemas',
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

	console.log(jsonSubsystem.idStore);

	return (
		<>
			<MasterDetail
				sizes={[50, 50]}
				className={classes.content}
				showDetail={showDetail}
				setShowDetail={setShowDetail}
			>
				<TablePxp dataConfig={jsonSubsystem} />
				 <MaterialTree/>
			</MasterDetail>
		</>

	)
}

export default Subsystem;