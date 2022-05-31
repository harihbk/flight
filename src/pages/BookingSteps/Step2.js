import React, { useEffect } from "react";
import { Container, InputLabel ,MenuItem ,Grid, Box, Typography, Button, ButtonGroup, Modal, FormGroup, FormControl, TextField, FormControlLabel, RadioGroup, Radio,Select, Checkbox } from '@mui/material';
import { List, ListItem } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { ReactComponent as CrossIcon } from '../../assets/flight/x.svg';
import { ReactComponent as SeatEmty } from '../../assets/flight/seat_empty.svg';
import { ArrowRightAlt } from '@mui/icons-material';
import { ReactComponent as CompleteIcon } from '../../assets/icons/tick.svg';


export default function Step2(props){
    const [hasGst, setHasGst] = React.useState('yes');
    const [updateSms, setUpdateSms] = React.useState(true);
    const [addonTab, setAddonTab] = React.useState();
    const [baggageInfo, setBaggageInfo] = React.useState(10);
    const [openPage3, setOpenPage3] = React.useState(false);
    const [promocard, setpromocard] = React.useState('promo1');

    const { stepObj } = props;
    const { activestatus } = props;
    console.log(activestatus);

    const changegstType = (event) => {
        setHasGst(event.target.value);
    };
    const changeUpdatesms = (event) => {
        setUpdateSms(event.target.checked);
    };

    const changepromo = (event) => {
        setpromocard(event.target.value);
    }

    const TabChange = (newValue) => {
        setAddonTab(newValue);
        console.log(newValue)
    };
    
    const changeBaggageInfo = (event) => {
        setBaggageInfo(event.target.value);
    };

    const handleClosePage3 = () => {
        setOpenPage3(false);
    }
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() =>{
        if(activestatus == 2){
            setOpenPage3(true)
        }
    },[]);

    const flexGap2 = {
        display : 'flex',
        alignItems : 'center',
        columnGap : 2
    }

    const timetext1 = {
        fontSize : 17,
        fontWeight : 500
    }

    const promocardHeader = {
        display : 'flex', 
        alignItems : 'center', 
        justifyContent : 'space-between', 
        backgroundColor : '#d9f4fd', 
        padding : 6,
        paddingLeft : 15,
        paddingRight : 15,
        'border-bottom' : '1px solid #ccc'
    }

    const promoCard = {
        borderColor : '#ccc',
        borderWidth : 1,
        borderStyle : 'solid',
        height : '100%',
        backgroundColor : '#fff',
        overflow: 'hidden',
        borderRadius: 5
    }

    const tabButton = {
        padding : 10, 
        paddingLeft : 10, 
        paddingRight : 10, 
        fontWeight : '500', 
        marginRight : 8, 
        border: 0, 
        borderRadius : 5,
        textTransform: 'uppercase',
        backgroundColor : 'transparent',
        color: '#fff'
    }

    return(
        <div>
            <Box className="stepWrapper">
                <Box className="stepcontHeader">
                    <Typography className="stitle">{stepObj.label}</Typography>
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

                <Modal
                    className="review_step"
                    open={activestatus == 2}
                    onClose={handleClosePage3}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="modal_wrapper">
                        <Box component={'div'} className='mainBookingrow'>
                            <Grid container>
                                <Grid item md={4}>
                                    <Typography className='depart_place'> Departure <span className='interTextDot'>.</span> Indigo  </Typography>
                                    <Box component={'div'} className="flight_timerow">
                                        <Box className='time' sx={flexGap2}>
                                            <div className='icons'>
                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                            </div>
                                            <Typography className='start_time timeText' style={timetext1}>07:10  </Typography>
                                            <ArrowRightAlt className='miniArrow'/>
                                            <Typography className='end_time timeText' style={timetext1}>08:10</Typography>
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
                                        <Box className='time'  sx={flexGap2}>
                                            <div className='icons'>
                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                            </div>
                                            <Typography className='start_time timeText' style={timetext1}>07:10 </Typography>
                                            <ArrowRightAlt className='miniArrow'/>
                                            <Typography className='end_time timeText' style={timetext1}>08:10</Typography>
                                        </Box>
                                        <Box className='price'>
                                            ₹ 5,552
                                        </Box>
                                    </Box>
                                    <Typography className='details_text'> Flight Details </Typography>
                                </Grid>
                                <Grid item md={3} >
                                    <Typography className='total_price' style={timetext1}>₹ 12,490</Typography>
                                    <Typography className='details_text'>Fare Details</Typography>
                                    <Button variant='contained' className='color_primary booknow_btn'>Book Now</Button>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box className="promotionrow" style={{ padding : 15, backgroundColor : '#f0f0f0' }}>
                            <Typography style={{ fontSize : 10, opacity : .6, marginBottom : 10 }}>Use Promo Code : Easefly to get flat Rs. 310 Off on this flight</Typography>
                            <Grid container spacing={2}>
                                <Grid item md={6}>
                                    <Box className="promoCard" style={promoCard}>
                                        <Box className="header" style={promocardHeader}>
                                            <Typography variant="h6" component={'div'} >Saver</Typography>
                                            <RadioGroup row className="" 
                                                value={promocard}
                                                onChange={changepromo} >
                                                <FormControlLabel value="promo1" control={<Radio sx={{ 
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 15,
                                                    },
                                                    color: "#ccc",
                                                    '&.Mui-checked': {
                                                        color: "#f59625",
                                                    }, }}/>} label="4,566" sx={{
                                                        '& .MuiTypography-root' : {
                                                            fontSize : 17, fontWeight : '500'
                                                        },
                                                    }} />
                                            </RadioGroup>
                                        </Box>

                                        <Box className="card_cont">
                                            <List sx={{
                                                paddingY : 2,
                                                '& li' : { fontSize : 12, paddingBottom : .31, fontWeight : '500' },
                                                '& svg' : { fontSize : 15, marginRight : 1, color : 'green' }
                                            }}>
                                                <ListItem><CheckCircleIcon /> Cabin Baggage included</ListItem>
                                                <ListItem><CheckCircleIcon /> Check - in Baggage included</ListItem>
                                                <ListItem><CheckCircleIcon /> Cancellation fees apply</ListItem>
                                                <ListItem><CheckCircleIcon /> Date change chargeable </ListItem>
                                            </List>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="promoCard" style={promoCard}>
                                        <Box className="header" style={promocardHeader}>
                                            <Typography variant="h6" component={'div'} >Saver</Typography>
                                            <RadioGroup row className="promotype" 
                                                value={promocard}
                                                onChange={changepromo} >
                                                <FormControlLabel value="promo2" control={<Radio sx={{ 
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 15,
                                                    },
                                                    color: "#ccc",
                                                    '&.Mui-checked': {
                                                        color: "#f59625",
                                                    }, }}/>} label="8,566" sx={{
                                                        '& .MuiTypography-root' : {
                                                            fontSize : 17, fontWeight : '500'
                                                        },
                                                    }} />
                                            </RadioGroup>
                                        </Box>

                                        <Box className="card_cont">
                                            <List sx={{
                                                paddingY : 2,
                                                '& li' : { fontSize : 12, paddingBottom : .31, fontWeight : '500' },
                                                '& svg' : { fontSize : 15, marginRight : 1, color : 'green' }
                                            }}>
                                                <ListItem><CheckCircleIcon /> Cabin Baggage included</ListItem>
                                                <ListItem><CheckCircleIcon /> Check - in Baggage included</ListItem>
                                                <ListItem><CheckCircleIcon /> Lower Cancellation fees</ListItem>
                                                <ListItem><CheckCircleIcon /> Free Date change allowed</ListItem>
                                                <ListItem><CheckCircleIcon /> Free Seats Avaliable</ListItem>
                                            </List>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box className="modal_tabs review_step">
                            <TabsUnstyled defaultValue={0} >
                                <TabsListUnstyled className='navs noborder' style={{ backgroundColor : '#21325d',  padding:  5, paddingLeft : 20, paddingRight : 20}}>
                                    <TabUnstyled style={tabButton}>Flight Details</TabUnstyled>
                                    <TabUnstyled style={tabButton}>Fare Summary</TabUnstyled>
                                    <TabUnstyled style={tabButton}>Cancellation </TabUnstyled>
                                    <TabUnstyled style={tabButton}>Date Change </TabUnstyled>
                                </TabsListUnstyled>
                                <TabPanelUnstyled value={0}>
                                    <Box style={{ padding : 15, backgroundColor : '#f0f0f0' }}>
                                        <Grid container spacing={2}>
                                            <Grid item md={6}>
                                                <Box style={promoCard}>
                                                    <Box className="header" sx={{ fontSize : 18, fontWeight : '300', padding : 1, 'border-bottom' : '1px solid #ccc' }}>
                                                        {'New Delhi'} to {'Chennai'} , {'20 May'}
                                                    </Box>
                                                    <Box className="content" sx={{ padding : 2, backgroundColor : '#fff'  }}>
                                                        <Box className="brand_detail">
                                                            <Box className="left" sx={{ display : 'flex', alignItems : 'center', columnGap : 1 }}>
                                                                <img style={{ width : 25  }} src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                <Typography sx={{ fontWeight : '500' }}>IndiGo</Typography>
                                                                <Typography sx={{ fontSize : 16, opacity : .7 }}>{'6E'} | {'2059'}</Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="flighthours" sx={{ marginTop : 1.3 , display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                                            <Box className="left">
                                                                <Typography sx={{ fontSize : 17, fontWeight : '500', textTransform : 'uppercase'  }}>{'07:10'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textTransform : 'uppercase'  }}>{'Fri, 20 May 22'}</Typography>
                                                            </Box>
                                                            <Box className="midle">
                                                                <Typography sx={{ fontSize : 9, fontWeight : '500',  textAlign : 'center'  }}>{'03 h 20 m'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textAlign : 'center'   }}>{'Non stop'}</Typography>
                                                            </Box>
                                                            <Box className="right">
                                                                <Typography sx={{ fontSize : 17, fontWeight : '500', textTransform : 'uppercase'   }}>{'10:30'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textTransform : 'uppercase'  }}>{'Fri, 20 May 22'}</Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="flightTerminal" sx={{ marginTop : 1 , display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                                            <Box className="left">
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'Terminal 2'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'New Delhi, India'}</Typography>
                                                            </Box>
                                                            <Box className="midle">
                                                                <Typography></Typography>
                                                            </Box>
                                                            <Box className="right">
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'Terminal 2'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'New Delhi, India'}</Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="baggage" sx={{ marginTop : 1.3 , display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                                            <Box className="left">
                                                                <Typography sx={{ fontSize : 14, fontWeight : '500', textTransform : 'uppercase'  }}>{'Baggage'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textTransform : 'uppercase'  }}>{'Adult'}</Typography>
                                                            </Box>
                                                            <Box className="midle">
                                                                <Typography sx={{ fontSize : 14, fontWeight : '500', textTransform : 'uppercase'  }}>{'Check In'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'15 kgs (1 peace only)'}</Typography>
                                                            </Box>
                                                            <Box className="right">
                                                                <Typography sx={{ fontSize : 14, fontWeight : '500', textTransform : 'uppercase'   }}>{'Cabin'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'7 kgs (1 peace only)'}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item md={6}>
                                                <Box style={promoCard}>
                                                    <Box className="header" sx={{ fontSize : 18, fontWeight : '300', padding : 1, 'border-bottom' : '1px solid #ccc' }}>
                                                        {'New Delhi'} to {'Chennai'} , {'20 May'}
                                                    </Box>
                                                    <Box className="content" sx={{ padding : 2, backgroundColor : '#fff' }}>
                                                        <Box className="brand_detail" sx={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between'}}>
                                                            <Box className="left" sx={{ display : 'flex', alignItems : 'center', columnGap : 1 }}>
                                                                <img style={{ width : 25  }} src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                                                <Typography sx={{ fontWeight : '500' }}>IndiGo</Typography>
                                                                <Typography sx={{ fontSize : 16, opacity : .7 }}>{'6E'} | {'2059'}</Typography>
                                                            </Box>
                                                            <Box className="right" sx={{ width: '25%' }}>
                                                                <Typography sx={{ fontSize : 10, opacity: .7, fontWeight : '500' }}>{'Economy, free Meals, Refundable'}</Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="flighthours" sx={{ marginTop : 1.3 , display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                                            <Box className="left">
                                                                <Typography sx={{ fontSize : 17, fontWeight : '500', textTransform : 'uppercase'  }}>{'07:10'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textTransform : 'uppercase'  }}>{'Fri, 20 May 22'}</Typography>
                                                            </Box>
                                                            <Box className="midle">
                                                                <Typography sx={{ fontSize : 9, fontWeight : '500',  textAlign : 'center'  }}>{'03 h 20 m'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textAlign : 'center'   }}>{'Non stop'}</Typography>
                                                            </Box>
                                                            <Box className="right">
                                                                <Typography sx={{ fontSize : 17, fontWeight : '500', textTransform : 'uppercase'   }}>{'10:30'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textTransform : 'uppercase'  }}>{'Fri, 20 May 22'}</Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="flightTerminal" sx={{ marginTop : 1.3 , display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                                            <Box className="left">
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'Terminal 2'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'New Delhi, India'}</Typography>
                                                            </Box>
                                                            <Box className="midle">
                                                                <Typography></Typography>
                                                            </Box>
                                                            <Box className="right">
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'Terminal 2'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'New Delhi, India'}</Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box className="baggage" sx={{ marginTop : 1.3 , display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                                            <Box className="left">
                                                                <Typography sx={{ fontSize : 14, fontWeight : '500', textTransform : 'uppercase'  }}>{'Baggage'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7, textTransform : 'uppercase'  }}>{'Adult'}</Typography>
                                                            </Box>
                                                            <Box className="midle">
                                                                <Typography sx={{ fontSize : 14, fontWeight : '500', textTransform : 'uppercase'  }}>{'Check In'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'15 kgs (1 peace only)'}</Typography>
                                                            </Box>
                                                            <Box className="right">
                                                                <Typography sx={{ fontSize : 14, fontWeight : '500', textTransform : 'uppercase'   }}>{'Cabin'}</Typography>
                                                                <Typography sx={{ fontSize : 10, opacity : .7  }}>{'7 kgs (1 peace only)'}</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanelUnstyled>
                                <TabPanelUnstyled value={1}></TabPanelUnstyled>
                                <TabPanelUnstyled value={2}></TabPanelUnstyled>
                                <TabPanelUnstyled value={3}></TabPanelUnstyled>
                            </TabsUnstyled>
                        </Box>
                    </Box>
                </Modal>

            </Box>
        </div>
    )
}