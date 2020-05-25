import React from 'react';
import Tree from './Tree';
import { useSelector } from 'react-redux';

const ExampleTree = () => {
    const config = {
        icons: {
            collapse:'',
            expand: '',
            end:''
        }
    };
    const menu = useSelector((state) => state.auth.menu);


    return (
        <div>
            <Tree config={ config } data={ menu }/>
        </div>
    )
}

export default ExampleTree;
