import React, { forwardRef, useImperativeHandle } from 'react';
import { Button, Input } from '@material-ui/core';

const Child = forwardRef((props, ref) => {
    const [ text, setText ] = React.useState('');
    const change = e => setText(e.target.value);
    const handleClick = () => console.log('Hijo', text);

    useImperativeHandle( ref, () =>{
        return {
            handleClick,
            text
        }
    } )

     return (
        <React.Fragment>
            <h3>Child</h3>
            <Input type="text" onKeyUp={ change }></Input>
            <Button variant="outlined" onClick={ handleClick }>TEXTO</Button>
        </React.Fragment>
    )
});

 const ExampleRefParentChild = () => {
    const ref = React.useRef();
    const handleClick = () => {
        ref.current.handleClick();
        console.log(process.env.REACT_APP_BASE_URL);
    };

    return (
        <div>
            <h1>Padre</h1>
            <Child ref={ref}></Child>
            <Button variant="outlined" onClick={ handleClick }>TEXTO DEL HIJO</Button>
        </div>
    )
}

export default ExampleRefParentChild;
