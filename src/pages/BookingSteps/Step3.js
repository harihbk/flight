import React, { useEffect, useContext } from "react";
import { Container,Divider, InputLabel ,MenuItem ,Grid, Box, Typography, Button, ButtonGroup, Modal, FormGroup, FormControl, TextField, FormControlLabel, RadioGroup, Radio,Select, Checkbox } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { ReactComponent as CrossIcon } from '../../assets/flight/x.svg';
import { ReactComponent as SeatEmty } from '../../assets/flight/seat_empty.svg';
import { ReactComponent as CompleteIcon } from '../../assets/icons/tick.svg';
import TripinfoContext from "./context";
import  helper  from "../Search/calculation";
import moment from 'moment';
import helpers from '../Search/calculation';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LuggageIcon from '@mui/icons-material/Luggage';


export default function Step3(props){
    const [hasGst, setHasGst] = React.useState('yes');
    const [updateSms, setUpdateSms] = React.useState(true);
    const [addonTab, setAddonTab] = React.useState();
    const [baggageInfo, setBaggageInfo] = React.useState(10);
    const [passenger, setPassenger] = React.useState();
    const [passengerList, setPassengerList] = React.useState();
    const [journeyDetail, setJourneyDetail] = React.useState();
    const things = React.useContext(TripinfoContext);
    const [data , setData ] = React.useState(things?.tripInfos);
    const [totalPriceInfo , setTotalPriceInfo] = React.useState(things?.totalPriceInfo);

    console.log(things);

    const changegstType = (event) => {
        setHasGst(event.target.value);
    };
    const changeUpdatesms = (event) => {
        setUpdateSms(event.target.checked);
    };


    const TabChange = (newValue) => {
        setAddonTab(newValue);
    };
    
    const changeBaggageInfo = (event) => {
        setBaggageInfo(event.target.value);
    };
    
    const { stepObj } = props;
    const { activeStatus } = props;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    useEffect(()=>{

        var getfromlocalpassangers = JSON.parse(window.localStorage.getItem('passangerdetail'));
        var getLocalFD = JSON.parse(window.localStorage.getItem('updateCurrflightdetial'));
        
        setPassenger(getfromlocalpassangers);
        setJourneyDetail(getLocalFD);
        console.log(getfromlocalpassangers);
        
        var newvar = [...getfromlocalpassangers?.adult ,  ...getfromlocalpassangers?.child || [], ...getfromlocalpassangers?.infant || []];

        console.log(newvar);

        var fddetails = []
         for (const key in getLocalFD) {
             for (const key1 in getLocalFD[key]) {
                 for (const key2 in getLocalFD[key][key1]) {
                    getLocalFD[key][key1][key2].keyid = key1
                    fddetails.push(getLocalFD[key][key1][key2] || [])  
                 }
             }
            
         }
         console.log(fddetails);

      //  let keys = Object.keys(lc).filter(a=> (a == 'adult' ||a == 'child' || a == 'infant' ) )
    
var fd
        let filterdata = newvar.map((data, index) => {
         //   console.log(data);
            let _keys = data.label.toUpperCase();
             let kky = data.label
              fd = fddetails.filter(a=>a.label == kky)
           // console.log(fd);
            // if(fd){
                let from = fd.filter(a=>(!a.deparr?.isRs))
                let to = fd.filter(a=>(a.deparr?.isRs))
                var ff = ""
                
                    for (const key in from) {
                        if(from[key]?.deparr){
                            ff +=  `${from[key].deparr?.da?.code}-${from[key].deparr?.aa?.code}->${from[key].seat},`

                        }
                     }
        
                     var tt = ""
                     for (const key in to) {
                        if(to[key]?.deparr){
                        tt +=  `${to[key].deparr?.da?.code}-${to[key].deparr?.aa?.code}->${to[key].seat},`
                        }
                     }
                     data.fd_from = ff
                     data.fd_to = tt
                     data.fdetails = fd.map(e=>({ code : e.seat , key : e.keyid }))
                     
              
           
            
            

            //console.log(data.label);
           let bbg = getfromlocalpassangers?.baggagemeals.filter(a => a.valuelabel == _keys);
            let bagageVal = bbg;
            data.baggage = bbg.filter(ee=>  ee.baggagevalue ).map(e=>({code  : e.baggagevalue , key : e.id })  )
            data.meals = bbg.filter(ee=>  ee.mealsvalue ).map(e=>({code  : e.mealsvalue , key : e.id }  ))

          //  data.meals = bbg.map(e=>({code  : e.mealsvalue, id : e.id }))
            data.bagageVal = bagageVal;
           
            
            return data

        });

        setPassengerList(filterdata); 
        localStorage.setItem("allitems",JSON.stringify(filterdata))
        console.log(filterdata);
    },[]);

    return(
        <div>
            <Box className="stepWrapper">
                <Box className="stepcontHeader">
                    <Typography className="stitle"> Review</Typography>
                </Box>

                <Box className="boxcont">
                    <Box className="form">
                        <Box class="journey_wrapper_review flightlist_item borderbox_item" style={{ marginBottom : 30, borderStyle : 'dashed' }}>
                            
                        { data.length > 0 && 
                           data?.map((a,i) =>  (

                               <>

                                <Typography className="journey_review">
                                    {a?.sI[0]?.isRs ? <FlightTakeoffIcon /> : <FlightLandIcon /> } { a?.sI[0]?.da?.city } - { a?.sI[a?.sI?.length - 1]?.aa?.city } on { moment(a?.sI[0]?.dt).format("ddd, MMM Do YYYY ") } </Typography>

                               { a?.sI.map((b,ii)=>(
                                    <>

                                        <Box className='journeydetail bottom' style={{ display : 'flex', columnGap : 10, marginTop : 20, marginBottom : 17, justifyContent: 'space-between' }}>
                                            <Box className='leftcol' style={{ display : 'flex', columnGap : 10, justifyContent : 'space-between', width : '78%' }}>
                                                <Box className='brand' style={{ width : 60 }}>
                                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight'  style={{ width : 30 }}/>
                                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> {b?.fD.aI?.name}</Typography>
                                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> {b?.fD.aI?.code}-{b?.fD?.fN}</Typography>
                                                </Box>
                                                <Box className='time_place first'>
                                                    <Typography className='time1' >{ moment(b?.dt).format("MMM Do,ddd, HH:mm") }</Typography>
                                                    {/* <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>ND 20:40</Typography> */}
                                                    <Typography className='jplace_text'>{ b?.da?.city },{b?.da?.country}</Typography>

                                                    <Typography className='jplace_text'>{ b?.da?.name }</Typography>
                                                </Box>


                                                <Box className='hours'>
                                                    <Typography className='hrs hours_border' style={{fontSize : 18, fontWeight : '600'}}>{ helper.converttimefrmt(b?.duration) }</Typography>
                                                    <Typography style={{ fontSize : 10 }}>{'Flight Duration'}</Typography>
                                                </Box>


                                                <Box className='time_place'>
                                                    <Typography className='time1'  >{ moment(b?.at).format("MMM Do,ddd, HH:mm") }</Typography>
                                                    {/* <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>MAS 4:00</Typography> */}
                                                    <Typography className='jplace_text'>{ b?.aa?.city },{b?.aa?.country}</Typography>
                                                    <Typography className='jplace_text'>{ b?.aa?.name }</Typography>
                                                </Box>
                                            </Box>
                                            <Box className='checkin_col' style={{ display : 'flex', columnGap : 10, justifyContent: 'space-between', width : '22%' }}>
                                                <Box className='checkin'>
                                                    <Typography className='title' style={{fontSize : 12, fontWeight : '300' }}>Check-in</Typography>
                                                    <Typography style={{fontSize : 10,  fontWeight : '200'}}>15 kgs{'\n'} {'\n'}  {'(1 peace only)'}</Typography>
                                                </Box>
                                                <Box className='checkin checkout'>
                                                    <Typography className='title' style={{fontSize : 12, fontWeight : '300' }}>Check-out</Typography>
                                                    <Typography style={{fontSize : 10,  fontWeight : '200'}}>7 kgs{'\n'}  {'(1 peace only)'}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        { ( a?.sI.length > 1  && ii != a?.sI.length-1 ) && 
                                            <Typography style={{ textAlign : 'center'}}>Required to change flight Layover Time-{ helpers.twodatetimediff(b?.at , a?.sI[ii+1]?.dt) }</Typography>
                                         }

                                    </>
                               ))
                               
                              

                               }
                              
                            { (i != data.length - 1) && <Divider  style={{ margin: 8, marginBottom : 17}}/>  }
                              
                               </>
                               
                           ))
                        
                        }

                        </Box>
                        <Box className="passengers_list borderbox_item"  style={{ marginBottom : 30 }}>
                            <Box className="formtitle" style={{ display : 'flex' }}> 
                                <Box className="icon">
                                    <img src={'https://cdn-icons-png.flaticon.com/512/615/615075.png'} alt="arrow" style={{ width: 26,marginRight : 10 }}/>
                                </Box> 
                                <Typography>Passenger Details</Typography>
                            </Box>
                            <Grid container className="tableheader" style={{ 'border-bottom' : '1px solid #ccc', paddingBottom : 10, marginBottom : 5 }}>
                                <Grid item sx={{ maxWidth : 55, width : '100%' }}>
                                    <Typography>S.no</Typography>
                                </Grid>
                                <Grid item  sx={{ maxWidth : 200, width : '100%'  }}>
                                    <Typography>Name </Typography>
                                </Grid>
                                <Grid item sx={{ maxWidth : 180, width : '100%'  }}>
                                    <Typography>Nationality & Passport</Typography>
                                </Grid>
                                <Grid item sx={{ maxWidth : 130, width : '100%'  }}>
                                    <Typography>Seat Booking</Typography>
                                </Grid>
                                <Grid item sx={{ maxWidth : 160, width : '100%'  }}>
                                    <Typography>Baggage & Meals</Typography>
                                </Grid>
                            </Grid>

                            
                            { passengerList && passengerList.map((data, index) => (

                                <Grid container className="tablecontent" style={{ 'border-top' : index !== 0 ? '1px solid #ccc' : '0' , paddingTop : 10, marginBottom : 10 }} key={index}>
                                    <Grid item sx={{ maxWidth : 55, width : '100%'  }}>
                                        <Typography>{ index + 1 }</Typography>
                                    </Grid>
                                    <Grid item  sx={{ maxWidth : 200, width : '100%'  }}>
                                        <Typography sx={{ textTransform : 'capitalize' }}>{ data?.title } {' '} { data?.firstname + ' ' + data?.lastname }</Typography>
                                        <Typography sx={{ color : '#9b9b9b' }}><span style={{ color : '#636363' }}>{'DOB: '}</span>{ moment(data?.passportinfo?.dob).format("DD/MM/yyyy") }</Typography>
                                    </Grid>
                                    <Grid item sx={{ maxWidth : 180, width : '100%'  }}>
                                        <Typography>{data?.passportinfo?.nationality} </Typography>
                                        <Typography>{data?.passportinfo?.passportno} </Typography>
                                    </Grid>
                                    <Grid item sx={{ maxWidth : 130, width : '100%'  }}>
                                        <Typography>From :  { data?.fd_from }</Typography>
                                        <Typography>To : { data?.fd_to }</Typography>
                                    </Grid>

                                    {/* baggage and meals */}
                                    <Grid item sx={{ maxWidth : 160, width : '100%'  }}>
                                        <Box className="bag_meal" >
                                            <Box className="baggage">
                                                <Typography style={{ display : 'flex', alignItems : 'center', columnGap : 3 }}><LuggageIcon style={{ width: 14 }}/> Baggage </Typography>
                                                { data?.bagageVal.length > 0  && data?.bagageVal.map((bag, i) =>(
                                                    <>
                                                        <Typography variant="span" component={'span'}>{ !bag?.isreturn ? 'From: ' : " To: " }</Typography>
                                                        <Typography variant="span" component={'span'} style={{ fontWeight : '500' }}>{ bag?.baggagevalue }</Typography>
                                                    </>
                                                )) }
                                            </Box>
                                            <Typography style={{ display : 'flex', alignItems : 'center', columnGap : 3 }}><LunchDiningIcon style={{ width: 14 }}/> Meals </Typography>
                                            { data?.bagageVal.length > 0 && data?.bagageVal.map((bag, i) =>(
                                                <>
                                                    <Typography variant="span" component={'span'}>{ !bag?.isreturn ? 'From: ' : " To: " }</Typography>
                                                    <Typography variant="span" component={'span'} style={{ fontWeight : '500' }}>{ bag?.mealsvalue }</Typography>
                                                </>
                                            )) }
                                        </Box>
                                    </Grid>
                                </Grid>
                            ))}
                        </Box>

                        

                        <Box className="form_item borderbox_item contact" style={{ marginBottom : 30 }}>
                            <Box className="formtitle" sx={{ marginBottom : 1,display : 'flex'  }}> 
                                <Box className="icon" >
                                    <img src={'https://cdn-icons-png.flaticon.com/512/3095/3095583.png'} alt="arrow" style={{ width: 26,marginRight : 10 }}/>
                                </Box> <Typography>Contact Details</Typography>
                            </Box>

                            <Box className="contact_details">
                                <Box>
                                    <Typography variant="span">Mobile : </Typography>
                                    <Typography variant="span" style={{ fontSize : 14, fontWeight : '500', color : '#000' }}>{ passenger?.mobile } </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="span">Email : </Typography>
                                    <Typography variant="span"  style={{ fontSize : 14, fontWeight : '500', color : '#000' }}>{ passenger?.email } </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box className="form_item borderbox_item gstno" style={{ marginBottom : 20 }}>
                            <Box className="formtitle" style={{ display : 'flex' }}>
                                <Box className="icon" >
                                    <img src={'https://cdn-icons-png.flaticon.com/512/2168/2168671.png'} alt="arrow" style={{ width: 26,marginRight : 10 }}/>
                                </Box> 
                                <Typography sx={{ display : 'flex', alignItems : 'center', columnGap : 1 }}>I have a GST number (optional) 
                                    
                                </Typography>
                            </Box>

                            <FormGroup className="formcontents">
                                <Grid container spacing={2} >
                                    <Grid item md={4} >
                                        <Typography>Company Name</Typography>
                                    </Grid>
                                    <Grid item md={4} >
                                        <Typography>GST Number</Typography>
                                    </Grid>
                                </Grid>
                            </FormGroup>    
                        </Box>



                            {/* <Box className="update_status" sx={{ display : 'flex', alignItems : 'center', columnGap : 1, marginTop : 2 }}>
                                <Checkbox 
                                    color="success"
                                    sx={{ padding : 0 }}
                                    checked={updateSms}
                                    onChange={changeUpdatesms} icon={<CircleOutlinedIcon />} checkedIcon={<CheckCircleIcon />}  />
                                    <Typography style={{ fontSize : 11 }}>Update me Order Status, Exclusive Offers via SMS, Whatsapp and Email.</Typography>
                            </Box> */}
                    </Box>
                </Box>

                <Box className="addonTab_wrapper" style={{ marginTop : 2, display : 'none' }}>
                    <Box className="flight_addon_tab">
                        <TabsUnstyled defaultValue={0} >
                            <TabsListUnstyled className='tablistnav'>
                                <TabUnstyled>Add Baggage</TabUnstyled>
                                <TabUnstyled>Meals</TabUnstyled>
                                <TabUnstyled>Seats</TabUnstyled>
                            </TabsListUnstyled>
                            <TabPanelUnstyled value={0} >
                                <Grid container alignItems={'center'}>
                                    <Grid item sx={{ paddingX : 2 }}>
                                        <Typography>{'1'} Adult</Typography>
                                    </Grid>
                                    <Grid item md={3}>
                                        <Box className="location_badge">
                                            <Typography>New Delhi</Typography>
                                            <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                            <Typography>Chennai</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sx={{ paddingX : 3 }}>
                                        <Typography className="date">{'Wed Jun 01 2022'}</Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <FormControl sx={{ width: '100%' }}> 
                                        <InputLabel id="baggage-label">Baggage Information</InputLabel>
                                            <Select
                                                size="small"
                                                labelId="demo-simple-select-helper-label"
                                                id="baggage-label-helper"
                                                value={baggageInfo}
                                                label="Baggage Information"
                                                onChange={changeBaggageInfo} >

                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>10Kg @ 1,807</MenuItem>
                                                <MenuItem value={20}>15Kg @ 1,807</MenuItem>
                                                <MenuItem value={30}>20Kg @ 1,807</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container alignItems={'center'} sx={{ marginTop: 3}}>
                                    <Grid item sx={{ paddingX : 2 }}>
                                        <Typography>{'1'} Adult</Typography>
                                    </Grid>
                                    <Grid item md={3}>
                                        <Box className="location_badge">
                                            <Typography>New Delhi</Typography>
                                            <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                            <Typography>Chennai</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item sx={{ paddingX : 3 }}>
                                        <Typography className="date">{'Wed Jun 01 2022'}</Typography>
                                    </Grid>
                                    <Grid item md={4}>
                                        <FormControl sx={{ width: '100%' }}> 
                                        <InputLabel id="baggage-label">Baggage Information</InputLabel>
                                            <Select
                                                size="small"
                                                labelId="demo-simple-select-helper-label"
                                                id="baggage-label-helper"
                                                value={baggageInfo}
                                                label="Baggage Information"
                                                onChange={changeBaggageInfo} >

                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>10Kg @ 1,807</MenuItem>
                                                <MenuItem value={20}>15Kg @ 1,807</MenuItem>
                                                <MenuItem value={30}>20Kg @ 1,807</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </TabPanelUnstyled>
                            <TabPanelUnstyled value={1}>
                                <Box className="wrapper meals_wrapper">
                                    <TabsUnstyled defaultValue={0} orientation="vertical" className="mealstab">
                                        <Grid container justifyContent={'space-between'}> 
                                            <Grid item style={{ maxWidth : 240 }}>
                                                <TabsListUnstyled className='tablistnav noborder'>
                                                    <TabUnstyled>
                                                        <Typography style={{ fontSize : 13 }}>Adult</Typography>
                                                        <Typography className="place_text" style={{ fontWeight : '300' }}>{'New Delhi'}
                                                        <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                                        {'Chennai'}</Typography>
                                                        <Typography style={{ fontSize : 11, opacity : .7 }} className="date_text small">{'Fri Jun 05 2022'}</Typography>
                                                    </TabUnstyled>
                                                    <TabUnstyled>
                                                        <Typography style={{ fontSize : 13 }}>Adult</Typography>
                                                        <Typography className="place_text" style={{ fontWeight : '300' }}>{'New Delhi'}
                                                        <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                                        {'Chennai'}</Typography>
                                                        <Typography style={{ fontSize : 11, opacity : .7 }} className="date_text small">{'Fri Jun 05 2022'}</Typography>
                                                    </TabUnstyled>
                                                </TabsListUnstyled>
                                            </Grid>
                                            <Grid item md={8}>
                                                <TabPanelUnstyled value={0}>
                                                    <Box className="foodlist">
                                                        <Box className="fooditem">
                                                            <Box className="thumbnail">
                                                                <img src={require('../../assets/food/cookie.png')} alt="food" />
                                                            </Box>
                                                            <Typography className="foofname">UNIBIC CHOCOLATE CHIPS COOKIES 50 GMS</Typography>
                                                            <Typography className="fprice" >₹ {'175'}</Typography>
                                                            <Box className="quantity"
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    '& > *': {
                                                                    m: 1,
                                                                    },
                                                                }} >
                                                                <ButtonGroup size="small" aria-label="small button group" className={'qtygroup'}>
                                                                     <Button key="increment">+</Button>
                                                                    <TextField size="small"></TextField>
                                                                    <Button key="decrement">-</Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                        <Box className="fooditem" style={{ marginTop : 2 }}>
                                                            <Box className="thumbnail">
                                                                <img src={require('../../assets/food/cookie.png')} alt="food" />
                                                            </Box>
                                                            <Typography className="foofname">UNIBIC CHOCOLATE CHIPS COOKIES 50 GMS</Typography>
                                                            <Typography className="fprice" >₹ {'175'}</Typography>
                                                            <Box className="quantity"
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    '& > *': {
                                                                    m: 1,
                                                                    },
                                                                }} >
                                                                <ButtonGroup size="small" aria-label="small button group" className={'qtygroup'}>
                                                                     <Button key="increment">+</Button>
                                                                    <TextField size="small"></TextField>
                                                                    <Button key="decrement">-</Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                        <Box className="fooditem" style={{ marginTop : 2 }}>
                                                            <Box className="thumbnail">
                                                                <img src={require('../../assets/food/cookie.png')} alt="food" />
                                                            </Box>
                                                            <Typography className="foofname">UNIBIC CHOCOLATE CHIPS COOKIES 50 GMS</Typography>
                                                            <Typography className="fprice" >₹ {'175'}</Typography>
                                                            <Box className="quantity"
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    '& > *': {
                                                                    m: 1,
                                                                    },
                                                                }} >
                                                                <ButtonGroup size="small" aria-label="small button group" className={'qtygroup'}>
                                                                     <Button key="increment">+</Button>
                                                                    <TextField size="small"></TextField>
                                                                    <Button key="decrement">-</Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </TabPanelUnstyled>
                                                <TabPanelUnstyled value={1}>
                                                    <Box className="foodlist">
                                                        <Box className="fooditem">
                                                            <Box className="thumbnail">
                                                                <img src={require('../../assets/food/cookie.png')} alt="food" />
                                                            </Box>
                                                            <Typography className="foofname">UNIBIC CHOCOLATE CHIPS COOKIES 50 GMS</Typography>
                                                            <Typography className="fprice" >₹ {'175'}</Typography>
                                                            <Box className="quantity"
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    '& > *': {
                                                                    m: 1,
                                                                    },
                                                                }} >
                                                                <ButtonGroup size="small" aria-label="small button group" className={'qtygroup'}>
                                                                     <Button key="increment">+</Button>
                                                                    <TextField size="small"></TextField>
                                                                    <Button key="decrement">-</Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                        <Box className="fooditem" style={{ marginTop : 2 }}>
                                                            <Box className="thumbnail">
                                                                <img src={require('../../assets/food/cookie.png')} alt="food" />
                                                            </Box>
                                                            <Typography className="foofname">UNIBIC CHOCOLATE CHIPS COOKIES 50 GMS</Typography>
                                                            <Typography className="fprice" >₹ {'175'}</Typography>
                                                            <Box className="quantity"
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    '& > *': {
                                                                    m: 1,
                                                                    },
                                                                }} >
                                                                <ButtonGroup size="small" aria-label="small button group" className={'qtygroup'}>
                                                                     <Button key="increment">+</Button>
                                                                    <TextField size="small"></TextField>
                                                                    <Button key="decrement">-</Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                        <Box className="fooditem" style={{ marginTop : 2 }}>
                                                            <Box className="thumbnail">
                                                                <img src={require('../../assets/food/cookie.png')} alt="food" />
                                                            </Box>
                                                            <Typography className="foofname">UNIBIC CHOCOLATE CHIPS COOKIES 50 GMS</Typography>
                                                            <Typography className="fprice" >₹ {'175'}</Typography>
                                                            <Box className="quantity"
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    '& > *': {
                                                                    m: 1,
                                                                    },
                                                                }} >
                                                                <ButtonGroup size="small" aria-label="small button group" className={'qtygroup'}>
                                                                    <Button key="increment">+</Button>
                                                                    <FormControl  >
                                                                        <TextField size="small" ></TextField>
                                                                    </FormControl>
                                                                    <Button key="decrement">-</Button>
                                                                </ButtonGroup>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </TabPanelUnstyled>
                                            </Grid>
                                        </Grid>
                                    </TabsUnstyled>
                                </Box>
                            </TabPanelUnstyled>
                            <TabPanelUnstyled value={2}>
                                <Box className="wrapper seats_wrapper">
                                    <TabsUnstyled defaultValue={0} orientation="vertical" className="mealstab">
                                        <Grid container> 
                                            <Grid item style={{ maxWidth : 240 }}>
                                                <TabsListUnstyled className='tablistnav noborder'>
                                                    <TabUnstyled>
                                                        <Typography style={{ fontSize : 13 }}>Adult</Typography>
                                                        <Typography className="place_text" style={{ fontWeight : '300' }}>{'New Delhi'}
                                                        <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                                        {'Chennai'}</Typography>
                                                        <Typography style={{ fontSize : 11, opacity : .7 }} className="date_text small">{'Fri Jun 05 2022'}</Typography>
                                                    </TabUnstyled>
                                                    <TabUnstyled>
                                                        <Typography style={{ fontSize : 13 }}>Adult</Typography>
                                                        <Typography className="place_text" style={{ fontWeight : '300' }}>{'New Delhi'}
                                                        <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                                        {'Chennai'}</Typography>
                                                        <Typography style={{ fontSize : 11, opacity : .7 }} className="date_text small">{'Fri Jun 05 2022'}</Typography>
                                                    </TabUnstyled>
                                                </TabsListUnstyled>

                                                <Box className="seatsinfo">
                                                    <Typography className="title">Adult {1}</Typography>
                                                    <Box className="hint price_low">
                                                        <Box className="icon"></Box> <Typography component={'span'}>600</Typography>
                                                    </Box>
                                                    <Box className="hint price_med">
                                                        <Box className="icon"></Box> <Typography component={'span'}>1144</Typography>
                                                    </Box>
                                                    <Box className="hint price_high">
                                                        <Box className="icon"></Box> <Typography component={'span'}>1907</Typography>
                                                    </Box>
                                                    <Box className="hint booked">
                                                        <Box className="icon">
                                                            <CrossIcon />
                                                        </Box> <Typography component={'span'}>Occupied</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item md={8}>
                                                <TabPanelUnstyled value={0}>
                                                    <Box className="seatsbox" sx={{ display : 'flex', width : 'fit-content', marginLeft : 'auto' }}> 
                                                        <div className="seats_row">
                                                            <Typography className="flight_seat_title">Front</Typography>
                                                            {Array.apply(0, Array(15)).map(function (x, i) {
                                                                return  <Grid container>
                                                                            <Grid item className="seatno">
                                                                                {i+1}
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Checkbox className="seatselect" {...label}  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} icon={<SeatEmty />} checkedIcon={<CompleteIcon className="complete_icon"/>}  /> 
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Checkbox {...label}  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} icon={<SeatEmty />} checkedIcon={<CompleteIcon className="complete_icon"/>}  /> 
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Checkbox {...label}  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} icon={<SeatEmty />} checkedIcon={<CompleteIcon className="complete_icon"/>}  /> 
                                                                            </Grid>
                                                                            <Grid item className="empty"></Grid>
                                                                            <Grid item>
                                                                                <Checkbox {...label}  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} icon={<SeatEmty />} checkedIcon={<CompleteIcon className="complete_icon"/>}  /> 
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Checkbox {...label} disabled sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} icon={<CrossIcon />} checkedIcon={<CompleteIcon className="complete_icon"/>}  /> 
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Checkbox {...label}  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }} icon={<SeatEmty />} checkedIcon={<CompleteIcon className="complete_icon"/>}  /> 
                                                                            </Grid>
                                                                            <Grid item className="seatno">
                                                                                {i+1}
                                                                            </Grid>
                                                                        </Grid>                                               
                                                            })}
                                                        </div>
                                                    </Box>
                                                </TabPanelUnstyled>
                                                <TabPanelUnstyled value={1}>
                                                    
                                                </TabPanelUnstyled>
                                            </Grid>
                                        </Grid>
                                    </TabsUnstyled>
                                </Box>
                            </TabPanelUnstyled>
                        </TabsUnstyled>                        
                    </Box>
                </Box>

            </Box>
        </div>
    )
}