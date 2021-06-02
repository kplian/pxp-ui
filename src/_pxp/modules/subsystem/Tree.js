import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import useJsonStore from '../../../_pxp/hooks/useJsonStore';

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
});
const Tree = ({ config ,addParentId ,nodeValues}) => {
    const classes = useStyles();

    const store = useJsonStore(config.getData);
    const { data } = store;

    const [expanded, setExpanded] = useState([]);
    const [node, setNode] = useState([]);

    useEffect(() => {
        if (data) {
            const nodeid=[];
            data[0].map((e)=>{
                nodeid.push(e.uiId+"");
            });
            setExpanded(nodeid);
            setNode(data[0]);
        }
    }, [data]);

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            // defaultExpanded={node?expanded:null}
            defaultExpandIcon={<ChevronRightIcon />}
            disableSelection={true}
            multiSelect={false}
        >
            {console.log('elnodo', node)}
            {
                node && node.map((tree) => {
                    // if(expanded.indexOf(tree.acountId.toString()) == -1){
                    //     expandir(tree.acountId.toString()); 
                    // }
                   
                    return <TreeNode
                        key={tree.uiId}
                        node={tree}
                        setNode={setNode}
                        json={node}
                        addParentId={addParentId}
                        nodeValues={nodeValues}

                    />
                })}
        </TreeView>
    );
};

const TreeNode = ({ node, setNode, json ,addParentId,nodeValues}) => {
    
    // expandir(node.acountId);
    const [child, setchild] = useState();

    const children = {
        getData: {
            method: 'GET',
            url: `pxp/Uis/find/${node.uiId}`,
            params: {
                start: '0',
                limit: '10',
                sort: 'uiId',
                dir: 'asc',
            },
            load: false,
        },
        idStore: 'uiId',
    }
    const { data, set } = useJsonStore(children.getData);

    useEffect(() => {
        if (data) {
            setchild(data[0]);
        }
    }, [data]);

    // console.log('children cargado:', child);
    const getChildren = (nodeId) => {

        addParentId(nodeId);
        nodeValues(node);
        console.log('nodeId', nodeId);
        if (node.children) {
            set(prev => ({
                ...prev,
                load: false
            }));
        } else {
            set(prev => ({
                ...prev,
                load: true
            }));
        }

        // console.log('node', node);
        // console.log('child', [child]);
        if (node && child) {

            // const newNode = json.filter(id => { return id.acountId == nodeId });
            // console.log('newNode', newNode);

            function addToStructure(structure, object, parent) {
                structure.some(function iter(a) {
                    if (a.uiId === parent) {
                        a.children = a.children || [];
                        a.children.push(object);
                        return true;
                    }
                    return Array.isArray(a.children) && a.children.some(iter);
                });
            }
            // const hijos = [{ key: 100, label: "Johny Dep" }, { key: 200, label: "Hilarion Bellido" }]

            if (!node.children) {
                
                child.map((hijo) => {
                    addToStructure(json, hijo, nodeId);
                })
            }
            // const addchildManual = 
            // addToStructure(elements, { key: 200, label: "Hilarion Bellido" }, 20);
            // console.log('addchildManual', json);
            //    setNode(
            //        json=json
            //    )

            setNode(
                [...json],
            );
            // expandir(nodeId);
        }
        console.log('json 2', json);
    }

    const [childVisible, setChildVisiblity] = useState(false);
    const hasChild = child ? true : false;

    return (
        <div >
            <TreeItem
                onLabelClick={() => { getChildren(node.uiId) }}
                collapseIcon={false}
                key={node.uiId}
                nodeId={node.uiId + ""}
                label={node.code+" " + node.name +" "+ node.route}
                // children={node.children}
            >
                {Array.isArray(node.children) && node.children.length > 0
                    ? node.children && node.children.map((tree) => {
                        // if(expanded.indexOf(tree.acountId.toString()) == -1){
                        //     expandir(tree.acountId.toString());
                        // }
                        return <TreeNode
                            key={tree.uiId}
                            node={tree}
                            setNode={setNode}
                            json={json}
                            addParentId={addParentId}
                            nodeValues={nodeValues}
                        />

                    })
                    : null}
            </TreeItem>
        </div>
    );
};
export default Tree;
