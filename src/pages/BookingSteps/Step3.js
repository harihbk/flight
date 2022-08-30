import React, { useEffect } from "react";
import { Container, InputLabel ,MenuItem ,Grid, Box, Typography, Button, ButtonGroup, Modal, FormGroup, FormControl, TextField, FormControlLabel, RadioGroup, Radio,Select, Checkbox } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { ReactComponent as CrossIcon } from '../../assets/flight/x.svg';
import { ReactComponent as SeatEmty } from '../../assets/flight/seat_empty.svg';
import { ReactComponent as CompleteIcon } from '../../assets/icons/tick.svg';


export default function Step3(props){
    const [hasGst, setHasGst] = React.useState('yes');
    const [updateSms, setUpdateSms] = React.useState(true);
    const [addonTab, setAddonTab] = React.useState();
    const [baggageInfo, setBaggageInfo] = React.useState(10);
    const [passenger, setPassenger] = React.useState();

    const changegstType = (event) => {
        setHasGst(event.target.value);
    };
    const changeUpdatesms = (event) => {
        setUpdateSms(event.target.checked);
    };


    const TabChange = (newValue) => {
        setAddonTab(newValue);
        console.log(newValue)
    };
    
    const changeBaggageInfo = (event) => {
        setBaggageInfo(event.target.value);
    };
    
    const { stepObj } = props;
    const { activeStatus } = props;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    useEffect(()=>{
        setPassenger(JSON.parse(window.localStorage.getItem('passangerdetail')));

        console.log(passenger);


    },[]);

    return(
        <div>
            <Box className="stepWrapper">
                <Box className="stepcontHeader">
                    <Typography className="stitle"> Review</Typography>
                </Box>

                <Box className="boxcont">
                    <Box className="form">
                    <Box className="passengers_list borderbox_item"  style={{ marginBottom : 30 }}>
                        <Box className="formtitle" style={{ display : 'flex' }}> 
                            <Box className="icon">
                                <img src={'https://cdn-icons-png.flaticon.com/512/615/615075.png'} alt="arrow" style={{ width: 26,marginRight : 10 }}/>
                            </Box> 
                            <Typography>Passenger Details</Typography>
                        </Box>
                        <Grid container className="tableheader" style={{ 'border-bottom' : '1px solid #ccc', paddingBottom : 10, marginBottom : 10 }}>
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

                        
                        { passenger?.adult && passenger?.adult.map((data, index) => (
                            <Grid container className="tablecontent" style={{ 'border-top' : index !== 0 ? '1px solid #ccc' : '0' , paddingBottom : 10, marginBottom : 10 }} key={index}>
                                <Grid item sx={{ maxWidth : 55, width : '100%'  }}>
                                    <Typography>{ index + 1 }</Typography>
                                </Grid>
                                <Grid item  sx={{ maxWidth : 200, width : '100%'  }}>
                                    <Typography sx={{ textTransform : 'capitalize' }}>{ data?.title } {' '} { data?.firstname + ' ' + data?.lastname }</Typography>
                                    <Typography sx={{ color : '#9b9b9b' }}>{ data?.passportinfo?.dob }20/20/2020</Typography>
                                </Grid>
                                <Grid item sx={{ maxWidth : 180, width : '100%'  }}>
                                    <Typography>{data?.passportinfo?.nationality} India</Typography>
                                    <Typography>{data?.passportinfo?.passportno} Euhh9099</Typography>
                                </Grid>
                                <Grid item sx={{ maxWidth : 130, width : '100%'  }}>
                                    <Typography>NA</Typography>
                                </Grid>
                                <Grid item sx={{ maxWidth : 160, width : '100%'  }}>
                                    <Typography>NA</Typography>
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