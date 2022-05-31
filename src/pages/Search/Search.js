import React from 'react';
import Header from '../../components/header';
import { useNavigate  } from "react-router-dom";
import { Container,IconButton, Box, Typography,Button, Grid } from '@mui/material';
import { FormControlLabel, RadioGroup, Radio, Tab, Tabs} from '@mui/material';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { KeyboardArrowDown } from '@mui/icons-material';
import './styles.css';
import { ArrowRightAlt } from '@mui/icons-material';
import Footer from '../../components/Footer/Footer';
import { motion } from "framer-motion";
import Sidemenu from '../../components/Sidemenu/Sidemenu';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrowicon.svg';


export default function Search({ isVisible }) {
    const [fareType, setFareType] = React.useState('regular');
    const [tripType, setTripType] = React.useState('roundtrip');
    const [flightGo, setFlightGo] = React.useState('flight_go1');
    const [flightReturn, setFlightReturn] = React.useState('flight_return1');
    const [tabValue, setTabValue] = React.useState();  
    const navigate = useNavigate(); 



    const navigatePage = (name) => {
      navigate(`/${name}`)
    }

    const changeFareType = (event) => {
      setFareType(event.target.value);
    };

    const changetripType = (event) => {
      setTripType(event.target.value);
    };

    const changeFGo = (event) => {
        setFlightGo(event.target.value);
    };

    const changeFReturn = (event) => {
        setFlightReturn(event.target.value);
    };

    const testArray = [1, 2, 3, 4, 5, 6,];


    const TabChange = (newValue) => {
        setTabValue(newValue);
        console.log(newValue)
    };
    

 
  return (
    <motion.div  >
      <div className='searchPage'>
        <Header headerDark={false} />
        <Box component={'div'} className='innerwrapper'>
            <Container  maxWidth="lg" className='container'>
                <Box className="contentWrapper" component={'div'}>
                    <Box  component="form" className='inputWrapper'>
                        <RadioGroup row className="triptype_radio" 
                            value={tripType}
                            onChange={changetripType} >
                            <FormControlLabel value="oneway" control={<Radio sx={{ 
                                '& .MuiSvgIcon-root': {
                                    fontSize: 15,
                                },
                                color: "#fff",
                                '&.Mui-checked': {
                                color: "#f59625",
                                }, }}/>} label="One-Way" />
                            <FormControlLabel value="roundtrip" control={<Radio sx={{ 
                                '& .MuiSvgIcon-root': {
                                fontSize: 15,
                                },
                                color: "#fff",
                                '&.Mui-checked': {
                                color: "#f59625",
                                }, }}/>} label="Round-Trip" />
                        </RadioGroup>
                        <div className='bookingStripe_search'>
                            <div className='tripType booking_input'>
                                <Typography component="span" className='label'>Trip Type</Typography>
                                <Typography className='placefrom inputTitle'>One-Way</Typography>
                            </div>
                            <div className='inputFrom booking_input'>
                                <Typography component="span" className='label'>From</Typography>
                                <Typography className='placefrom inputTitle'>Coimbatore (CJB)</Typography>
                            </div>
                            
                            <div className='shiftfld'>
                                <IconButton aria-label="fingerprint" className='shiftbtn' color="secondary">
                                {/* <img src={require('../../assets/icons/shiftarow.png')} alt={'Shift'} /> */}
                                    <ArrowIcon className='shiftarrow' />
                                </IconButton>
                            </div>

                            <div className='inputFrom booking_input'>
                                <Typography component="span" className='label'>To</Typography>
                                <Typography className='placeto inputTitle'>Bengaluru (BLR)</Typography>
                            </div>

                            <div className='departure booking_input'>
                                <Typography component="span" className='label'>Departure</Typography>
                                <Typography className='placeto inputTitle'>6 May 22</Typography>
                            </div>

                            <div className='return booking_input ' disabled={tripType == 'roundtrip' ? true : false}>
                                <Typography component="span" className='label'>Return</Typography>
                                <Typography className='placeto inputTitle'>8 May 222</Typography>
                            </div>

                            <div className='traverler booking_input'>
                                <Typography component="span" className='label'>Travellers & Class</Typography>
                                <Box component={'div'} sx={{ display : 'flex', columnGap : 1, alignItems : 'center' }}>
                                    <Typography className='placeto inputTitle'>1 Adult</Typography>
                                    <Typography className='inputTagline'>Economy</Typography>
                                </Box>
                            </div>
                            <div className='UpdateButtonGrp'>
                                <Button variant='contained'>Update Search</Button>
                            </div>
                        </div> 

                        <div className='fareType' style={{ display : 'flex', alignItems : 'center', columnGap : 20, marginTop : 20 }}>
                            <Typography style={{ color: '#fff', fontSize : 11 }}>Select A Fare Type : </Typography>
                            <RadioGroup row className="faretype_radio" 
                                value={fareType}
                                onChange={changeFareType} >
                                <FormControlLabel value="regular" control={<Radio sx={{ 
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 15,
                                    },
                                    color: "#99999a",
                                    '&.Mui-checked': {
                                    color: "#f59625",
                                    }, }}/>} label="Regular" />
                                <FormControlLabel value="armedforce" control={<Radio sx={{ 
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 15,
                                    },
                                    color: "#99999a",
                                    '&.Mui-checked': {
                                    color: "#f59625",
                                    }, }}/>} label="Armed Force" />
                                <FormControlLabel value="seniorcitizen" control={<Radio sx={{ 
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 15,
                                    },
                                    color: "#99999a",
                                    '&.Mui-checked': {
                                    color: "#f59625",
                                    }, }}/>} label="Senior Citizen" />
                                <FormControlLabel value="student" control={<Radio sx={{ 
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 15,
                                    },
                                    color: "#99999a",
                                    '&.Mui-checked': {
                                    color: "#f59625",
                                    }, }}/>} label="Student" />
                            </RadioGroup>
                        </div>
                    </Box>


                    <Grid container className='booking_row' spacing={3}> 
                        <Grid item md={3} className="filter_col"> 
                            <Sidemenu />
                        </Grid>
                        <Grid item  md={9} className="booking_col">
                            <Typography className='bookingCol_title'>Flights from Chandigarh to Chennai, and back</Typography>

                            <Box component={'div'} className='mainBookingrow'>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography className='depart_place'> Departure <span className='interTextDot'>.</span> Indigo  </Typography>
                                        <Box component={'div'} className="flight_timerow">
                                            <Box className='time'>
                                                <div className='icons'>
                                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                </div>
                                                <Typography className='start_time timeText'>07:10  </Typography>
                                                <ArrowRightAlt className='miniArrow'/>
                                                <Typography className='end_time timeText'>08:10</Typography>
                                            </Box>
                                            <Box className='price'>
                                                ₹ 6,552
                                            </Box>
                                        </Box>
                                        <Typography className='details_text'> Flight Details </Typography>
                                    </Grid>
                                    <Grid item md={4} >
                                        <Typography className='retun_place'> Return <span className='interTextDot'>.</span> Indigo  </Typography>
                                        <Box component={'div'} className="flight_timerow">
                                            <Box className='time'>
                                                <div className='icons'>
                                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                </div>
                                                <Typography className='start_time timeText'>07:10 </Typography>
                                                <ArrowRightAlt className='miniArrow'/>
                                                <Typography className='end_time timeText'>08:10</Typography>
                                            </Box>
                                            <Box className='price'>
                                                ₹ 5,552
                                            </Box>
                                        </Box>
                                        <Typography className='details_text'> Flight Details </Typography>
                                    </Grid>
                                    <Grid item md={3} >
                                        <Typography className='total_price'>₹ 12,490</Typography>
                                        <Typography className='details_text'>Fare Details</Typography>
                                        <Button variant='contained' className='color_primary booknow_btn' onClick={() => navigatePage('booking')}>Book Now</Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* choose flight */}
                            { tripType == 'roundtrip' && (
                                <Box className='chooseFlightSect' >
                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                            <Box className='cardBox'>
                                                <Box style={{ padding : 10, borderBottomWidth : 1, borderColor : '#ccc', borderBottomStyle : 'solid' }}>
                                                    <Typography className='journerydate journey_start'  component={'div'}>
                                                        {'Chandigarh'} 
                                                        <ArrowRightAlt className='miniArrow dark'/>
                                                        {'Chennai '} {'Wed, 15 Jun'}
                                                    </Typography>
                                                    <Box component={'div'} className='tablehead'>
                                                        <Typography>Departure</Typography>
                                                        <Typography>Duration</Typography>
                                                        <Typography>Arrival</Typography>
                                                        <Typography>Price</Typography>
                                                        <Typography className='check'></Typography>
                                                    </Box>
                                                </Box>

                                                {/* flights */}
                                                {testArray && testArray.map((data, i) => (
                                                    <Box className='flightitem'>
                                                        <RadioGroup className="faretype_radio" 
                                                            value={flightGo}
                                                            onChange={changeFGo} >
                                                            <Box className='flight_brand'>
                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> {'Indigo'}
                                                            </Box>

                                                            <Box className='timeandDetails'>
                                                                <Box className='from'>
                                                                    <Typography className='timeText'>  {'07:10'} </Typography>
                                                                    <Typography className='place'> {'Chandigarh'} </Typography>
                                                                </Box>
                                                                <Box className='hours'>
                                                                    <Typography className='hourstext'>  {'3 h 20 m'} </Typography>
                                                                    <Typography className='placeType' style={{ textAlign : 'center' }}> {'Non Stop'} </Typography>
                                                                </Box>
                                                                <Box className='to'>
                                                                    <Typography className='timeText'>  {'07:10'} </Typography>
                                                                    <Typography className='place'> {'Chennai'} </Typography>
                                                                </Box>
                                                                <Box className='price'>
                                                                    <Typography className='priceText'>  {'₹ 5,552'} </Typography>
                                                                    <Typography className={`fdetails ${tabValue }`} onClick={() => tabValue == i ? TabChange('-1') : TabChange(i)}> {'Flight Details'} <KeyboardArrowDown className='down' /></Typography>
                                                                </Box>
                                                                <Box className='check'>
                                                                    <FormControlLabel value={'flight_go' + (i + 1)} control={<Radio sx={{ 
                                                                        '& .MuiSvgIcon-root': {
                                                                        fontSize: 20,
                                                                        },
                                                                        color: "#99999a",
                                                                        '&.Mui-checked': {
                                                                        color: "#f59625",
                                                                        }, }}/>}  />
                                                                </Box>
                                                            </Box>  
                                                        </RadioGroup>

                                                        { tabValue == i && (
                                                            <Box className='flight_detail_bot tab'>
                                                                <TabsUnstyled defaultValue={0}>
                                                                    <TabsListUnstyled className='tablistnav'>
                                                                        <TabUnstyled>Flight Details</TabUnstyled>
                                                                        <TabUnstyled>Fare</TabUnstyled>
                                                                        <TabUnstyled>Cancellation</TabUnstyled>
                                                                        <TabUnstyled>Rules</TabUnstyled>
                                                                    </TabsListUnstyled>
                                                                    <TabPanelUnstyled value={0}>
                                                                        <Box className='flightlist flightfrom'>
                                                                            <Box className='brand'>
                                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                                                            </Box>
                                                                            <Box className='time_place first'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                            <Box className='hours'>
                                                                                <Typography className='hrs' style={{fontSize : 12, fontWeight : '500'}}>4h 40m</Typography>
                                                                                <Typography style={{ fontSize : 10 }}>Duration</Typography>
                                                                            </Box>
                                                                            <Box className='time_place'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className='hrsnext_flight'> 2h 35m Layover </Box>
                                                                        <Box className='flightlist flightfrom'>
                                                                            <Box className='brand'>
                                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                                                            </Box>
                                                                            <Box className='time_place first'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                            <Box className='hours'>
                                                                                <Typography className='hrs' style={{fontSize : 12, fontWeight : '500'}}>4h 40m</Typography>
                                                                                <Typography style={{ fontSize : 10 }}>Duration</Typography>
                                                                            </Box>
                                                                            <Box className='time_place'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={1}>
                                                                        <table className='fareTable' border="1">
                                                                            <tr>
                                                                                <td>Base Fare (1 Adult)	</td>
                                                                                <td>₹7,250</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Taxes and Fees (1 Adult)</td>
                                                                                <td>₹1,462</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Total Fare (1 Adult)	</td>
                                                                                <td>₹8,712</td>
                                                                            </tr>
                                                                        </table>
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={2}>
                                                                        Cancellation
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={3}>
                                                                        Rules
                                                                    </TabPanelUnstyled>
                                                                </TabsUnstyled>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid>
                                        <Grid item md={6}>
                                            <Box className='cardBox'>
                                                <Box style={{ padding : 10, borderBottomWidth : 1, borderColor : '#ccc', borderBottomStyle : 'solid' }}>
                                                    <Typography className='journerydate journey_start' component={'div'}>
                                                        {'Chennai '}
                                                        <ArrowRightAlt className='miniArrow dark'/>
                                                        {'Chandigarh'} 
                                                        {'Wed, 15 Jun'}
                                                    </Typography>
                                                    <Box component={'div'} className='tablehead'>
                                                        <Typography>Departure</Typography>
                                                        <Typography>Duration</Typography>
                                                        <Typography>Arrival</Typography>
                                                        <Typography>Price</Typography>
                                                        <Typography className='check'></Typography>
                                                    </Box>
                                                </Box>

                                                {/* flights */}
                                                {testArray && testArray.map((data, i) => (
                                                    <Box className='flightitem'>
                                                        <RadioGroup  className="faretype_radio" 
                                                            value={flightReturn}
                                                            onChange={changeFReturn} >
                                                            <Box className='flight_brand'>
                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> {'Indigo'}
                                                            </Box>

                                                            <Box className='timeandDetails'>
                                                                <Box className='from'>
                                                                    <Typography className='timeText'>  {'07:10'} </Typography>
                                                                    <Typography className='place'> {'Chandigarh'} </Typography>
                                                                </Box>
                                                                <Box className='hours'>
                                                                    <Typography className='hourstext'>  {'3 h 20 m'} </Typography>
                                                                    <Typography className='placeType' style={{ textAlign : 'center' }}> {'Non Stop'} </Typography>
                                                                </Box>
                                                                <Box className='to'>
                                                                    <Typography className='timeText'>  {'07:10'} </Typography>
                                                                    <Typography className='place'> {'Chennai'} </Typography>
                                                                </Box>
                                                                <Box className='price'>
                                                                    <Typography className='priceText'>  {'₹ 5,552'} </Typography>
                                                                    <Typography className={`fdetails ${tabValue }`} onClick={() => tabValue == i ? TabChange('-1') : TabChange(i+10)}> {'Flight Details'} <KeyboardArrowDown className='down' /></Typography>
                                                                </Box>
                                                                <Box className='check'>
                                                                    <FormControlLabel value={'flight_return' + (i + 1)} control={<Radio sx={{ 
                                                                        '& .MuiSvgIcon-root': {
                                                                        fontSize: 20,
                                                                        },
                                                                        color: "#99999a",
                                                                        '&.Mui-checked': {
                                                                        color: "#f59625",
                                                                        }, }}/>}  />
                                                                </Box>
                                                            </Box>  
                                                            
                                                        </RadioGroup>

                                                        { tabValue == i+10 && (
                                                            <Box className='flight_detail_bot tab'>
                                                                <TabsUnstyled defaultValue={0}>
                                                                    <TabsListUnstyled className='tablistnav'>
                                                                        <TabUnstyled>Flight Details</TabUnstyled>
                                                                        <TabUnstyled>Fare</TabUnstyled>
                                                                        <TabUnstyled>Cancellation</TabUnstyled>
                                                                        <TabUnstyled>Rules</TabUnstyled>
                                                                    </TabsListUnstyled>
                                                                    <TabPanelUnstyled value={0}>
                                                                        <Box className='flightlist flightfrom'>
                                                                            <Box className='brand'>
                                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                                                            </Box>
                                                                            <Box className='time_place first'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                            <Box className='hours'>
                                                                                <Typography className='hrs' style={{fontSize : 12, fontWeight : '500'}}>4h 40m</Typography>
                                                                                <Typography style={{ fontSize : 10 }}>Duration</Typography>
                                                                            </Box>
                                                                            <Box className='time_place'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className='hrsnext_flight'> 2h 35m Layover </Box>
                                                                        <Box className='flightlist flightfrom'>
                                                                            <Box className='brand'>
                                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                                                            </Box>
                                                                            <Box className='time_place first'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                            <Box className='hours'>
                                                                                <Typography className='hrs' style={{fontSize : 12, fontWeight : '500'}}>4h 40m</Typography>
                                                                                <Typography style={{ fontSize : 10 }}>Duration</Typography>
                                                                            </Box>
                                                                            <Box className='time_place'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={1}>
                                                                        <table className='fareTable' border="1">
                                                                            <tr>
                                                                                <td>Base Fare (1 Adult)	</td>
                                                                                <td>₹7,250</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Taxes and Fees (1 Adult)</td>
                                                                                <td>₹1,462</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Total Fare (1 Adult)	</td>
                                                                                <td>₹8,712</td>
                                                                            </tr>
                                                                        </table>
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={2}>
                                                                        Cancellation
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={3}>
                                                                        Rules
                                                                    </TabPanelUnstyled>
                                                                </TabsUnstyled>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ) || (
                                <Box className='chooseFlightSect' >
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <Box className='cardBox'>
                                                <Box style={{ padding : 10, borderBottomWidth : 1, borderColor : '#ccc', borderBottomStyle : 'solid' }}>
                                                    <Typography className='journerydate journey_start'  component={'div'}>
                                                        {'Chandigarh'} 
                                                        <ArrowRightAlt className='miniArrow dark'/>
                                                        {'Chennai '} {'Wed, 15 Jun'}
                                                    </Typography>
                                                    <Box component={'div'} className='tablehead'>
                                                        <Typography>Departure</Typography>
                                                        <Typography>Duration</Typography>
                                                        <Typography>Arrival</Typography>
                                                        <Typography>Price</Typography>
                                                        <Typography className='check'></Typography>
                                                    </Box>
                                                </Box>

                                                {/* flights */}
                                                {testArray && testArray.map((data, i) => (
                                                    <Box className='flightitem'>
                                                        <RadioGroup className="faretype_radio" 
                                                            value={flightGo}
                                                            onChange={changeFGo} >
                                                            <Box className='flight_brand'>
                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> {'Indigo'}
                                                            </Box>

                                                            <Box className='timeandDetails'>
                                                                <Box className='from'>
                                                                    <Typography className='timeText'>  {'07:10'} </Typography>
                                                                    <Typography className='place'> {'Chandigarh'} </Typography>
                                                                </Box>
                                                                <Box className='hours'>
                                                                    <Typography className='hourstext'>  {'3 h 20 m'} </Typography>
                                                                    <Typography className='placeType' style={{ textAlign : 'center' }}> {'Non Stop'} </Typography>
                                                                </Box>
                                                                <Box className='to'>
                                                                    <Typography className='timeText'>  {'07:10'} </Typography>
                                                                    <Typography className='place'> {'Chennai'} </Typography>
                                                                </Box>
                                                                <Box className='price'>
                                                                    <Typography className='priceText'>  {'₹ 5,552'} </Typography>
                                                                    <Typography className={`fdetails ${tabValue }`} onClick={() => tabValue == i ? TabChange('-1') : TabChange(i)}> {'Flight Details'} <KeyboardArrowDown className='down' /></Typography>
                                                                </Box>
                                                                <Box className='check'>
                                                                    <FormControlLabel value={'flight_go' + (i + 1)} control={<Radio sx={{ 
                                                                        '& .MuiSvgIcon-root': {
                                                                        fontSize: 20,
                                                                        },
                                                                        color: "#99999a",
                                                                        '&.Mui-checked': {
                                                                        color: "#f59625",
                                                                        }, }}/>}  />
                                                                </Box>
                                                            </Box>  
                                                        </RadioGroup>

                                                        { tabValue == i && (
                                                            <Box className='flight_detail_bot tab'>
                                                                <TabsUnstyled defaultValue={0}>
                                                                    <TabsListUnstyled className='tablistnav'>
                                                                        <TabUnstyled>Flight Details</TabUnstyled>
                                                                        <TabUnstyled>Fare</TabUnstyled>
                                                                        <TabUnstyled>Cancellation</TabUnstyled>
                                                                        <TabUnstyled>Rules</TabUnstyled>
                                                                    </TabsListUnstyled>
                                                                    <TabPanelUnstyled value={0}>
                                                                        <Box className='flightlist flightfrom'>
                                                                            <Box className='brand'>
                                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                                                            </Box>
                                                                            <Box className='time_place first'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                            <Box className='hours'>
                                                                                <Typography className='hrs' style={{fontSize : 12, fontWeight : '500'}}>4h 40m</Typography>
                                                                                <Typography style={{ fontSize : 10 }}>Duration</Typography>
                                                                            </Box>
                                                                            <Box className='time_place'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className='hrsnext_flight'> 2h 35m Layover </Box>
                                                                        <Box className='flightlist flightfrom'>
                                                                            <Box className='brand'>
                                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'Indigo'}</Typography>
                                                                                <Typography style={{ fontSize : 10, fontWeight : '500' }}> {'IN-334'}</Typography>
                                                                            </Box>
                                                                            <Box className='time_place first'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                            <Box className='hours'>
                                                                                <Typography className='hrs' style={{fontSize : 12, fontWeight : '500'}}>4h 40m</Typography>
                                                                                <Typography style={{ fontSize : 10 }}>Duration</Typography>
                                                                            </Box>
                                                                            <Box className='time_place'>
                                                                                <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>4:00</Typography>
                                                                                <Typography>Netaji Subhash Chandra Bose International Airport</Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={1}>
                                                                        <table className='fareTable' border="1">
                                                                            <tr>
                                                                                <td>Base Fare (1 Adult)	</td>
                                                                                <td>₹7,250</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Taxes and Fees (1 Adult)</td>
                                                                                <td>₹1,462</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Total Fare (1 Adult)	</td>
                                                                                <td>₹8,712</td>
                                                                            </tr>
                                                                        </table>
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={2}>
                                                                        Cancellation
                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={3}>
                                                                        Rules
                                                                    </TabPanelUnstyled>
                                                                </TabsUnstyled>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Grid> 
                                    </Grid>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            {/* Footer */}
            <Footer type={2} style={{ backgrondColor : '#fff' }} />
        </Box>
      </div>
    </motion.div>
  )
}
