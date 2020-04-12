import PxpClient from 'pxp-client';

export const startSetExpenses = () => {    
    PxpClient.doRequest({
        url: 'adquisiciones/Expense/listarExpense',
        params: {
            start: 0,
            limit: 100
        }
    });    
};