import React, { useState} from 'react';
import Header from '../../components/header';
import { Container,Grid, Box, Typography, Button } from '@mui/material';
import { Step,StepButton, Stepper, Paper,StepContent, StepLabel } from '@mui/material';
import BookingSidemenu from '../../components/BookingSidemenu/BookingSidemenu';
import Step1 from './step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { styled } from '@mui/material/styles';

import './style.css';

const steps = [
    {
      steps: 'First Step',
      label: 'Flight Journey',
    },
    {
      steps: 'Second Step',
      label: 'Passenger Details',
    },
    {
      steps: 'Third Step',
      label: 'Review',
    },
    {
      steps: 'Final Step',
      label: 'Payment',
    },
];
export default function Index() { 
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
  
    const totalSteps = () => {
        return steps.length;
      };
    
      const completedSteps = () => {
        return Object.keys(completed).length;
      };
    
      const isLastStep = () => {
        return activeStep === totalSteps() - 1;
      };
    
      const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
      };
    
      const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStep = (step) => () => {
        setActiveStep(step);
      };
    
      const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      };
    
      const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
      };
    
    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
    }));

    const getStep = (step) => {
      switch (step) {
        case 0:
          return <Step1 />;
        case 1:
          return <Step2 stepObj={steps[step]}/>;
        case 2:
          return <Step2 stepObj={steps[step]} activestatus={activeStep}/>;
        case 3:
          return <Step4 />;
        default:
          return "Completed";
      }
    }
  
  return (
    <div>
        <Header headerDark={false}  />
        <Box className='bgshape bgcolor' style={{backgroundColor: '#21325d', height : 400}}>
            <Box className='bgimg' style={{ backgroundImage : '../../../assets/line.png' }}></Box>
        </Box>

        <Box className='bookingStep' style={{ marginTop : 27 }}>
            <Container maxWidth='lg' >
                <Grid container style={{ marginBottom : 20 }}>
                    <Grid item md={9}>
                        <Box sx={{ width: '100%' }}>
                            <Stepper nonLinear activeStep={activeStep} className="journey_stepper">
                                {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton className='stepper_label' color="inherit" onClick={handleStep(index)}>
                                      <Typography className='stepscount'>{label.steps}</Typography>
                                      {label.label}
                                    </StepButton>
                                </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item md={9}>
                        <Box className='boxsection'>
                            <div>
                                {allStepsCompleted() ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>
                                ) : (
                                    getStep(activeStep)
                                )}
                            </div>
                            {/* { activeStep == '0' && (
                            )} */}
                        </Box>

                        <Box className='buttongroups' style={{ marginTop : 20, flexDirection : 'row', justifyContent : 'space-between' }}>
                            <Box className='left'>
                                <Button
                                    className='color_secondary'
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}>
                                    Back
                                </Button>
                                <Button onClick={handleNext} sx={{ mr: 1 }} className="color_primary" variant='contained'>
                                    Continue
                                </Button>
                            </Box>

                            <Box className='right'>
                                {activeStep !== steps.length &&
                                    (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                    ) : (
                                    <Button onClick={handleComplete}  className='color_secondary'>
                                        {completedSteps() === totalSteps() - 1
                                        ? 'Finish'
                                        : 'Complete Step'}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <BookingSidemenu />
                    </Grid>
                </Grid>
            </Container>
        </Box>

    </div>
  )
}
