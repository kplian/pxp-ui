import React from 'react';
// JSON CONFIG
export const defaultConfig = {
    showActions: true,
    showDetail: true,
    showSearch: false,
    showFilter: true,
    filters: [],
    columns: {
        primary: {
            field: 'num_tramite',
            renderOption: (row) => {
                return <div>Render</div>
            }
        },
        secondary: {
            field: 'desc_funcionario',
            renderOption: (row) => {
                return <div>Render</div>
            }
        },
        terciary: {
            field: 'importe_total',
            text: 'Total',
            level: 3,
            renderOption: (row) => {
                return <div>Render</div>
            }
        },
        detail: [
            {
                field: 'rowField',
                text: 'rowFieldText'
            }
        ]
    }
};
export default defaultConfig;