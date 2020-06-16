import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import StepConnector from '@material-ui/core/StepConnector';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height:'77vh',
    backgroundColor: theme.palette.background.default,
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paperButtons: {
    padding: '5px',
    // position: 'absolute',
    width: '100%',
    zIndex: 10,
    bottom: '80px',
    left: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    padding: '10px',
    paddingTop: '20px',
    maxHeight: '65vh',
  },
  container: {
    height: 'calc(100% - 140px)',
    width: '100%'
  },
  containerVertical: {
    width: '80%',
  },
  horizontalStepper: {
    borderBottom: '1px solid ' + theme.palette.action.disabled,
  },
  verticalStepper: {
    width: '20%',
    height: '100%',
    padding: '5px',
    zIndex: 5,
    boxShadow: 'none',
  },
   contentV: {
     display: 'flex',
     flexDirection: 'row',
     height: 'calc( 100% - 46px)',
   },
   contentH: {
      height: 'calc( 100% - 46px)',
   },
   vStep: {
    width: '100%',
    paddingTop: '25%',
    boxShadow: theme.shadows[3]
  },
  activeStep: {
    borderRight: `2px solid ${ theme.palette.primary.main }`,
  }
}));

const ColorlibConnector = withStyles({
  root: {
    // display: 'none'
  },
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },

})(StepConnector);

const getSteps = children => children.map(({props}) => props);

const Wizard = ({children, complete, orientation = 'horizontal'}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps( children );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
        children[prevActiveStep].props.onNext();
        return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isVertical = () => orientation === 'vertical';

  return (
    <Paper className={classes.root} elevation={6}>
      <div className={ isVertical() ? classes.contentV: classes.contentH }>
        <Stepper activeStep={activeStep} 
          alternativeLabel 
          elevation={6} 
          orientation={ orientation } 
          className={ isVertical() ? classes.verticalStepper: classes.horizontalStepper }
          connector={ !isVertical() ? <ColorlibConnector /> : null }
        >
          {steps.map((step, i) => (
            <Step key={step.title} 
              className={ clsx( 
                isVertical() ? classes.vStep: classes.hstep,
                {[classes.activeStep]: activeStep === i && isVertical() }
                )}>
              <StepLabel StepIconComponent={ ColorlibStepIcon } StepIconProps={{ icon: step.icon }}>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={ isVertical() ? classes.containerVertical: classes.container }>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
              <div className={ classes.content }>        
                  { activeStep === steps.length && <Typography className={classes.instructions}>All steps completed</Typography> }
                  { children[ activeStep ] }           
              </div>
          </PerfectScrollbar>  
        </div>  
      </div>    
       <Paper elevation={6} className={ classes.paperButtons }>
            { activeStep === steps.length && 
                <React.Fragment>
                    <Button onClick={handleReset}>Reset</Button>
                    <Button variant="contained" color="primary" onClick={complete}>Complete</Button>
                </React.Fragment>
            }
            { activeStep !== steps.length &&
                <React.Fragment>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext} disabled={!children[activeStep].props.valid}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </React.Fragment>
            }              
        </Paper>  
    </Paper>
  );
};

export default Wizard;
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon>{ props.icon }</Icon>
    </div>
  );
}
