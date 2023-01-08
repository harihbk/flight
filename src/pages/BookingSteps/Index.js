import React, { useState , createRef, useEffect, useRef } from 'react';
import Header from '../../components/header';
import { Container,Grid, Box, Typography, Button, FormControl, TextField } from '@mui/material';
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
import Skeleton from '@mui/material/Skeleton';
import { Add, Close, Check } from '@mui/icons-material';
import { array } from 'yup';

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
    const splitId = id.split(',');

    var value
    var pricd = {
      priceIds : splitId
  }
  console.log(typeof(pricd));
  console.log(pricd);

    React.useMemo(()=>{


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
       // alert(newActiveStep)

        // console.log(newActiveStep);
       // const newActiveStep = 2

      if(newActiveStep == 0){
        navigate(`/booking/flight/${id}`);
        handleComplete()
      }
      if(newActiveStep == 1){
     //   completeservice.comborevent("next")
        navigate(`/booking/passangers/${id}`);
        handleComplete()

      }
      if(newActiveStep == 2){
        formRef.current.handleSubmit()
        formRef.current.validateForm().then(r=>{
          let len = Object.keys(r).length
          if(len == 0){

            let data = formRef.current.values
            window.localStorage.setItem('passangerdetail',JSON.stringify(data))
            navigate(`/booking/step3/${id}`);
            handleComplete()

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

        if(newActiveStep == 3){
          navigate(`/booking/step4/${id}`);
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
        if((activeStep - 1) == 3){
          navigate(`/booking/step4/${id}`);
        }
        

      };
    
      const handleStep = (step) => () => {
        setActiveStep(step);
      };
    
      const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        // handleNext();
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
                                    <StepButton className='stepper_label' color="inherit" >
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

                                  || 
                                   
                                  
                                <Box sx={{ width: '100%', padding : 4 }}>
                                    <Grid container className='placerow' justifyContent="space-between">
                                      <Grid item className='box1' style={{ width : 170 }}>
                                          <Skeleton style={{ height : 30 }}/>
                                          <Skeleton animation="wave" />
                                      </Grid>
                                      <Grid item className='box1' style={{ width : 170 }}>
                                          <Skeleton />
                                          <Skeleton animation="wave" />
                                          <Skeleton animation={false} />
                                      </Grid>
                                    </Grid>
                                    {/* { new array(2).map(data, i)=>} */}
                                    <Box className='flightitem' style={{ paddingLeft : 0, paddingRight : 0 }}>
                                      <Skeleton style={{ marginBottom : 20}} />
                                      <Grid container className='frow' spacing={3} alignItems='center' justifyContent={'space-between'}>
                                        <Grid item className='box1' style={{ width : 70 }}>
                                            <Skeleton style={{ transform : 'none', height : 40, width : 40 }}/>
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box2' style={{ width : 150 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box3' style={{ width : 150 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                        </Grid>
                                        <Grid item className='box4' style={{ width : 150 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box4' style={{ width : 110 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box4' style={{ width : 110 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                      </Grid>
                                    </Box>
                                    <Box className='flightitem' style={{ paddingLeft : 0, paddingRight : 0, borderWidth : 0 }}>
                                      <Skeleton style={{ marginBottom : 20}} />
                                      <Grid container className='frow' spacing={3} alignItems='center' justifyContent={'space-between'}>
                                        <Grid item className='box1' style={{ width : 70 }}>
                                            <Skeleton style={{ transform : 'none', height : 40, width : 40 }}/>
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box2' style={{ width : 150 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box3' style={{ width : 150 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                        </Grid>
                                        <Grid item className='box4' style={{ width : 150 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box4' style={{ width : 110 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                        <Grid item className='box4' style={{ width : 110 }}>
                                            <Skeleton />
                                            <Skeleton animation="wave" />
                                            <Skeleton animation={false} />
                                        </Grid>
                                      </Grid>
                                    </Box>
                                </Box>


                                )}
                            </div>
                            
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
                    <> { Object.keys(tripInfos).length > 0 && <TripinfoProvider value={tripInfos} > <BookingSidemenu /> </TripinfoProvider>
                    
                      ||  
                      <Box sx={{ width: '100%', padding : 2 }} className='sidemenu booking'>
                          <Box className='skelton_inner'>
                            <Typography className='stitle'>{'Fare Summary'}</Typography>
                            <Box className='faredetails'>
                              <Box className='listitem'>
                                <Box className='farelabel'>
                                  <Add className='iconplus'/>  {'Base Fare'}
                                </Box>
                                <Box className='fareprice'>
                                 <Skeleton />
                                </Box>
                              </Box>
                              <Box className='listitem'>
                                <Box className='farelabel'>
                                  <Add className='iconplus'/>  {'Fees & Subcharges'}
                                </Box>
                                <Box className='fareprice'>
                                  <Skeleton />
                                </Box>
                              </Box>

                            </Box>


                              <Box className='listitem bsolid' style={{ borderBottomStyle : 'solid', borderColor : '#ccc', marginTop : 10, marginBottom : 10 }}>
                                <Box className='farelabel' style={{ fontWeight : '600' }}>
                                  {'Total Amount'}
                                </Box>
                                <Box className='fareprice'  style={{ fontWeight : '600' }}>
                                  <Skeleton style={{ marginBottom : 5,  marginTop : 5 }} />
                                </Box>
                              </Box>


                              <Typography className='stitle ucase' style={{ marginTop : 20 }}>{'Promo codes'}</Typography> 
                              <FormControl className='promocodeinput' sx={{ width : '100%' }}>
                                  <TextField size='small' className='fullwidth' id="promocode" value={''} placeholder="Enter your Mobile Number" variant="outlined" sx={{
                                      '& .MuiOutlinedInput-root': {
                                        'fieldset' :{
                                          borderColor: '#a9a9a9',
                                        },
                                        '&.Mui-focused fieldset': {
                                        borderColor: '#21325d',
                                      },
                                    },
                                    '& label.Mui-focused': {
                                      color: '#21325d',
                                    },
                                  }}/>
                              </FormControl>

                            <Skeleton style={{ height : 140, transform: 'none', marginTop: 17, marginBottom: 10 }}/>
                            <Skeleton  style={{ height : 140, transform: 'none', marginTop: 17, marginBottom: 10 }}  animation="wave" />
                            <Skeleton  style={{ height : 140, transform: 'none', marginTop: 17, marginBottom: 10 }}  animation={false} />
                          </Box>
                      </Box>
                    }</>
                         
                    </Grid>
                </Grid>
            </Container>
        </Box>

    </div>
  )
}
