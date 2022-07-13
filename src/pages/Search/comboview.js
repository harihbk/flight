import React from 'react'
import { useNavigate  } from "react-router-dom";
import { Container,IconButton, Box, Typography,Button, Grid, Divider } from '@mui/material';
import { FormControlLabel, RadioGroup, Radio, Tab, Tabs} from '@mui/material';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { KeyboardArrowDown } from '@mui/icons-material';
import { ArrowRightAlt } from '@mui/icons-material';
import  helpers  from "./calculation"


function Flightdetails(rest){

    return (
         <>
                { rest?._flightdetail?.map((data) => (
                       <>
                            { data?.map((flightdetail , flightdetailindex)=>(
                                <>
                                <Box className='flightlist flightfrom' key={flightdetailindex}>
                                <Box className='brand'>
                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> {flightdetail?.flightdetaildt?.name}</Typography>
                                    <Typography style={{ fontSize : 10, fontWeight : '500' }}> { flightdetail?.flightcodefn}</Typography>
                                </Box>
                                <Box className='time_place first'>
                               
                                    <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>{ flightdetail?.flightdetaildt?.dt }</Typography>
                                    <Typography>{flightdetail?.flightdetaildt?.citycountry}</Typography>
                                    <Typography>{flightdetail?.flightdetaildt?.name}</Typography>
                                    <Typography>{flightdetail?.flightdetaildt?.terminal}</Typography>
                        
                        
                                </Box>
                                <Box className='hours'>
                                    <Typography className='hrs' style={{fontSize : 12, fontWeight : '500'}}>{ flightdetail?.duration }</Typography>
                                    <Typography style={{ fontSize : 10 }}>Duration</Typography>
                                </Box>
                                <Box className='time_place'>
                                    <Typography className='time1' style={{fontSize : 17,  fontWeight : '500'}}>{ flightdetail?.flightdetailat?.at }</Typography>
                                    <Typography>{flightdetail?.flightdetailat?.citycountry}</Typography>
                                    <Typography>{flightdetail?.flightdetailat?.name}</Typography>
                                    <Typography>{flightdetail?.flightdetailat?.terminal}</Typography>
                                </Box>
                                </Box>
                                    {
                                        flightdetail?.layoverduration != 'NaNh NaNm' &&
                                        <Box className='hrsnext_flight'> { flightdetail?.layoverduration  }  </Box>
                        
                                    }
                                
                                    </>
                            ))  } 
                    <Divider sx={{ marginTop : 2 , marginBottom : 2 }}/>        
                </>
                ))}


        </>
       

    );

     
}

function Flightoptions({_data}){
    console.log(_data);

    return (
        <>
     { _data && Object.keys(_data)?.map((key ,index) => (
                <>
                  
                <Box className='timeandDetails' sx={{ display :'flex' , width:'100%'}}>

                        <Box className="firstdiv" sx={{ width:'80%'}}>
                            <Box sx={{ display : 'flex' , justifyContent : 'space-between'}}>
                                    <Box className='from'>
                                    <input
                                    type="radio"
                                    name = {`${index}${_data[key]?.dept_obj?.city}`}
                                    checked={_data[key]?.checked}  
                                  />
                                        <Typography className='timeText'>  { _data[key]?.dept_obj?.timing } </Typography> 
                                         <Typography className='place'> {  _data[key]?.dept_obj?.city } </Typography>
                                        <Typography variant="h6" sx={{ fontSize : 11}}>  {  _data[key].dept_obj?.timewords   } </Typography>

                                    </Box>
                                    <Box className='hours'>
                                        <Typography className="hourstext"> { _data[key].duration }</Typography>
                                        <Typography className='placeType' style={{ textAlign : 'center' }}> {  _data[key]?.stopwords } </Typography>
                                    </Box>
                                    <Box className='to'>
                                        <Typography className='timeText'>  {  _data[key]?.arrival_obj?.timing } </Typography>
                                        <Typography className='place'> {  _data[key]?.arrival_obj?.city } </Typography>
                                        <Typography variant="h6" sx={{ fontSize : 11}}>  {  _data[key]?.arrival_obj?.timewords   } </Typography>
                                    </Box>
                            </Box>

                            <Divider/>




                        </Box>
                </Box> 


                </>
            ))}
        </>
    );
}


