import React, { memo , useRef } from 'react' 
// import { useNavigate } from "react-router-dom";
import { IconButton, Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox, Button, Divider } from '@mui/material';
import { ReactComponent as Before6 } from '../../assets/icons/sun.svg';
import { ReactComponent as Before12 } from '../../assets/icons/sun1.svg';
import { ReactComponent as After12 } from '../../assets/icons/sun2.svg';
import { ReactComponent as After6 } from '../../assets/icons/sun3.svg';
import { useSearchParams } from 'react-router-dom';
import { filter } from 'lodash';
import { ComboStopService , CombodeparturearrivalService } from "../../pages/Search/store/comborxjs"

 function Flightname(detail){
     const { _detail } = detail

    return (
        <>
        <Typography sx={{ display : 'flex'}}>
        <Typography mr={1}>{_detail?.dept_obj?.name}</Typography> ( <Typography>  {_detail.cnt} </Typography>)

        </Typography>
        </>
    );
 }

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

const  Sidemenu = ({...props}) => {
 //   const { _minmaxprice , _sliderfun , _stopfilterpn } = props
    const { _minmaxprice , _filter , _airline  , _flightstatus} = props
    const isFirstRun = useRef(true);
    const onwardreturnref = useRef(true);
    const departurearrivalref = useRef(true);

    
    const [priceVal, setPriceVal] = React.useState(2000);
    const [timeIcon, setTimeIcon] = React.useState(0);
    const [timeIcon1, setTimeIcon1] = React.useState(0);
    const [triggetslider, setTriggetslider] = React.useState("");
    const [depaturefrom , setDepaturefrom ] = React.useState([])
    const [arrival , setArrival ] = React.useState([])

    const [departurearrival , setDeparturearrival ] = React.useState({
            depaturefrom : [],
            arrivalfrom  : [],
            departureto  : [],
            arrivalto    : []
    })


    const [slider, setSlider] = React.useState([
        {
            value: 0,
            label: 0,
        },{
            value: 100,
            label: (_minmaxprice).toLocaleString('en') ,
        },
    ]);
    const [ stopfilter , setStopfilter ] = React.useState([])


    const [ location , setLocation ] = React.useState([]);
    const [ codelocation , setCodelocation ] = React.useState([]);

    const [ stopmulticity , setStopmulticity ] = React.useState({
        status : true,
        stops_onwards : [],
        stops_return : []

    });




    const [searchParams] = useSearchParams();
    


    

    const handleChange = (event, newValue) => {
    setPriceVal(newValue);
    let dd = [...slider]
     let upd = _minmaxprice/100 * newValue
     let rangedata = Math.round(upd).toLocaleString('en') 
     dd[1].label = rangedata
     setSlider(dd)
     setTriggetslider(upd)
   //  _sliderfun(rangedata)
    };

   
    



    const stopsfilter = (e) => {
        if(e.target.checked){
            let imm = [...stopfilter]
            imm.push(e.target.value)
            setStopfilter(imm)
        } else {
            let imm = [...stopfilter]
            let ff = imm.filter(r=>r!=e.target.value)
            setStopfilter(ff)
        }
    }



    React.useEffect(()=>{

        var _location = searchParams.get('location');
        
        setLocation(_location.split("-"));

        var _codelocation = searchParams.get('itinerary');
        setCodelocation(_codelocation.split("-"))

        // only run once
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
          }

        let imm = [...stopfilter];
        let _slider = [...slider];
        let _depaturefrom = [...depaturefrom];
        let _arrival = [...arrival];



        _filter(imm,_slider , _depaturefrom , _arrival , _flightstatus , stopmulticity , departurearrival)
        

    },[stopfilter , triggetslider ,depaturefrom , arrival , stopmulticity , departurearrival])



    const changeTimeICon = (curent) =>{


        let _depfrom = [...depaturefrom];
        if(!_depfrom.includes(curent)){
            _depfrom.push(curent)
            setDepaturefrom(_depfrom)
        } else {
            _depfrom = _depfrom.filter(f=>f !=curent)
            setDepaturefrom(_depfrom)
        }

        //setTimeIcon(curent);

    }
    const changeTimeICon1 = (curent) =>{

        let _depfrom = [...arrival];
        if(!_depfrom.includes(curent)){
            _depfrom.push(curent)
            setArrival(_depfrom)
        } else {
            _depfrom = _depfrom.filter(f=>f !=curent)
            setArrival(_depfrom)
        }
       // setTimeIcon1(curent);
    }


    // var stops_onwards = []; 
    // var stops_return = [];

   // combo fn

   const [ stops_onwards , setStops_onwards] = React.useState([])
   const [ stops_return , setStops_return] = React.useState([])


   React.useEffect(()=>{
    let swallowcopy = {...stopmulticity}
    if(swallowcopy.status == true){
        setStopmulticity(prevState => ({
            ...prevState,
            stops_onwards : stops_onwards
        }))
    } else {
        setStopmulticity(prevState => ({
            ...prevState,
            stops_return : stops_return
        }))
    }
},[stops_onwards,stops_return,departurearrival])


