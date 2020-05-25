import React from 'react';
import Wizard from './Wizard/Wizard';
import WizardStep from './Wizard/WizardStep';
import ExampleFormW from './ExampleFormW';
import ExampleTable from './ExampleTable';
import ExampleList from './ExampleList';
import { useHistory } from "react-router-dom";
import { FileIcon, UserSettings, IconPxp } from '../icons';

 const ExampleWizard = () => {
    const ref1 = React.useRef(null);
     const nextStep1 = (data) => {
        console.log('data STEP 1', ref1.current.onSubmit());
     };

     const nextStep2 = () => alert('Save STEP 2');
     const nextStep3 = () => alert('Save STEP 3');
     const history = useHistory();
     const complete = () => history.push("/main");

     const [valid1, setValid1 ] = React.useState(false);

    return (
        <div>
            <Wizard complete={ complete } orientation="vertical">
                <WizardStep title="Create Person" valid={ true } onNext={ nextStep1 } icon="person">
                    <ExampleFormW ref={ref1} setValid={setValid1}/>
                </WizardStep>
                <WizardStep title="Create User" valid={ true } onNext={ nextStep2 } icon={<FileIcon/>}>
                    <ExampleTable/>
                </WizardStep>
                <WizardStep title="Assing Role" valid={ true } onNext={ nextStep3 } icon={'security'}>
                    <ExampleList/>
                </WizardStep>
                <WizardStep title="Step 4" valid={ true } onNext={ nextStep3 } icon="vpn_lock">
                    <h1><div className="Container" dangerouslySetInnerHTML={{__html: 
                        '<div><strong>blablabla<strong><p>another blbla</p/></div>'}}></div></h1>
                </WizardStep>
            </Wizard>
        </div>
    )
};

export default ExampleWizard;