export default function Comboview(props) {
    const { _listflightroundfilter , _cabinClassget  , _paxtypeget} = props

    console.log(_listflightroundfilter);

   // console.log(_listflightroundfilter);
    const [tabValue, setTabValue] = React.useState();  

    const [tabValueoption, setTabValueoption] = React.useState();  



    const TabChange = (newValue) => {
        setTabValue(newValue);
        setTabValueoption(-1)
    };

    const TabChangeoption = (newValue) => {
        setTabValueoption(newValue);
        setTabValue(-1)
    };


  return (
     <>

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

     
                                         { _listflightroundfilter && _listflightroundfilter.map((data, i) => (
                                                    <Box className='flightitem'>
                                                        {/* <RadioGroup className="faretype_radio" 
                                                             > */}
                                                            <Box className='flight_brand'>
                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> {  data?.frmt[0]?.dept_obj?.name }
                                                            </Box>
                                                            <span style={{ fontSize : 11 ,fontWeight : 'normal' , color:'#848f91'}} >
                                                               { data?.frmt[0]?.flight_code } 
                                                                </span>

                                                            <Box className='timeandDetails' sx={{ display :'flex'}}>

                                                                    <Box className="firstdiv" sx={{ marginRight: 12,width : '100%'}}>
                                                                        <Box sx={{ display : 'flex' , justifyContent : 'space-between'}}>
                                                                                <Box className='from'>
                                                                                    <Typography className='timeText'>  { data?.frmt[0]?.dept_obj?.timing } </Typography>
                                                                                    <Typography className='place'> { data?.frmt[0]?.dept_obj?.city } </Typography>
                                                                                    <Typography variant="h6" sx={{ fontSize : 11}}>  { data?.frmt[0]?.dept_obj?.timewords   } </Typography>

                                                                                </Box>
                                                                                <Box className='hours'>
                                                                                    <Typography className='hourstext'>  { data?.frmt[0]?.duration } </Typography>
                                                                                    <Typography className='placeType' style={{ textAlign : 'center' }}> { data?.frmt[0]?.stopwords } </Typography>
                                                                                </Box>
                                                                                <Box className='to'>
                                                                                    <Typography className='timeText'>  { data?.frmt[0]?.arrival_obj?.timing } </Typography>
                                                                                    <Typography className='place'> { data?.frmt[0]?.arrival_obj?.city } </Typography>
                                                                                    <Typography variant="h6" sx={{ fontSize : 11}}>  { data?.frmt[0]?.arrival_obj?.timewords   } </Typography>

                                                                                </Box>
                                                                        </Box>

                                                                        <Divider/>

                                                                        <Box className='flight_brand'>
                                                                        <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> {  data?.frmt[1]?.dept_obj?.name }
                                                                        </Box>
                                                                        <span style={{ fontSize : 11 ,fontWeight : 'normal' , color:'#848f91'}} >
                                                                    { data?.frmt[1]?.flight_code }
                                                                        </span>

                                                                        <Box sx={{ display : 'flex' , justifyContent : 'space-between'}}>
                                                                        
                                                                            <Box className='from'>
                                                                                <Typography className='timeText'>  { data?.frmt[1]?.dept_obj?.timing } </Typography>
                                                                                <Typography className='place'> { data?.frmt[1]?.dept_obj?.city } </Typography>
                                                                                <Typography variant="h6" sx={{ fontSize : 11}}>  { data?.frmt[1]?.dept_obj?.timewords   } </Typography>

                                                                            </Box>
                                                                            <Box className='hours'>
                                                                                <Typography className='hourstext'>  { data?.frmt[1]?.duration } </Typography>
                                                                                <Typography className='placeType' style={{ textAlign : 'center' }}> { data?.frmt[1]?.stopwords } </Typography>
                                                                            </Box>
                                                                            <Box className='to'>
                                                                                <Typography className='timeText'>  { data?.frmt[1]?.arrival_obj?.timing } </Typography>
                                                                                <Typography className='place'> { data?.frmt[1]?.arrival_obj?.city } </Typography>
                                                                                <Typography variant="h6" sx={{ fontSize : 11}}>  { data?.frmt[1]?.arrival_obj?.timewords   } </Typography>

                                                                            </Box>

                                                                        </Box>


                                                                    </Box>

                                                           

                                                                    <Box className="seconddiv">
                                                                        <Box className='price'>

                                                                            <span>
                                                                        { data?.totalPriceList.map((totaldata, totindex)=>(
                                                                            <Box className='price' >
                                                                            <Typography className='priceText'> 
                                                                            
                                                                            <div>
                                                                                <span>
                                                                                <Radio
                                                                                        checked={totaldata?.checked}
                                                                                        id= {totaldata?.id}
                                                                                        value={totaldata?.id}
                                                                                    // onChange = { (e)=> radiochangeevent(i,data?.totalPriceList , e) }
                                                                                        name={ "flights-" + totaldata?.id  }
                                                                                        inputProps={{ 'aria-label': 'A' }}
                                                                                    />
                                                                                </span>
                                                                                <span>₹</span>
                                                                            {helpers.calculatetotalamount(totaldata,_paxtypeget)} 
                                                                            </div>
                                                                                </Typography>
                                                                                <Typography variant="h6"sx={{ fontSize:11,color : '#999'}} >{ _cabinClassget }</Typography>
                                                                        </Box>
                                                                            )) }
                                                                            </span>



                                                                            <Typography className={`fdetails ${tabValue }`} onClick={() => tabValue == i ? TabChange('-1') : TabChange(i)}> {'Flight Details'} <KeyboardArrowDown className='down' /></Typography>
                                                                     
                                                                        {
                                                                           Object.keys(data?.going).length > 1 ||  Object.keys(data?.returns).length > 1 &&
                                                                           <Typography className={`fdetails ${tabValueoption }`} onClick={() => tabValueoption == i ? TabChangeoption('-1') : TabChangeoption(i)}> {'More Option'} <KeyboardArrowDown className='down' /></Typography>
                                                                        }


                                                                        </Box>
                                                                    </Box>

                                                            </Box>  




                                                        {  tabValueoption == i && (
                                                            <Box className='flight_detail_bot tab'>
                                                                <Grid container>
                                                                    <Grid md={6} item > <Flightoptions _data = { data?.going }/> </Grid>
                                                                    <Grid item  md={6}> <Flightoptions _data = { data?.returns }/> </Grid>
                                                                </Grid>
                                                            </Box>

                                                        )}





                                                        {/* </RadioGroup> */}

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
                                                                        
                                                                        <Flightdetails _flightdetail={data?.flightdetails}/>
                                                                    </TabPanelUnstyled>





                                                                    <TabPanelUnstyled value={1}>
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


                           
     </>
  )
}