// React.useEffect(()=>{
   
//     ComboStopService.combostopsevent(stopmulticity)
// },[stopmulticity])

// React.useEffect(()=>{
    
//     CombodeparturearrivalService.combostopsevent(departurearrival)
// },[departurearrival])




   const stopsfn = (e) => {
        let swallowcopy = {...stopmulticity}
        let copy = (swallowcopy.status == true) ? [...stops_onwards] : [...stops_return];
        (e.target.checked) ? copy.push(e.target.value) :  (copy = copy.filter(r=>r!=e.target.value)) ;
        copy = copy.sort((a,b)=>a-b);
        (swallowcopy.status == true) ? setStops_onwards(copy) : setStops_return(copy);
        

   }


   const deparrivalfn = (a,b) => {


       var swlcpy = {...departurearrival}
       var _variable;
       var obj = {}
       _variable = swlcpy[a]
       if(_variable.includes(b)){
        _variable =  _variable.filter(aa=>aa!=b)
       } else {
        _variable.push(b)
       }
       _variable = _variable.sort((a,b)=>a-b);
       obj[a] = _variable;
       setDeparturearrival(prevState=>(
           {
               ...prevState,
              ...obj
           }
       ))


   }

   // combo fn


    return(
        <Box className='sidemenu'>
            <Typography className='mainTitle'>Popular Filters</Typography>
            <Box className='price_slider'>
                <Typography component={'div'} className='' style={filterTitle}>{'One Way Price'}</Typography>
                <Slider aria-label="Volume" value={priceVal} onChange={handleChange} marks={slider} sx={{ color: primaryColor }}/>
            </Box>



        { _flightstatus == "combo"  && 
        
                <Box className='filterType2 filter filterRow border'>
                    <Typography component={'div'} className='' style={filterTitle}>{'Stops'}</Typography>


                    <Box sx={{ marginBottom : 1}}> 
                        <Button variant={stopmulticity.status ? "contained" : "outlined"} sx={{ marginRight : 1}} onClick={()=>setStopmulticity(
                            prev=>({
                            ...prev,
                            status : true
                        })
                        )} >{ codelocation[0] }-{codelocation[1]}</Button>

                        <Button variant={stopmulticity.status ? "outlined" : "contained"} onClick={()=>setStopmulticity(
                            prev=>({
                                ...prev,
                                status : false
                            })
                        )}>{ codelocation[1] }-{codelocation[0]}</Button>
                    </Box>



                { stopmulticity.status &&  
                    <Box>
                        <FormGroup style={{ marginBottom : 10 }}>
                            <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                <FormControlLabel control={<Checkbox  sx={{ color: grayColor,
                                    '&.Mui-checked': {
                                        color: primaryColor,
                                    },  }} checked={ ((stopmulticity.stops_onwards).includes('0')) ? true : false } />} label="Non Stop" value="0" onChange={stopsfn}/>  
                            </Box>
                            <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                                    '&.Mui-checked': {
                                    color: primaryColor,
                                    }, }} checked={ ((stopmulticity.stops_onwards).includes('1')) ? true : false } />} label="1 Stop" value="1" onChange={stopsfn}/>  
                            </Box>
                            <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                                    '&.Mui-checked': {
                                    color: primaryColor,
                                    }, }} checked={ ((stopmulticity.stops_onwards).includes('2')) ? true : false } />} label="1+ Stop" value="2" onChange={stopsfn}/>  
                            </Box>
                        </FormGroup>
                    </Box>
                }
                    

                    { stopmulticity.status == false &&  
                    <Box>
                        <FormGroup style={{ marginBottom : 10 }}>
                            <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                <FormControlLabel control={<Checkbox  sx={{ color: grayColor,
                                    '&.Mui-checked': {
                                        color: primaryColor,
                                    },  }} checked={ ((stopmulticity.stops_return).includes('0')) ? true : false } />} label="Non Stop" value="0" onChange={stopsfn}/>  
                            </Box>
                            <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                                    '&.Mui-checked': {
                                    color: primaryColor,
                                    }, }} checked={ ((stopmulticity.stops_return).includes('1')) ? true : false } />} label="1 Stop" value="1" onChange={stopsfn}/>  
                            </Box>
                            <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                                <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                                    '&.Mui-checked': {
                                    color: primaryColor,
                                    }, }} checked={ ((stopmulticity.stops_return).includes('2')) ? true : false } />} label="1+ Stop" value="2" onChange={stopsfn}/>  
                            </Box>
                        </FormGroup>
                    </Box>
                }
                    
            <Divider/>    

        <Box>
            <Box>
                    <Typography component={'div'} className='' style={filterTitle}> Departure From { location[0] } </Typography>

                        <FormGroup className='departure_time option'>
                                <Box className={`time_item ${(departurearrival.depaturefrom).includes(1) ? 'active' : ''}`} onClick={()=>deparrivalfn("depaturefrom",1)}>
                                    <Before6 className='time_icon' />
                                    <Box>{'Before 6 AM'}</Box>
                                </Box>
                                <Box className={`time_item ${(departurearrival.depaturefrom).includes(2)  ? 'active' : ''}`} onClick={()=>deparrivalfn("depaturefrom",2)}>
                                    <Before12 className='time_icon' />
                                    <Box>{'6 AM - 12 PM'}</Box>
                                </Box>
                                <Box className={`time_item ${(departurearrival.depaturefrom).includes(3)  ? 'active' : ''}`} onClick={()=>deparrivalfn("depaturefrom",3)}>
                                    <After12 className='time_icon' />
                                    <Box>{'12 PM - 6 PM'}</Box>
                                </Box>
                                <Box className={`time_item ${(departurearrival.depaturefrom).includes(4)  ? 'active' : ''}`}  onClick={()=>deparrivalfn("depaturefrom",4)}>
                                    <After6 className='time_icon' />
                                    <Box>{'After 6 PM'}</Box>
                                </Box>
                        </FormGroup>
            </Box>
           <Box>
                <Typography component={'div'} className='' style={filterTitle}> Arrival From { location[1] }   </Typography>
                <FormGroup className='departure_time option'>
                        <Box className={`time_item ${(departurearrival.arrivalfrom).includes(1) ? 'active' : ''}`} onClick={()=>deparrivalfn("arrivalfrom",1)}>
                            <Before6 className='time_icon' />
                            <Box>{'Before 6 AM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.arrivalfrom).includes(2)  ? 'active' : ''}`} onClick={()=>deparrivalfn("arrivalfrom",2)}>
                            <Before12 className='time_icon' />
                            <Box>{'6 AM - 12 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.arrivalfrom).includes(3)  ? 'active' : ''}`} onClick={()=>deparrivalfn("arrivalfrom",3)}>
                            <After12 className='time_icon' />
                            <Box>{'12 PM - 6 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.arrivalfrom).includes(4)  ? 'active' : ''}`} onClick={()=>deparrivalfn("arrivalfrom",4)}>
                            <After6 className='time_icon' />
                            <Box>{'After 6 PM'}</Box>
                        </Box>
                    </FormGroup>
           </Box>
           <Box>
                <Typography component={'div'} className='' style={filterTitle}> Departure TO { location[1] } </Typography>
                <FormGroup className='departure_time option'>
                        <Box className={`time_item ${(departurearrival.departureto).includes(1) ? 'active' : ''}`} onClick={()=>deparrivalfn("departureto",1)}>
                            <Before6 className='time_icon' />
                            <Box>{'Before 6 AM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.departureto).includes(2)  ? 'active' : ''}`} onClick={()=>deparrivalfn("departureto",2)}>
                            <Before12 className='time_icon' />
                            <Box>{'6 AM - 12 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.departureto).includes(3)  ? 'active' : ''}`} onClick={()=>deparrivalfn("departureto",3)}>
                            <After12 className='time_icon' />
                            <Box>{'12 PM - 6 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.departureto).includes(4)  ? 'active' : ''}`}  onClick={()=>deparrivalfn("departureto",4)}>
                            <After6 className='time_icon' />
                            <Box>{'After 6 PM'}</Box>
                        </Box>
                    </FormGroup>
           </Box>
           <Box>
                <Typography component={'div'} className='' style={filterTitle}> Arrival To { location[0] } </Typography>
                <FormGroup className='departure_time option'>
                        <Box className={`time_item ${(departurearrival.arrivalto).includes(1) ? 'active' : ''}`} onClick={()=>deparrivalfn("arrivalto",1)}>
                            <Before6 className='time_icon' />
                            <Box>{'Before 6 AM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.arrivalto).includes(2)  ? 'active' : ''}`} onClick={()=>deparrivalfn("arrivalto",2)}>
                            <Before12 className='time_icon' />
                            <Box>{'6 AM - 12 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.arrivalto).includes(3)  ? 'active' : ''}`} onClick={()=>deparrivalfn("arrivalto",3)}>
                            <After12 className='time_icon' />
                            <Box>{'12 PM - 6 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(departurearrival.arrivalto).includes(4)  ? 'active' : ''}`}  onClick={()=>deparrivalfn("arrivalto",4)}>
                            <After6 className='time_icon' />
                            <Box>{'After 6 PM'}</Box>
                        </Box>
                    </FormGroup>
           </Box>

        </Box>





                </Box>

        }

        { _flightstatus != "combo"  && 
                
                <Box className='filterType2 filter filterRow border'>
                <Typography component={'div'} className='' style={filterTitle}>{'Onward Journey'}</Typography>
                
                <FormGroup style={{ marginBottom : 10 }}>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                                color: primaryColor,
                            },  }} />} label="Non Stop" value="0" onChange={stopsfilter}/>  
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="1 Stop" value="1" onChange={stopsfilter}/>  
                    </Box>
                    <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                        <FormControlLabel  control={<Checkbox  sx={{ color: grayColor,
                            '&.Mui-checked': {
                            color: primaryColor,
                            }, }}/>} label="1+ Stop" value="2" onChange={stopsfilter}/>  
                    </Box>
                </FormGroup>

                <Box className='SubFilter' style={{ marginBottom : 20 }}>
                    <Typography component={'div'} className='' style={filterTitle}>{'Departure From '} {location[0] ?? ''} </Typography>
                    
                    <FormGroup className='departure_time option'>
                        <Box className={`time_item ${(depaturefrom).includes(1) ? 'active' : ''}`} onClick={() => changeTimeICon(1)}>
                            <Before6 className='time_icon' />
                            <Box>{'Before 6 AM'}</Box>
                        </Box>
                        <Box className={`time_item ${(depaturefrom).includes(2)  ? 'active' : ''}`} onClick={() => changeTimeICon(2)}>
                            <Before12 className='time_icon' />
                            <Box>{'6 AM - 12 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(depaturefrom).includes(3)  ? 'active' : ''}`} onClick={() => changeTimeICon(3)}>
                            <After12 className='time_icon' />
                            <Box>{'12 PM - 6 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(depaturefrom).includes(4)  ? 'active' : ''}`}  onClick={() => changeTimeICon(4)}>
                            <After6 className='time_icon' />
                            <Box>{'After 6 PM'}</Box>
                        </Box>
                    </FormGroup>
                </Box>

                <Box className='SubFilter'>
                    <Typography component={'div'} className='' style={filterTitle}>{'Arival at '}  {location[1] ?? ''}</Typography>
                    <FormGroup className='departure_time option'>
                        <Box className={`time_item ${(arrival).includes(1) ? 'active' : ''}`}   onClick={() => changeTimeICon1(1)}>
                            <Before6 className='time_icon' />
                            <Box>{'Before 6 AM'}</Box>
                        </Box>
                        <Box className={`time_item ${(arrival).includes(2) ? 'active' : ''}`}  onClick={() => changeTimeICon1(2)}>
                            <Before12 className='time_icon'  />
                            <Box>{'6 AM - 12 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(arrival).includes(3) ? 'active' : ''}`}   onClick={() => changeTimeICon1(3)}>
                            <After12 className='time_icon' />
                            <Box>{'12 PM - 6 PM'}</Box>
                        </Box>
                        <Box className={`time_item ${(arrival).includes(4) ? 'active' : ''}`} onClick={() => changeTimeICon1(4)}>
                            <After6 className='time_icon' />
                            <Box>{'After 6 PM'}</Box>
                        </Box>
                    </FormGroup>
                </Box>
            </Box>
            }



            





            
            <Box className='filterType3 filter filterRow ' >
                <Typography component={'div'} className='' style={filterTitle}>{'Airlines'}</Typography>
                <FormGroup>


                { _airline && _airline.map((data,index) => (

                            <Box component={'div'} style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-between' }}>
                            <FormControlLabel control={<Checkbox defaultChecked sx={{ color: grayColor,
                                '&.Mui-checked': {
                                    color: primaryColor,
                                },  }} />} label={<Flightname _detail = {data}/>} />  <Box component={'div'}>₹{ data?.totalPriceList[0]?.totalamount }</Box>
                            </Box>

                ))


                }

                  
                  


                </FormGroup>
            </Box>
        </Box>
    )
}

export default Sidemenu;