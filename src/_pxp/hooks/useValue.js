import {useState} from 'react';

const UseValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    return {
        value, setValue
    };
};

export default UseValue;
