import React from "react";
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
    console.log(activeStatus);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    return(
        <div>
            <Box className="stepWrapper">
                <Box className="stepcontHeader">
                    <Typography className="stitle">3</Typography>
                </Box>

                <Box className="boxcont">
                    <Box className="form">
                        <Box className="form_item">
                            <Box className="formtitle" sx={{ marginBottom : 2 }}> 
                                <Box className="icon"></Box> <Typography>Adult {'1'}</Typography>
                            </Box>
                            <FormGroup>
                                <Grid container spacing={2} >
                                    <Grid item md={4} sx={{ display : 'flex', columnGap : 2 }}>
                                        <FormControl className="width80" style={{ width : 100 }}>
                                            <TextField id="nametitle" value={'Mr'} label="Title" variant="outlined"  sx={{
                                                width : 80 ,
                                                '& .MuiOutlinedInput-root': {
                                                    'fieldset' :{
                                                    borderColor: '#a9a9a9',
                                                    fontSize : 10
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                    borderColor: '#21325d',
                                                },
                                                },
                                                '& label.Mui-focused': {
                                                    color: '#21325d',
                                                },
                                            }} size="small"/>
                                        </FormControl>
                                        <FormControl>
                                            <TextField id="fname" value={''} label="First Name" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4}>
                                        <FormControl>
                                            <TextField id="lname" value={''} label="Last Name" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4}>
                                        <FormControl>
                                            <TextField id="fname" value={''} label="Mobile Number" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                </Grid>


                                <Grid container spacing={2} >
                                    <Grid item md={4} >
                                        <FormControl sx={{ marginTop : 2 }}>
                                            <TextField id="email" value={''} label="Email Address" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </FormGroup>    
                        </Box>


                        <Box className="form_item" style={{ marginTop : 20 }}>
                            <Box className="formtitle">
                                <Box className="icon"></Box> 
                                <Typography sx={{ display : 'flex', alignItems : 'center', columnGap : 1 }}>I have a GST number (optional) 
                                    <RadioGroup row className="faretype_radio" 
                                        value={hasGst}
                                        onChange={changegstType} >
                                    <FormControlLabel value="yes" control={<Radio sx={{ 
                                        '& .MuiSvgIcon-root': {
                                        fontSize: 15,
                                        },
                                        color: "#99999a",
                                        '&.Mui-checked': {
                                        color: "#f59625",
                                        }, }}/>} />
                                    </RadioGroup>
                                </Typography>
                            </Box>

                            <FormGroup>
                                <Grid container spacing={2} >
                                    <Grid item md={4} >
                                        <FormControl >
                                            <TextField id="email" value={''} label="Company Name" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4} >
                                        <FormControl >
                                            <TextField id="email" value={''} label="Registration No" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </FormGroup>    
                        </Box>


                        <Box className="form_item" style={{ marginTop : 20 }}>
                            <Box className="formtitle">
                                <Box className="icon"></Box> 
                                <Typography sx={{ display : 'flex', alignItems : 'center', columnGap : 1 }}>Passport Details</Typography>
                            </Box>

                            <FormGroup>
                                <Grid container spacing={2} >
                                    <Grid item md={2} >
                                        <FormControl >
                                            <TextField id="normality" value={''} label="Normality" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={4} >
                                        <FormControl >
                                            <TextField id="passportno" value={''} label="Passport Number" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={2} >
                                        <FormControl >
                                            <TextField id="issuedate" value={''} label="Issue Date" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={2} >
                                        <FormControl >
                                            <TextField id="issuedate" value={''} label="Expiry Date" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={2} >
                                        <FormControl >
                                            <TextField id="dob" value={''} label="DOB" variant="outlined" sx={{
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
                                            }} size="small"/>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </FormGroup>    
                        </Box>

                        <Box className="update_status" sx={{ display : 'flex', alignItems : 'center', columnGap : 1, marginTop : 2 }}>
                            <Checkbox 
                                color="success"
                                sx={{ padding : 0 }}
                                checked={updateSms}
                                onChange={changeUpdatesms} icon={<CircleOutlinedIcon />} checkedIcon={<CheckCircleIcon />}  />
                                <Typography style={{ fontSize : 11 }}>Update me Order Status, Exclusive Offers via SMS, Whatsapp and Email.</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className="addonTab_wrapper" style={{ marginTop : 2 }}>
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