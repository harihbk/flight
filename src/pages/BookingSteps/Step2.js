import React from "react";
import { Container, InputLabel ,MenuItem ,Grid, Box, Typography, Button, FormGroup, FormControl, TextField, FormControlLabel, RadioGroup, Radio,Select, Checkbox } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';


export default function Step2(props){
    const [hasGst, setHasGst] = React.useState('yes');
    const [updateSms, setUpdateSms] = React.useState(true);
    const [addonTab, setAddonTab] = React.useState();
    const [baggageInfo, setBaggageInfo] = React.useState();

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
                        <TabsUnstyled defaultValue={0}>
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
                                <Typography>Meals</Typography>
                            </TabPanelUnstyled>
                            <TabPanelUnstyled value={2}>
                                <Typography>seats</Typography>
                            </TabPanelUnstyled>
                        </TabsUnstyled>                        
                    </Box>
                </Box>
            </Box>
        </div>
    )
}