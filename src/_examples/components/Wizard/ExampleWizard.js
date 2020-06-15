import React from 'react';
import { useHistory } from 'react-router-dom';
import Wizard from '../../../_pxp/components/Wizard/Wizard';
import WizardStep from '../../../_pxp/components/Wizard/WizardStep';
import ExampleFormW from './ExampleFormW';

const ExampleWizard = () => {
  const ref1 = React.useRef(null);
  const nextStep1 = () => {
    console.log('data STEP 1', ref1.current.onSubmit());
  };

  const nextStep2 = () => alert('Save STEP 2');
  const nextStep3 = () => alert('Save STEP 3');
  const history = useHistory();
  const complete = () => history.push('/main');

  const [, setValid1] = React.useState(false);

  return (
    <div>
      <Wizard complete={complete}>
        <WizardStep
          title="Create Person"
          valid
          onNext={nextStep1}
          icon="person"
        >
          <ExampleFormW ref={ref1} setValid={setValid1} />
        </WizardStep>
        <WizardStep title="Create User" valid onNext={nextStep2} icon="user">
          <ExampleFormW />
        </WizardStep>
        <WizardStep
          title="Assing Role"
          valid
          onNext={nextStep3}
          icon="security"
        >
          <ExampleFormW />
        </WizardStep>
        <WizardStep title="Step 4" valid onNext={nextStep3} icon="vpn_lock">
          <h1>
            <div
              className="Container"
              dangerouslySetInnerHTML={{
                __html:
                  '<div><strong>blablabla<strong><p>another blbla</p/></div>',
              }}
            />
          </h1>
        </WizardStep>
      </Wizard>
    </div>
  );
};

export default ExampleWizard;
