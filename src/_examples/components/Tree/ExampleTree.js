import React from 'react';
import Tree from '../../../_pxp/components/Tree';
import { useSelector } from 'react-redux';
import useJsonStore from '../../../_pxp/hooks/useJsonStore';
const ExampleTree = () => {
    const config = {
        icons: {
            collapse:'',
            expand: '',
            end:''
        }
    };
    const menu = useSelector((state) => state.auth.menu);
    const params = {
        url: 'seguridad/Subsistema/listarSubsistema',
        params: {"start":"0","limit":"50","sort":"id_subsistema","dir":"ASC","contenedor":"docs-SISTEM"}
    };
    const { data } = useJsonStore(params); 

    console.log('menu', console.log(menu));
    return (
        <div>
            <Tree config={ config } data={ menu }/>
        </div>
    )
}

export default ExampleTree;
