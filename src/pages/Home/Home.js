
import React , { useRef } from 'react'
import Header from '../../components/header';
import { useNavigate  } from "react-router-dom";
import { Container, Toolbar, IconButton, Box, Typography, AppBar, MenuItem, Menu, Button, Grid } from '@mui/material';
import { FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, TextField  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './style.css';  
import Footer from '../../components/Footer/Footer';
import Calendar from '../../components/BookingCalendar/Calendar';

import Model from "./Model"

import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import debouce from "lodash.debounce";

import axios from 'axios';  

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import CommentIcon from '@mui/icons-material/Comment';
import { Divider } from '@material-ui/core';
import { isEmpty } from 'lodash';
import Chip from '@mui/material/Chip';

import moment from 'moment'
import Checkbox from '@mui/material/Checkbox';



function Froms({value}){
  const { city , country } = value
  return (
    <Typography sx={{ fontSize : 13, fontWeight : '500' }}>{value.city},{value.country}</Typography>
  );
}

export default function Home(props) {
 // const Fromref = useRef();
  const [open, setOpen] = React.useState(false);
  const [toopen, setToopen] = React.useState(false);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [ searchFrom , setSearchFrom ] = React.useState([]);
  const [ searchTo , setSearchTo ] = React.useState([]);

  const [ searchFromlocalstorage , setSearchFromlocalstorage ] = React.useState([]);
  const [ searchTolocalstorage , setSearchTolocalstorage ] = React.useState([]);

  const [ suggestionfrom , setSuggestionfrom ] = React.useState(false);
  const [ suggestionto , setSuggestionto ] = React.useState(false);

  const [ searchfromselected , setSearchfromselected ] = React.useState({});
  const [ searchtoselected , setSearchtoselected ] = React.useState({});


  // Passangers 
  const [ passangeropen , setPassangeropen ] = React.useState(false);

  //Traveller class
  const [ travellerclass , setTravellerclass ] = React.useState({
    ADULT : 1,
    CHILD : 0,
    INFANT : 0
  });

  // Travel class
  const [ travelclass , setTravelclass ] = React.useState("Economy");

  //Calendar
  var date = new Date();
  var date1 = {...date}
  date.setDate(date.getDate() + 1);

  // add a day
  const [ calendar , setCalendar ] = React.useState(date1) // from
  const [ tocalendar , setTocalendar ] = React.useState(date) // from

  
  const [ calendartostatus , setCalendartostatus] = React.useState(true)


  const calendarref = useRef();

  const [stopchecked, setStopchecked] = React.useState(false);

  const stophandleChange = (event) => {
    setStopchecked(event.target.checked);
  };

 


  React.useEffect(()=>{
    const url = process.env.REACT_APP_FROM_SEARCH;
    const getstorage = JSON.parse(localStorage.getItem(url));
    setSearchFromlocalstorage(getstorage)

    if(getstorage && getstorage[0]){
      setSearchfromselected(getstorage[0]  || {})
    } else {

      axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=Shirdi`).then(res=>{
        let hyn = res?.data[0];
        setSearchfromselected(hyn)
 
       })

    }
  },[searchFrom])



  React.useEffect(()=>{
    const url = process.env.REACT_APP_TO_SEARCH;
    const getstorage = JSON.parse(localStorage.getItem(url));
    setSearchTolocalstorage(getstorage)
    if(getstorage && getstorage[0]){
    setSearchtoselected(getstorage[0] || {})
    } else {

     // http://localhost:3030/flight?$search=Shirdi
      axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=Chennai`).then(res=>{
       let hyn = res?.data[0];
       console.log(hyn);
       setSearchtoselected(hyn)

      })


    }
  },[searchTo])

  const handleChangeFrom = (e) => {

    

    setSearchTerm(e.target.value);
    const Search = e.target.value;
    if(isEmpty(Search)){
      setSuggestionfrom(false) // show suggestion
      return
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=${Search}`).then(res=>{
      setSearchFrom(res?.data)
      setSuggestionfrom(true) // show suggestion
    }).catch(err=>{
      console.log(err);
    })

  };

  const debouncedResults = React.useMemo(() => {
    return debouce(handleChangeFrom, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const clickfrom = (e) => {
    const url = process.env.REACT_APP_FROM_SEARCH;
    const getstorage = JSON.parse(localStorage.getItem(url));

    setToopen(true)


    if (getstorage !=null && getstorage.length > 4 ){

      var find =  getstorage.find(obj => obj._id == e._id)
      if(find==undefined){
          const swallowcopy = [e , ...getstorage ]
          let gg= swallowcopy.slice(0,5)
          localStorage.setItem(url , JSON.stringify(gg )) 
      } else {
        console.log(find);
        let _id = find._id
        var gets = getstorage.filter(a => a._id != _id)
        let hh = [find,...gets]
        localStorage.setItem(url , JSON.stringify(hh )) 

      }

    }  else {

      if(getstorage ==null ) {
        let arr = []
        arr.push(e)
        localStorage.setItem(url , JSON.stringify(arr) )
      } else {
       var find =  getstorage.find(obj => obj._id == e._id)
        if(find==undefined){
            getstorage.push(e)
            localStorage.setItem(url , JSON.stringify(getstorage)) 
        } 
      } 
    }
    setSearchfromselected(e)

    setTimeout(()=>{
      setOpen(false)
    },
    100)

  }


  const clickto = (e) => {


    setCalendarOpen(true) // this will open calendar


    const url = process.env.REACT_APP_TO_SEARCH;
    const getstorage = JSON.parse(localStorage.getItem(url));
    if (getstorage !=null && getstorage.length > 4 ){
      var find =  getstorage.find(obj => obj._id == e._id)
      if(find==undefined){
          const swallowcopy = [e , ...getstorage ]
          let gg= swallowcopy.slice(0,5)
          localStorage.setItem(url , JSON.stringify(gg)) 
      } else {
        console.log(find);
        let _id = find._id
        var gets = getstorage.filter(a => a._id != _id)
        let hh = [find,...gets]
        localStorage.setItem(url , JSON.stringify(hh )) 

      }

    }  else {
      if(getstorage ==null ) {
        let arr = []
        arr.push(e)
        localStorage.setItem(url , JSON.stringify(arr) )
      } else {
       var find =  getstorage.find(obj => obj._id == e._id)
        if(find==undefined){
            getstorage.push(e)
            localStorage.setItem(url , JSON.stringify(getstorage)) 
        }
      } 
    }
    setSearchtoselected(e)

    setTimeout(()=>{
      setToopen(false)
    },
    100)

  }
  
  
  const handleChangeTo = (e) => {

    

    setSearchTerm(e.target.value);


    const Search = e.target.value;
    if(isEmpty(Search)){
      setSuggestionto(false) // show suggestion
      return
    }
    axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=${Search}`).then(res=>{
      setSearchTo(res?.data)
      setSuggestionto(true) // show suggestion
    }).catch(err=>{
      console.log(err);
    })

  };

  const debouncedResultsto = React.useMemo(() => {
    return debouce(handleChangeTo, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      debouncedResultsto.cancel();
    };
  });


  // const [show, setShow] = React.useState(false);
  // const container = React.useRef(null);


  const navigate = useNavigate(); 



  const coursesPage = () => {

   let obj = {
     calendarfrom : calendar,
     calendarto : tocalendar,
     from     : searchfromselected,
     to       :  searchtoselected,
     trip     : tripOpt,
     travellerclass : travellerclass,
     travelclass : travelclass

   }

   console.log(obj);

  // localStorage.setItem("mytripee_search",JSON.stringify(obj))
   let queryparams
  if(obj?.trip == "oneway"){
     queryparams = `?itinerary=${obj?.from?.iata}-${obj?.to?.iata}-${ moment(obj.calendarfrom).format("YYYY/MM/DD") }&tripType=${obj?.trip}&paxType=A-${travellerclass.ADULT}_C-${travellerclass.CHILD}_I-${travellerclass.INFANT}&cabinClass=${obj.travelclass}&location=${obj?.from?.city}-${obj?.to?.city}`
  } else {
    queryparams = `?itinerary=${obj?.from?.iata}-${obj?.to?.iata}-${ moment(obj.calendarfrom).format("YYYY/MM/DD") }_${obj?.to?.iata}-${obj?.from?.iata}-${ moment(obj.calendarto).format("YYYY/MM/DD") }&tripType=${obj?.trip}&paxType=A-${travellerclass.ADULT}_C-${travellerclass.CHILD}_I-${travellerclass.INFANT}&cabinClass=${obj.travelclass}&location=${obj?.from?.city}-${obj?.to?.city}`
  }

  if(stopchecked){
    const parm = stopchecked ? 0  : 1
    queryparams = `${queryparams}&stops=${parm}`
  }

  queryparams = `${queryparams}&pft=${fareType}`
  
  navigate(`/search${queryparams}`)

 
  }


  const [tripOpt, setTripOpt] = React.useState("oneway");
  const [preferedAirline, setPreferedAirline] = React.useState('none');
  const [fareType, setFareType] = React.useState('regular');
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [calendarOpento, setCalendarOpento] = React.useState(false);


  const colorsRadio = {
    color: "#99999a",
    '&.Mui-checked': {
      color: "#f59625",
    },
  }

  const handleRadioChange = (event)=> {
    setTripOpt(event.target.value);
    setCalendartostatus(true)

  } 

  const handleChange = (event) => {
    setPreferedAirline(event.target.value);
  };

  const changeFareType = (event) => {
    setFareType(event.target.value);
  };

  const changeCalendar = ()=>{
    calendarOpen ? setCalendarOpen(false) : setCalendarOpen(true);
  }

  const changeCalendarto = ()=>{
    calendarOpento ? setCalendarOpento(false) : setCalendarOpento(true);
    setTripOpt("rondtrip")



  }

  const getfrom = () => {
    setOpen(true);
  }

  const getto = () => {
    setToopen(true);
  }

 const parentcalendarfuction = (data) => {
  setCalendar(data)

 //  console.log(data);
 }


 const parenttocalendarfuction = (data) => {
  setCalendartostatus(false)
  setTocalendar(data)

//  console.log(data);
}

 

  return (
    <div>
      <Header  headerDark={true}  />
      <div className='bannerBg'  >
        <div className='bannerInner'>
          <Container maxWidth="lg" className='bannerrow' style={{maxWidth : 1300}}> 
            <Typography className='title' style={{ textAlign : 'center', color : '#fff', fontSize : 30, marginBottom: 20 }}>Best Deals for Flight Booking in mytrippe</Typography>
          
            <Box className='bookingSlot'>
              <RadioGroup className='tripselect_option'
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={tripOpt}
                  onChange={handleRadioChange} >
                  <FormControlLabel className={tripOpt == 'oneway' ? 'active' : ""} value="oneway" control={<Radio sx={{ 
                    color: "#99999a",
                    '&.Mui-checked': {
                      color: "#f59625",
                    }, }}/>} label="One Way" />
                  <FormControlLabel value="rondtrip" className={tripOpt == 'rondtrip' ? 'active' : ""}  control={<Radio sx={{ 
                    color: "#99999a",
                    '&.Mui-checked': {
                      color: "#f59625",
                    }, }}/>} label="Round Trip" />
                  <FormControlLabel value="multicity" className={tripOpt == 'multicity' ? 'active' : ""}  control={<Radio sx={{ 
                    color: "#99999a",
                    '&.Mui-checked': {
                      color: "#f59625",
                    }, }}/>} label="Multi City" />
                </RadioGroup>

                <Box  component="form" className='inputWrapper'>
                  <div className='bookingStripe'>
                    
                    <div className='inputFrom booking_input' onClick={ getfrom } style={{ position : 'relative'}}>
                        <img src={require('../../assets/icons/flight.png')} className='flight_icon' />
                        <Typography component="span" className='label'>From</Typography>
                        <Typography className='placefrom inputTitle'>{searchfromselected.city} ({searchfromselected.iata})</Typography>
                        <Typography className='inputTagline'>{searchfromselected.iata}, {searchfromselected.city} {searchfromselected.airport}</Typography>


                    <Model open={ open } onClickOutside={() => {setOpen(false) ; setSuggestionfrom(false) }} >
                    <Box   className='dropdown_box'
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          '& > :not(style)': {
                            m: 0,
                            width: '100%',
                            height: 128,
                            zIndex : 10,
                            position  : 'absolute',
                            left : 0,
                            top : 47
                          },
                        }}
                      >
                        <Paper elevation={3} >
                           <Paper component="form" sx={{ p: 1.4, display: 'flex', alignItems: 'center', width: 'auto', 'box-shadow': '1px 2px 3px -1px #ccc' , position : 'relative'}}>
                            <IconButton sx={{ p: 0 }} aria-label="menu">
                                <SearchIcon />
                              </IconButton>
                              <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="From"
                                inputProps={{ 'aria-label': 'To' }}
                                 onChange={debouncedResults}
                              />
                           </Paper>
                           <Paper sx={{ height : 300 , overflowY:'auto'}} className='dropdown_box'>
                                { suggestionfrom  ? 
                                    <>
                                    <Typography component="p"  sx={{ paddingLeft: 1, fontSize : 13, paddingTop : 1 }}>Suggestion</Typography>
                                    <List className="flist_drop">
                                      { searchFrom && searchFrom.map((value , index)=>(
                                            <ListItem  key={value.iata}
                                            secondaryAction={ <div className="latoBold">{ value.iata }</div> }
                                            onClick = { () => { clickfrom(value) }  }
                                            >
                                            <ListItemAvatar style={{ minWidth : 38 }}>
                                              <FlightTakeoffIcon />
                                            </ListItemAvatar>
                                            <ListItemText sx={{ margin : 0 }} primary={<Froms value={value}/>} secondary={value.airport} />
                                          </ListItem>

                                      ))}
                                    </List>
                                  </> : 
                                  <>
                                  <Typography component="p" sx={{ paddingLeft: 1, fontSize : 13, paddingTop : 1  }}>Recent Search</Typography>
                                  
                                  <List sx={{ padding : 0 }}className="flist_drop"> 
                                    { searchFromlocalstorage && searchFromlocalstorage.map((value , index)=>(
                                        <ListItem  key={value.iata} style={{ 
                                          '.MuiListItem-root:hover' : {
                                            backgroundColor : '#ccc'
                                          }
                                        }}
                                          secondaryAction={ <div className="latoBold">{ value.iata }</div> }
                                          onClick = { () => { clickfrom(value) }  }
                                          >
                                          <ListItemAvatar style={{ minWidth : 38 }}>
                                            <FlightTakeoffIcon />
                                          </ListItemAvatar>
                                          <ListItemText sx={{ margin : 0 }}  primary={<Froms value={value}/>} secondary={value.airport} />
                                        </ListItem>

                                    ))}
                                  </List>
                                  </>
                                }
                            </Paper>


                        </Paper>
                        
                    </Box>
                    </Model>

                    </div>





                    
                   

                    
                    <div className='shiftfld'>
                      <IconButton aria-label="fingerprint" className='shiftbtn' color="secondary">
                        <img src={require('../../assets/icons/shiftarow.png')}  />
                      </IconButton>
                    </div>

                    <div className='inputFrom booking_input' onClick={ getto } style={{ position : 'relative'}}>
                        <img src={require('../../assets/icons/flight.png')} className='flight_icon down' />
                        <Typography component="span" className='label'>To</Typography>
                        <Typography className='placefrom inputTitle'>{searchtoselected.city} ({searchtoselected.iata})</Typography>
                        <Typography className='inputTagline'>{searchtoselected.iata}, {searchtoselected.city} {searchtoselected.airport}</Typography>

                {/* to */}
                  <Model open={ toopen } onClickOutside={() => {setToopen(false) ; setSuggestionto(false) }}   className='dropdown_box'>
                    <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          '& > :not(style)': {
                            m: 0,
                            width: '100%',
                            height: 128,
                            zIndex : 10,
                            position  : 'absolute',
                            left : 0,
                            top : 47,
                            'box-shadow' : '0px 6px 10px 0px #00000017'
                          },
                        }}
                      >
                        <Paper>
                           <Paper component="form" sx={{ p: 1.4, display: 'flex', alignItems: 'center', 'box-shadow': '1px 2px 3px -1px #ccc', position: 'relative' ,width: 'auto' }}>
                           <IconButton sx={{ p: 0 }} aria-label="menu">
                                <SearchIcon />
                              </IconButton>
                              <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="To"
                                inputProps={{ 'aria-label': 'From' }}
                                 onChange={debouncedResultsto}
                              />
                           </Paper>
                           <Paper sx={{ height : 300 , overflowY:'auto'}} className='dropdown_box'>
                                 { suggestionto  ? 
                                  <>
                                    <Typography component="p" sx={{ paddingLeft: 1, fontSize : 13, paddingTop : 1  }}>Suggestion</Typography>
                                    
                                      <List sx={{ padding : 0 }}className="flist_drop">
                                        { searchTo && searchTo.map((value , index)=>(
                                              <ListItem  key={value.iata}
                                              secondaryAction={ <div className="latoBold">{ value.iata }</div> }
                                              onClick = { () => { clickto(value)  }  }
                                              >
                                              <ListItemAvatar style={{ minWidth : 38 }}>
                                                <FlightTakeoffIcon />
                                              </ListItemAvatar>
                                              <ListItemText  sx={{ margin : 0 }} primary={<Froms value={value}/>} secondary={value.airport} />
                                            </ListItem>

                                        ))}
                                      </List>
                                  </>  : 
                                  <>
                                  <Typography component="p" sx={{ paddingLeft: 1, fontSize : 13, paddingTop : 1  }}>Recent Search</Typography>
                                  <List sx={{ padding : 0 }} className="flist_drop">
                                    { searchTolocalstorage && searchTolocalstorage.map((value , index)=>(
                                        <ListItem  key={value.iata}
                                          secondaryAction={ <div className="latoBold">{ value.iata }</div> }
                                          onClick = { () => { clickto(value) }  }
                                          >
                                          <ListItemAvatar style={{ minWidth : 38 }}>
                                            <FlightTakeoffIcon />
                                          </ListItemAvatar>
                                          <ListItemText sx={{ margin : 0 }}  primary={<Froms value={value}/>} secondary={value.airport} />
                                        </ListItem>

                                    ))}
                                  </List>
                                          </>
                                }
                            </Paper>


                        </Paper>
                        
                    </Box>
                    </Model>



                    </div>

                    <div className='departure booking_input bookingCalendar_parent' onClick={changeCalendar}>
                        <Box  >
                          <Typography component="span" className='label'>Departure</Typography>
                          <Typography className='placeto inputTitle'>{ moment(calendar).format("DD MMM YY") }</Typography>
                          <Typography className='inputTagline'>{ moment(calendar).format("dddd") }</Typography>
                        </Box>
                        
                        <Calendar calendarOpen = {calendarOpen}  onClickOutside={ ()=> setCalendarOpen(false)  } _parentcalendarfuction={parentcalendarfuction}/>
                    </div>


                    <div className='return booking_input' onClick={changeCalendarto}>
                      { calendartostatus  &&   
                        <Box  >
                          <Typography component="span" className='label'>Return </Typography>
                          <Typography className='placeto inputTitle'>Tap to add a return</Typography>
                          <Calendar calendarOpen = {calendarOpento}  onClickOutside={ ()=>  setCalendarOpento(false)   } _parentcalendarfuction={parenttocalendarfuction}/>

                        </Box>
                        }

                        { !calendartostatus  &&   
                        <Box  >
                          <Typography component="span" className='label'>Return</Typography>
                          <Typography className='placeto inputTitle'>{ moment(tocalendar).format("DD MMM YY") }</Typography>
                          <Typography className='inputTagline'>{ moment(tocalendar).format("dddd") }</Typography>
                          <Calendar calendarOpen = {calendarOpento}  onClickOutside={ ()=> setCalendarOpento(false)  } _parentcalendarfuction={parenttocalendarfuction}/>

                        </Box>
                        }


                    </div>

                    <div className='traverler booking_input' style={{ position : 'relative'}} onClick={ ()=> setPassangeropen(true) }>
                        <Typography component="span" className='label'>Travellers & Class</Typography>
                        <Typography className='placeto inputTitle'>1 Adult</Typography>
                        <Typography className='inputTagline'>Economy</Typography>

                        <Model open={passangeropen} onClickOutside={()=> setPassangeropen(false)}>
                              <Box
                              className='dropdown_box'
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                '& > :not(style)': {
                                  m: 0,
                                  width: '35rem',
                                  // height: 250,
                                  padding : 3,
                                  zIndex : 10,
                                  position  : 'absolute',
                                  left : -300 ,
                                  top : 47,
                                  'box-shadow' : '0px 6px 10px 0px #00000017'
                                  
                                },
                              }}
                              >
                                <Paper elevation={2}>
                                  <Grid container justifyContent="space-between" sx={{ paddingLeft : 2 , paddingRight : 2 , marginBottom : 3}}>
                                    <Grid Item  xs={4} sx={{ paddingRight : 2, paddingLeft : 2}}>
                                        <Typography  className='adult_title' m={1}> Adult  </Typography>
                                        <Paper className='adult_list' sx={{display:'flex', justifyContent : 'space-around' , alignItems : 'center',width : '100%' , height : 40 ,borderRadius : 20 }}>
                                            <Typography variant="h5"  onClick={ ()=> setTravellerclass(state=> ({...state,ADULT : state.ADULT > 1 ? state.ADULT - 1 : 1 }) )  } > - </Typography>
                                            <Typography> {travellerclass.ADULT} </Typography>
                                            <Typography variant="h5" onClick={ ()=> setTravellerclass(state=> ({...state,ADULT : state.ADULT + 1 }) ) }> + </Typography>
                                        </Paper>

                                    </Grid>
                                    <Grid Item  xs={4} sx={{ paddingRight : 2, paddingLeft : 2}}>
                                        <Typography className='adult_title' m={1}>Child</Typography>
                                        <Paper className='adult_list'  sx={{display:'flex', justifyContent : 'space-around' , alignItems : 'center',width : '100%' , height : 40 ,borderRadius : 20 }}>
                                              <Typography variant="h5" onClick={ ()=> setTravellerclass(state=> ({...state,CHILD : state.CHILD > 0 ? state.CHILD - 1 : 0 }) )  }> - </Typography>
                                              <Typography> {travellerclass.CHILD}  </Typography>
                                              <Typography variant="h5" onClick={ ()=> setTravellerclass(state=> ({...state,CHILD : state.CHILD + 1 }) ) }> + </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid Item sx={{ paddingRight : 2, paddingLeft : 2}}  xs={4}>
                                        <Typography className='adult_title' m={1}>Infant</Typography>
                                        <Paper className='adult_list'  sx={{display:'flex', justifyContent : 'space-around' , alignItems : 'center',width : '100%' , height : 40 ,borderRadius : 20 }}>
                                            <Typography variant="h5" onClick={ ()=> setTravellerclass(state=> ({...state,INFANT : state.INFANT > 0 ? state.INFANT - 1 : 0 }) )  }> - </Typography>
                                            <Typography> {travellerclass.INFANT}  </Typography>
                                            <Typography variant="h5" onClick={ ()=> setTravellerclass(state=> ({...state,INFANT : state.INFANT + 1 }) ) }> + </Typography>
                                        </Paper>
                                    </Grid>

                                  </Grid>


                                  <Divider  />

                                  <Typography className='adult_title' m={2 }>Travel Class</Typography>

                                   <Grid container justifyContent="space-around" mb={2}>
                                     <Grid Item><Button className={ (travelclass == "Economy" ? "color_secondary" : "outline_gray") } variant={ (travelclass == "Economy" ? "contained" : "outlined") } onClick={ ()=> setTravelclass("Economy") } >Economy</Button></Grid>
                                     <Grid Item><Button className={ (travelclass == "Premium Economy" ? "color_secondary" : "outline_gray") }  variant={ (travelclass == "Premium Economy" ? "contained" : "outlined") } onClick={ ()=> setTravelclass("Premium Economy") }>Premium Economy</Button></Grid>
                                     <Grid Item><Button className={ (travelclass == "Business" ? "color_secondary" : "outline_gray") }  variant={ (travelclass == "Business" ? "contained" : "outlined") } onClick={ ()=> setTravelclass("Business") }>Business</Button></Grid>
                                     <Grid Item><Button className={ (travelclass == "First Class" ? "color_secondary" : "outline_gray") }  variant={ (travelclass == "First Class" ? "contained" : "outlined") } onClick={ ()=> setTravelclass("First Class") }>First Class</Button></Grid>
                                   </Grid>

                                   <Divider  />

                                   <Grid container justifyContent="end" spacing={2} mt={3}>
                                    <Grid Item md={3 } sx={{ paddingRight : 2 }}>
                                      <Button className='btnt_gray empty' fullWidth={true}onClick={ ()=> setTimeout(()=>setPassangeropen(false),50)  }>Cancel</Button>
                                    </Grid>
                                    <Grid Item md={3}>
                                      <Button variant="contained" className='color_primary' fullWidth={true} onClick={ ()=> setTimeout(()=>setPassangeropen(false),50)  }>Done</Button>
                                    </Grid>

                                   </Grid>
                                </Paper>
                              </Box>
                      
                        </Model>
                    </div>
                  </div>

                  {/* fare type and prefered row */}
                  <Box className='preferedStripe'>
                    <div className='leftBox' style={{ display : 'flex', flexDirection : 'row', alignItems: 'center' }}>
                      <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard" className='prefred_select'>
                        <Select
                          labelId="demo-simple-select-error-label"
                          id="demo-simple-select-error"
                          value={preferedAirline}
                          onChange={handleChange}
                        >
                          <MenuItem value={"none"}> Select Prefered Airline </MenuItem>
                          <MenuItem value={"ac"}>Ac</MenuItem>
                          <MenuItem value={"nonac"}>Non Ac</MenuItem>
                          <MenuItem value={"sleeper"}>Sleeper</MenuItem>
                        </Select>
                      </FormControl>

                        

                    <FormControlLabel
                              value="end"
                              control={<Checkbox
                                checked={stopchecked}
                                onChange={stophandleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />}
                              label="Direct Flight"
                              labelPlacement="end"
                            />


                      {/* <RadioGroup row value={"directflight"}>
                        <FormControlLabel value="directflight" control={<Radio sx={{ 
                            '& .MuiSvgIcon-root': {
                              fontSize: 15,
                            },
                            color: "#99999a",
                            '&.Mui-checked': {
                              color: "#f59625",
                            }, }}/>} label="Direct Flight" />
                      </RadioGroup> */}
                    </div>  

                    <div className='rightBox'>
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
                  {/* END fare type and prefered row */}


                  {/* recent searches */}
                  <Box className='recentSearchrow'> 
                      <Typography className='label'>Recent Searches : </Typography> 

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 5, marginRight : 5 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Bangaluru </Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Coimbatore</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>

                      <div className='searchItem'>
                        <div className='textRow'>
                          <Typography component={"span"}>Coimbatore</Typography>
                          <img style={{ width  : 18, marginLeft: 2, marginRight : 2 }} src={require('../../assets/icons/shiftarow.png')} className='arrowicon'/>
                          <Typography component={"span"}>Bangaluru</Typography>
                        </div>
                        <Typography className='date'>6 May 22 - 8 May 22</Typography>
                      </div>
                  </Box>
                  {/* END recent searches */}
                </Box>

                <Box className='boxAction' > 
                  <Button className='searchButton' variant='contained' onClick={() => coursesPage()}>Search Flights</Button>
                </Box>
            </Box>
          </Container>
        </div>
      </div>


      {/* background empty */}
      <Box className='emptyBoxBanner'>

      </Box>

      <Box className='discountSection'>
          <Container >
            <Typography className='discount_title'>Flight Discounts For You</Typography>
            <Grid container spacing={2} direction="row">
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn' fullWidth={true}>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn'>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn'>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card">
                <Box className='card_inner'>
                  <Box component={'div'} className={'logo'}></Box>
                    <Typography className='discount_cont'>Grab flat 15% on domestic flights</Typography>
                    <Typography className='subtitle'>Grab flat 15% on domestic flights</Typography>
                    <Button className='promoCodeBtn'>Use Code: <Typography className='promoCode'>mmmtaxmex</Typography></Button>
                </Box>
              </Grid>
              <Grid item  className="discount_card add_discount">
                <Box className='card_inner'> 
                    <Typography className='offersCount'>+ 20</Typography>
                    <Typography className='moreoffer'>More Offers</Typography> 
                </Box>
              </Grid>
            </Grid>
          </Container>
      </Box>


      <Box className='contentSection'>
          <Container>
            <Typography style={{ textTransform : 'uppercase' }} className='title' component={'div'}>Product Offering</Typography>
            <Typography className=''>Flights, International Flights, Charter Flights, Hotels, International Hotels, Homestays and Villas, Activities, Holidays In India, International Holidays, Book Hotels From UAE, myBiz for SME Travel, Book Flights
From US, Book Flights From UAE, Trip Planner, Gift Cards, Trip Money, Trip Ideas, Travel Blog.</Typography>
            
            <Box className='faqSection'>
              <Typography className='title' component={'div'}>Q. FAQs on Online Flight Booking</Typography>
              <Typography className='subitle'>Q. How can I book a cheap flight on mytrippe?</Typography>
              <Typography >A: Head to Yatra’s Flights section and choose whether it is a one-way, round-trip or multi-city trip. Enter your departure city and arrival city, followed by the date of travel, return date in case relevant, number
of passengers and select your chosen class of travel, and then search flights. In the subsequent page you will be able to see all flights for your dates. In the filter panel on top, you can adjust the price bar
and apply filters. The following page will give you flights that fall within your budget across airlines. Check the tariff, compare schedule and zero in on the one you would like to book. Choose from economy
and best value fare, with the best value fare letting you make free cancellation. Click the fare you prefer and book it. Further, enter the passenger details, and land on the payment gateway to make the
payment. When the payment is successful, your e-ticket is sent to your registered email id by the Yatra team.</Typography>

              <Typography className='subitle'>Q. How can I book a cheap flight on mytrippe?</Typography>
              <Typography >A: In light of the pandemic, the government has made it mandatory to do your web check-in ahead of arriving at the airport to catch your flight, for both domestic and international. This is to minimise contact,
and propagate safer travels. To do your web check-in you can head to the airline’s web check-in page, enter the booking reference number, date of travel and begin the check-in process. Enter the passenger
names you would like to check-in. Select the seats from the seat map. Once the seats are allocated to you, you can save the summary in your mailbox or take a print-out of the same.</Typography>
              
              <Typography className='subitle'>Q. Is it mandatory to show an RT-PCR report at the airport before flying?</Typography>
              <Typography >A: For both domestic and international travels, it is mandatory to do an RT-PCR test typically 48 hours ahead of your flight’s scheduled departure. You need to furnish the negative report at the origin airport
ahead of boarding your flight. For various international destinations, you would have to submit the RT-PCR report complete with a QR code. All reports need to be signed and stamped by an ICMR-approved
laboratory.</Typography>

              <Typography className='subitle'>Q. How can I claim a flight refund on mytrippe?</Typography>
              <Typography >A: There are two conditions to claim a refund. First, if the airline directly cancels the flight, and second, if the passenger has cancelled his flight directly with the airline. If the airline cancels the flight you can
claim a full refund. But if the passenger cancels the flight on his own, then airline and Yatra will both charge the same amount of penalty. The refund claiming process is fairly simple. Sign in and head to the
My Bookings page and in the dashboard you can select the claim refund option. Click on claim refund and check the flight for which you wish to claim refund. Further, select the reason for your claim. Go
through the refund details, and click ‘submit’. You can even claim refund for just one passenger among a set of passengers. Just select the passenger details, the sector, and cancel the ticket.</Typography>
            </Box>
          </Container>
      </Box>


      <Footer />
    </div>
  )
}


