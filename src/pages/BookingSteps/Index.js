import React, { useState , createRef, useEffect, useRef } from 'react';
import Header from '../../components/header';
import { Container,Grid, Box, Typography, Button } from '@mui/material';
import { Step,StepButton, Stepper, Paper,StepContent, StepLabel } from '@mui/material';
import BookingSidemenu from '../../components/BookingSidemenu/BookingSidemenu';
import Step1 from './step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import { TripinfoProvider } from "./context"
import { Outlet } from 'react-router-dom';
import './style.css';
import { useHistory ,useLocation ,matchRoutes } from 'react-router-dom';

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
  const location = useLocation()
  let ind = location.pathname.split("/")[2]
  var index;
  switch (ind) {
    case "flight":
      index = 0
      break;
    case "passangers":
      index = 1
      break;
    case "passangers":
      index = 2
      break;
  
    default:
      index = 0
      break;
  }


    const [activeStep, setActiveStep] = React.useState(index);
    const [completed, setCompleted] = React.useState({});
    const [ tripInfos , setTripInfos ] = React.useState([])
    const [ totalPriceInfo , setTotalPriceInfo ] = React.useState({})
    const formRef = useRef();

    const navigate = useNavigate();

    const { id }  = useParams();
    var value
    var pricd = {
      priceIds : [id]
  }

    React.useMemo(()=>{


     console.log("sd");
      const headers = {
        'Content-Type': 'application/json',
        'apikey': process.env.REACT_APP_FLIGHT_API_KEY
        }

     
      axios.post(`${process.env.REACT_APP_FLIGHT_URL}/fms/v1/review`,pricd , { headers : headers}  ).then(res=>{
        console.log(res?.data);
        if(res?.data?.status?.httpStatus == 200) {
          let info = res?.data
           value = info;
          setTripInfos(info)
         // setTotalPriceInfo(res?.data?.totalPriceInfo)
        }
        
      }).catch(e=>{

        console.log(e?.response?.data?.status?.success);
        if(e?.response?.data?.status?.success == false){
         
            alert(e?.response?.data?.errors[0]?.message)
          //  navigate(-1)
         
        }
      })

    },[])

  
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
            ? steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);

        // console.log(newActiveStep);
       // const newActiveStep = 2

      if(newActiveStep == 0){
        navigate(`/booking/flight/${id}`);
      }
      if(newActiveStep == 1){
      
     //   completeservice.comborevent("next")
        navigate(`/booking/passangers/${id}`);


      }
      if(newActiveStep == 2){


        formRef.current.handleSubmit()
        formRef.current.validateForm().then(r=>{
          let len = Object.keys(r).length
          if(len == 0){

            let data = formRef.current.values
            window.localStorage.setItem('passangerdetail',JSON.stringify(data))
            navigate(`/booking/step3/${id}`);

          } else {
            setActiveStep(newActiveStep-1)
          }
         
        })


      //   let st = formRef.current.isValid;
      //   let len = Object.keys(formRef.current.errors).length
      //  console.log(len);
      //  console.log(formRef.current);
      //   if(len > 0){
      //     setActiveStep(newActiveStep-1)
      //   }else{
      //     let data = formRef.current.values
      //     console.log(data);

      //     window.localStorage.setItem('passangerdetail',JSON.stringify(data))


      //   navigate(`/booking/step3/${id}`);
      //   }
    
      }


      };

    
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

        if((activeStep - 1 )== 0 ){
          navigate(`/booking/flight/${id}`);
        }
        if((activeStep - 1) == 1){
          navigate(`/booking/passangers/${id}`);
        }
        if((activeStep - 1) == 2){
          navigate(`/booking/step3/${id}`);
        }

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

    // const getStep = (step) => {
    //   switch (step) {
    //     case 0:
    //       return <> { Object.keys(tripInfos).length > 0 && <TripinfoProvider value={tripInfos} > <Step1 /> </TripinfoProvider> }</>;
    //     case 1:
    //       return <Step2 stepObj={steps[step]}/>;
    //     case 2:
    //       return <Step2 stepObj={steps[step]} activestatus={activeStep}/>;
    //     case 3:
    //       return <Step4 />;
    //     default:
    //       return "Completed";
    //   }
    // }

    // latest
    // const getStep = (step) => {
    //   switch (step) {
    //     case 0:
    //       return <> { Object.keys(tripInfos).length > 0 && <TripinfoProvider value={tripInfos} > <Step1/> </TripinfoProvider> }</>;
    //     case 1:
    //       return <Step2 stepObj={steps[step]}/>;
    //     case 2:
    //       return <Step2 stepObj={steps[step]} activestatus={activeStep}/>;
    //     case 3:
    //       return <Step4 />;
    //     default:
    //       return "Completed";
    //   }
    // }

    const getStep = (step) => {
      switch (step) {
        case 0:
          return <> { Object.keys(tripInfos).length > 0 && <TripinfoProvider value={tripInfos} > <Outlet/> </TripinfoProvider> }</>;
        case 1:
          return <Outlet/>;
        case 2:
          return <Step2 stepObj={steps[step]} activestatus={activeStep}/>;
        case 3:
          return <Step4 />;
        default:
          return "Completed";
      }
    }


    const handleevent = () => {
      console.log('sdfgh');
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

                      Object.keys(tripInfos).length > 0 && <TripinfoProvider value={tripInfos} > <Outlet context={{reff:formRef}}/> </TripinfoProvider> 
                    //  getStep(activeStep)

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
                            </Box>

                            <Box className='right'>
                                <Button onClick={handleNext}  sx={{ mr: 1 }} className="color_primary" variant='contained'>
                                    Continue
                                </Button>
                                {/* {activeStep !== steps.length &&
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
                                ))} */}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                    <> { Object.keys(tripInfos).length > 0 && <TripinfoProvider value={tripInfos} > <BookingSidemenu /> </TripinfoProvider> }</>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    </div>
  )
}
