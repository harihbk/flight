import React, { memo } from 'react' 
// import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { ReactComponent as Before6 } from '../../assets/icons/sun.svg';
import { ReactComponent as Before12 } from '../../assets/icons/sun1.svg';
import { ReactComponent as After12 } from '../../assets/icons/sun2.svg';
import { ReactComponent as After6 } from '../../assets/icons/sun3.svg';

const primaryColor = '#f55a2a';
const grayColor = '#7e7e7e';

const filterTitle = {
    fontWeight: 500, 
    marginBottom : 5,
}
const filterSubTitle = {
    fontWeight: 300, 
    marginBottom : 5,
    fontSize: 14
}

const  Sidemenu = (props) => {
    const [priceVal, setPriceVal] = React.useState(30);
    const [timeIcon, setTimeIcon] = React.useState(1);
    const [timeIcon1, setTimeIcon1] = React.useState(1);
  
    const handleChange = (event, newValue) => {
    setPriceVal(newValue);
      console.log(newValue)
    };

    const marks = [
        {
            value: 0,
            label: '₹ 5,000',
        },{
            value: 100,
            label: '₹ 13,000',
        },
    ];

    const changeTimeICon = (curent) =>{
        setTimeIcon(curent);
    }
    const changeTimeICon1 = (curent) =>{
        setTimeIcon1(curent);
    }
    return(
        <Box className='sidemenu'>
            <Typography className='mainTitle'>Popular Filters</Typography>
            <Box className='price_slider'>
                <Typography component={'div'} className='' style={filterTitle}>{'One Way Price'}</Typography>
                <Slider aria-label="Volume" value={priceVal} onChange={handleChange} marks={marks} sx={{ color: primaryColor }}/>
            </Box>

            <Box className='filterType2 filter filterRow border'>
                <Typography component={'div'} className='' style={filterTitle}>{'Onward Journey'}</Typography>
                <Typography component={'div'} className='' style={filterSubTitle}>{'Stops From '} {'Chandigarh'}</Typography>
                
                <FormGroup style={{ marginBottom : 10 }}>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{ color: grayColor,
                            '&.Mui-checked': {
                                color: primaryColor,
                            },  }} />} label="Non Stop (2)" />  <Box component={'div'}>{'₹ 3000'}</Box>
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="1 Stop (20)" />  <Box component={'div'}>{'₹ 4000'}</Box>
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="1+ Stop (30)" />  <Box component={'div'}>{'₹ 4500'}</Box>
                    </Box>
                </FormGroup>

                <Box className='SubFilter' style={{ marginBottom : 20 }}>
                    <Typography component={'div'} className='' style={filterTitle}>{'Departure From '} {'Chandigarh'}</Typography>
                    
                    <FormGroup className='departure_time option'>
                        <Box className={`time_item ${timeIcon == 1 ? 'active' : ''}`} onClick={() => changeTimeICon(1)}>
                            <Before6 className='time_icon' />
                            <Box>{'Before 6 AM'}</Box>
                        </Box>
                        <Box className={`time_item ${timeIcon == 2 ? 'active' : ''}`} onClick={() => changeTimeICon(2)}>
                            <Before12 className='time_icon' />
                            <Box>{'6 AM - 12 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${timeIcon == 3 ? 'active' : ''}`} onClick={() => changeTimeICon(3)}>
                            <After12 className='time_icon' />
                            <Box>{'12 PM - 6 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${timeIcon == 4 ? 'active' : ''}`}  onClick={() => changeTimeICon(4)}>
                            <After6 className='time_icon' />
                            <Box>{'After 6 PM'}</Box>
                        </Box>
                    </FormGroup>
                </Box>

                <Box className='SubFilter'>
                    <Typography component={'div'} className='' style={filterTitle}>{'Arival at '} {'Chennai'}</Typography>
                    <FormGroup className='departure_time option'>
                        <Box className={`time_item ${timeIcon1 == 1 ? 'active' : ''}`}   onClick={() => changeTimeICon1(1)}>
                            <Before6 className='time_icon' />
                            <Box>{'Before 6 AM'}</Box>
                        </Box>
                        <Box className={`time_item ${timeIcon1 == 2 ? 'active' : ''}`}  onClick={() => changeTimeICon1(2)}>
                            <Before12 className='time_icon'  />
                            <Box>{'6 AM - 12 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${timeIcon1 == 3 ? 'active' : ''}`}   onClick={() => changeTimeICon1(3)}>
                            <After12 className='time_icon' />
                            <Box>{'12 PM - 6 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${timeIcon1 == 4 ? 'active' : ''}`} onClick={() => changeTimeICon1(4)}>
                            <After6 className='time_icon' />
                            <Box>{'After 6 PM'}</Box>
                        </Box>
                    </FormGroup>
                </Box>
            </Box>

            
            <Box className='filterType3 filter filterRow ' >
                <Typography component={'div'} className='' style={filterTitle}>{'Airlines'}</Typography>
                <FormGroup>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{ color: grayColor,
                            '&.Mui-checked': {
                                color: primaryColor,
                            },  }} />} label="Air India (1)" />  <Box component={'div'}>{'₹ 7600'}</Box>
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="Alliance Air (45)" />  <Box component={'div'}>{'₹ 5600'}</Box>
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="Go First" />  <Box component={'div'}>{'₹ 8500'}</Box>
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="Indigo" />  <Box component={'div'}>{'₹ 9500'}</Box>
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="SpiceJet" />  <Box component={'div'}>{'₹ 7500'}</Box>
                    </Box>
                </FormGroup>
            </Box>
        </Box>
    )
}

export default Sidemenu;