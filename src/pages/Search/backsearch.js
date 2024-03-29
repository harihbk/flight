import React from 'react';
import Header from '../../components/header';
import { useNavigate  } from "react-router-dom";
import { Container,IconButton, Box, Typography,Button, Grid, Divider } from '@mui/material';
import { FormControlLabel, RadioGroup, Radio, Tab, Tabs} from '@mui/material';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { KeyboardArrowDown } from '@mui/icons-material';
import './styles.css';
import { ArrowRightAlt } from '@mui/icons-material';
import Footer from '../../components/Footer/Footer';
import { motion } from "framer-motion";
import Sidemenu from '../../components/Sidemenu/Sidemenu';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrowicon.svg';
import moment from 'moment'
import axios from 'axios';  
import { useSearchParams } from 'react-router-dom';
import { debounce } from "lodash"
import Searchmenuskeleton from "./Searchmenuskeleton"


function Flightdetails(rest){

    return (
         <>
        { rest?._flightdetail?.map((flightdetail , flightdetailindex)=>(
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
        )) 
        } 
        </>
       

    );

     
}


function Faredetails(...rest){
    let { value , _paxtypeget } = rest[0] || ''
    let data = value.filter( x => x.checked == true )[0]
    

    const calculatetotalamount = (data,index)=>{
        let tot = 0;
        if(data?.fd?.ADULT){
            tot += data?.fd?.ADULT?.fC?.TF * _paxtypeget.ADULT
        }
        if(data?.fd?.CHILD){
            tot += data?.fd?.CHILD?.fC?.TF * _paxtypeget.CHILD
        }
        if(data?.fd?.INFANT){
            tot += data?.fd?.INFANT?.fC?.TF * _paxtypeget.INFANT
        }
        return tot.toLocaleString(undefined,{minimumFractionDigits: 2})
    }


    return (
        <>
         <Grid container direction="row" justifyContent="space-between">
             <Grid item> 
             <Typography variant="h6">TYPE</Typography>
             </Grid>
             <Grid item> 
             <Typography variant="h6">Fare</Typography>
             </Grid>
             <Grid item> 
             <Typography variant="h6">Total</Typography>
             </Grid>
         </Grid>


        { data?.fd?.ADULT && 
            <>
                <Grid container direction="row" justifyContent="space-between" >
                    <Typography >Fare Details for Adult (CB: L)</Typography>
                    </Grid>
                    <Grid container direction="row" justifyContent="space-between" mb={2}>
                        <Grid item> 
                        <Typography>Base Price</Typography>
                        <Typography> Taxes and fees</Typography>
                        </Grid>

                        <Grid item> 
                        <Typography >₹ {data?.fd?.ADULT?.fC?.BF} x {_paxtypeget.ADULT}</Typography>
                        <Typography >₹ {data?.fd?.ADULT?.fC?.TAF} x {_paxtypeget.ADULT}</Typography>
                        </Grid>

                        <Grid item> 
                        <Typography >₹{data?.fd?.ADULT?.fC?.BF * _paxtypeget.ADULT}</Typography>
                        <Typography >₹{data?.fd?.ADULT?.fC?.TAF * _paxtypeget.ADULT}</Typography>
                        </Grid>
                </Grid>
            </>
        }


        { data?.fd?.CHILD && 
                    <>
                        <Grid container direction="row" justifyContent="space-between" >
                            <Typography >Fare Details for Child (CB: L)</Typography>
                            </Grid>
                            <Grid container direction="row" justifyContent="space-between" mb={2}>
                                <Grid item> 
                                <Typography>Base Price</Typography>
                                <Typography> Taxes and fees</Typography>
                                </Grid>

                                <Grid item> 
                                <Typography >₹ {data?.fd?.CHILD?.fC?.BF} x {_paxtypeget.CHILD}</Typography>
                                <Typography >₹ {data?.fd?.CHILD?.fC?.TAF} x {_paxtypeget.CHILD}</Typography>
                                </Grid>

                                <Grid item> 
                                <Typography >₹{data?.fd?.CHILD?.fC?.BF * _paxtypeget.CHILD}</Typography>
                                <Typography >₹{data?.fd?.CHILD?.fC?.TAF * _paxtypeget.CHILD}</Typography>
                                </Grid>
                        </Grid>
                    </>
                }
        

        { data?.fd?.INFANT && 
                    <>
                        <Grid container direction="row" justifyContent="space-between" >
                            <Typography >Fare Details for Infant (CB: L)</Typography>
                            </Grid>
                            <Grid container direction="row" justifyContent="space-between" mb={2}>
                                <Grid item> 
                                <Typography>Base Price</Typography>
                                <Typography> Taxes and fees</Typography>
                                </Grid>

                                <Grid item> 
                                <Typography >₹ {data?.fd?.INFANT?.fC?.BF} x {_paxtypeget.INFANT}</Typography>
                                <Typography >₹ {data?.fd?.INFANT?.fC?.TAF} x {_paxtypeget.INFANT}</Typography>
                                </Grid>

                                <Grid item> 
                                <Typography >₹{data?.fd?.INFANT?.fC?.BF * _paxtypeget.INFANT}</Typography>
                                <Typography >₹{data?.fd?.INFANT?.fC?.TAF * _paxtypeget.INFANT}</Typography>
                                </Grid>
                        </Grid>
                    </>
                }


         <Divider/>
         <Grid container direction="row" justifyContent="space-between">
             <Grid item>Total</Grid>
             <Grid item>₹{calculatetotalamount(data)} </Grid>
         </Grid>



        </>
    )

}


export default function Search({ isVisible }) {
    const [fareType, setFareType] = React.useState('regular');
    const [tripType, setTripType] = React.useState('oneway');
    const [flightGo, setFlightGo] = React.useState('flight_go1');
    const [flightReturn, setFlightReturn] = React.useState('flight_return1');
    const [tabValue, setTabValue] = React.useState();  
    const [ listflight , setListflight ] = React.useState([]);
    const [ listflightfilter , setListflightfilter ] = React.useState([]);

    const [ location , setLocation ] = React.useState([]);
    const [ paxtypeget , setPaxtypeget ] = React.useState([]);
    const [ cabinClassget , setCabinClassget ] = React.useState("");
    const [ minmaxprice , setMinmaxprice ] = React.useState(0);
    const [ airline , setAirline ] = React.useState([])


    //fare detail click by radio button

    const navigate = useNavigate(); 

    const [searchParams] = useSearchParams();


    React.useEffect(()=>{

        var itinerary = searchParams.get('itinerary');
        var tripType = searchParams.get('tripType');
        var paxType = searchParams.get('paxType');
        var cabinClass = searchParams.get('cabinClass');
        var stops = searchParams.get('stops');
        var pft = searchParams.get('pft');

        var location = searchParams.get('location');
        setLocation(location.split("-"));
        // set trip tyoe from url
        setTripType(tripType)


        /**
         * function to create object
         * **/

        const CreateObject = (data) => {
            let split = data.split("-");
            let Obj =  {	
                                fromCityOrAirport: {
                                  code: split[0]
                                },
                                toCityOrAirport: {
                                  code: split[1]
                                },
                                travelDate: moment(split[2]).format("YYYY-MM-DD") 
                        }
                return Obj        
        }

        const CreateObjectround = (data , key , top ) => {
           
            let split = data.split("-");
            let Obj;
            if( key == 0 ){
                 Obj =  {	
                    fromCityOrAirport: {
                      code: split[0]
                    },
                    toCityOrAirport: {
                      code: split[1]
                    },
                    travelDate: moment(split[2]).format("YYYY-MM-DD") 
                        }
            } else {
                let prev = top[key-1].split("-");

                Obj =  {	
                    fromCityOrAirport: {
                      code: prev[1]
                    },
                    toCityOrAirport: {
                      code: split[0]
                    },
                    travelDate: moment(split[2]).format("YYYY-MM-DD") 
                        }

            }
            
                return Obj        
        }

        /**
         * function to modify paxtype
         * **/

        const paxTypefn = data => {
            const topData =  data.split("_");
            let obj = {}
            for (const key in topData) {
                let childdata = topData[key].split("-");
                switch (childdata[0]){
                    case "A":
                    obj.ADULT = childdata[1]
                    break; 
                    case "C":
                    obj.CHILD = childdata[1]
                    break; 
                    case "I":
                    obj.INFANT = childdata[1]
                    break; 
                }
            }
            return obj;
        }

        /**
         * Arrange Object to get list of flights
         * **/

        var CreatesearchObject = {}
            CreatesearchObject.searchQuery = {}
            CreatesearchObject.searchQuery.routeInfos = []
            CreatesearchObject.searchQuery.cabinClass = cabinClass;
            CreatesearchObject.searchQuery.paxInfo = paxTypefn(paxType)
            setPaxtypeget(CreatesearchObject.searchQuery.paxInfo) // store paxtype to get outside of use effect
            setCabinClassget(cabinClass)
            CreatesearchObject.searchQuery.searchModifiers = {}
            


        if(tripType == "oneway") {
            let top = itinerary.split("_");
            for (const key in top) {
                CreatesearchObject.searchQuery.routeInfos.push(CreateObject(top[key]))
            }
        }

        if(tripType == "rondtrip") {
            let top = itinerary.split("_");
            for (const key in top) {
                CreatesearchObject.searchQuery.routeInfos.push(CreateObjectround(top[key] , key , top))
            }
        }

        if(stops == 0){
            CreatesearchObject.searchQuery.searchModifiers.isDirectFlight = true;
            CreatesearchObject.searchQuery.searchModifiers.isConnectingFlight = false;
        } else {
         //   CreatesearchObject.searchQuery.searchModifiers.isDirectFlight = true;
          //  CreatesearchObject.searchQuery.searchModifiers.isConnectingFlight = true;
        }


         /**
         * Arrange Object to get list of flights
         * **/


         /**
          * Trigger API for search flight
          * **/

            const headers = {
                'Content-Type': 'application/json',
                'apikey': process.env.REACT_APP_FLIGHT_API_KEY
            }

                    axios.post(`${process.env.REACT_APP_FLIGHT_URL}/fms/v1/air-search-all`,CreatesearchObject , { headers : headers}  ).then(res=>{
                        console.log(res);
                        let data = res?.data?.searchResult?.tripInfos?.ONWARD
                        let datadup = res?.data?.searchResult?.tripInfos?.ONWARD
                        let dataround = res?.data?.searchResult?.tripInfos?.COMBO

                if (datadup) {
                        var modifieddata = datadup.map((dd , i )=>{
                            let dept_obj = {
                                                timing    : moment(dd?.sI[0]?.dt).format("HH:mm"),
                                                timewords : moment(dd?.sI[0]?.dt).format("MMMM DD"),
                                                city      : dd?.sI[0]?.da?.city,
                                                name : dd?.sI[0]?.fD?.aI?.name
                                            }

                            let arrival_obj = {
                                                timing    : moment(dd?.sI[dd?.sI.length - 1]?.at).format("HH:mm"),
                                                timewords : moment(dd?.sI[dd?.sI.length - 1]?.at).format("MMMM DD") ,
                                                city      : dd?.sI[dd?.sI.length - 1]?.aa?.city,
                                                name : ''
                                            }

                                            let paxt = paxTypefn(paxType)

                            if(dd.totalPriceList.length == 1 ){
                                 dd.totalPriceList[0].checked = true
                                 dd.totalPriceList[0].totalamount = calculatetotalamount1(dd.totalPriceList[0] , paxt)
                            } else if(dd.totalPriceList.length > 1){
                                dd.totalPriceList[0].checked = true
                                dd.totalPriceList[0].totalamount = calculatetotalamount1(dd.totalPriceList[0] , paxt)
                                for(var ii = 1; ii < dd?.totalPriceList?.length ; ii++ ){
                                    dd.totalPriceList[ii].checked = false
                                    dd.totalPriceList[ii].totalamount = calculatetotalamount1(dd.totalPriceList[ii] , paxt)
                                }
                            }

                           let swallowcopy = {...dd}
                            //  console.log(swallowcopy);

                            let flightdetails =swallowcopy?.sI.map((flightdetail , flightdetailindex)=>{
                                return {
                                    flightname : flightdetail?.oB?.name,
                                    flightcodefn :  `${flightdetail?.fD?.aI?.code}-${flightdetail?.fD?.fN}`,
                                    flightdetaildt : {
                                        dt : moment(flightdetail?.dt).format('MMM DD,ddd, HH:mm'),
                                        citycountry : `${flightdetail?.da?.city},${flightdetail?.da?.country}`,
                                        name : flightdetail?.da?.name,
                                        termianl : flightdetail?.da?.terminal

                                    },
                                    duration : twodatetimediff(flightdetail?.dt,flightdetail?.at),
                                    flightdetailat : {
                                        at : moment(flightdetail?.at).format('MMM DD,ddd, HH:mm'),
                                        citycountry : `${flightdetail?.aa?.city}-${flightdetail?.aa?.country}`,
                                        name : flightdetail?.aa?.name,
                                        termianl : flightdetail?.aa?.terminal
                                    },
                                    layoverduration : twodatetimediff(flightdetail?.at , dd?.sI[flightdetailindex+1]?.dt )
                                   
                                }
                            })
                   
                            return {
                                unique : i ,
                                dept_obj : dept_obj,
                                flight_code :  dd?.sI.map((indata,ind) => (
                                    `${indata?.fD?.aI?.code} ${indata?.fD?.fN}${ dd?.sI?.length -1 == ind ? '' : ',' }`
                                    )),
                                duration : calculateTime(dd?.sI),
                                stopwords : dd?.sI?.length == 1 ? 'Non Stop' : `${dd?.sI?.length - 1 } Stop(s)` ,
                                stopinnumber : dd?.sI?.length == 1 ? 0 : dd?.sI?.length - 1 ,
                                arrival_obj  : arrival_obj,
                                totalPriceList : dd.totalPriceList,
                                flightdetails : flightdetails,
                                dt_date : swallowcopy?.sI[0]?.dt,
                                at_date : swallowcopy?.sI[swallowcopy?.sI?.length-1]?.at,
                                minduration : calculateTimemiutes(dd?.sI)

                            }
                        })
                     //   
                    modifieddata.sort(function(a, b) {
                        var c = a.totalPriceList[0].totalamount;
                        var d = b.totalPriceList[0].totalamount;
                        return  c-d 
                    });
                    let swaldeep = [...modifieddata]
                    const unique = [...new Set(swaldeep.map(item => item.dept_obj.name))]
                                    .map(i=>  swaldeep.filter(tt => tt.dept_obj.name == i) )
                                    .map(ii => ii.reduce((prev,curr)=> prev.totalPriceList[0].totalamount < curr.totalPriceList[0].totalamount ? prev : curr) 
                                    ).map(iii => ( {...iii , cnt :   swaldeep.filter(iif => iif.dept_obj.name == iii.dept_obj.name).length     } ) )
                    setAirline(unique)
                    setListflight(modifieddata)
                    setListflightfilter(modifieddata)
                    setMinmaxprice(Math.round(swaldeep[swaldeep.length - 1].totalPriceList[0].totalamount)) //  pass min max price to popular search


            } 

            // round trip

            if( dataround ) {

                
            }









                    }).catch(err=>{
                        console.log(err);
                    })
                
        


    },[])


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


    /**
     * radio button change event
     * 
     * **/

    const radiochangeevent = (parentindex ,data , e) => {


        let target_id = e.target.value
        let unmutate = [...listflight]
        unmutate[parentindex]['totalPriceList'].map(idd => idd.checked = false )
        let plindex = unmutate[parentindex]['totalPriceList'].findIndex( x => x.id == target_id)
        unmutate[parentindex]['totalPriceList'][plindex].checked = true
      //  setListflight(unmutate)
        setListflightfilter(unmutate)


    }

    /**
     * calculatr time between
     * **/



    const calculateTime = ( data ) => {
        const minduration = data?.reduce((acc,curr)=> acc+curr.duration ,0 )
        var hours = 0;
        var minutes = 0;

        for (let index = 0; index < data?.length - 1; index++) {
            let at = data[index]?.at  
            let dt = data[index+1]?.dt
            var startTime=moment(at , "YYYY-MM-DD hh:mm");
            var endTime=moment(dt, "YYYY-MM-DD hh:mm");

            var duration = moment.duration(endTime.diff(startTime));
            hours += parseInt(duration.asHours()) ;
            minutes += parseInt(duration.asMinutes()) % 60;
        }
        var tot =  minduration+hours * 60 + minutes; 
        return `${Math.floor(tot / 60)}h ${tot % 60}m`
    }

    const calculateTimemiutes = ( data ) => {
        const minduration = data?.reduce((acc,curr)=> acc+curr.duration ,0 )
        var hours = 0;
        var minutes = 0;

        for (let index = 0; index < data?.length - 1; index++) {
            let at = data[index]?.at  
            let dt = data[index+1]?.dt
            var startTime=moment(at , "YYYY-MM-DD hh:mm");
            var endTime=moment(dt, "YYYY-MM-DD hh:mm");

            var duration = moment.duration(endTime.diff(startTime));
            hours += parseInt(duration.asHours()) ;
            minutes += parseInt(duration.asMinutes()) % 60;
        }
        var tot =  minduration+hours * 60 + minutes; 
        return ( Math.floor(tot / 60) * 60 ) + (tot % 60) 
    }




    const twodatetimediff = (start,end) => {
        var startTime=moment(start , "YYYY-MM-DD hh:mm");
        var endTime=moment(end, "YYYY-MM-DD hh:mm");

        var duration = moment.duration(endTime.diff(startTime));
        var hours = parseInt(duration.asHours()) ;
        var minutes = parseInt(duration.asMinutes()) % 60;

        return `${hours}h ${minutes}m`
    }

    const calculatetotalamount = (data,index)=>{

        let tot = 0;
        if(data?.fd?.ADULT){
            tot += data?.fd?.ADULT?.fC?.TF * paxtypeget?.ADULT 
        }
        if(data?.fd?.CHILD){
            tot += data?.fd?.CHILD?.fC?.TF * paxtypeget?.CHILD
        }
        if(data?.fd?.INFANT){
            tot += data?.fd?.INFANT?.fC?.TF * paxtypeget?.INFANT
        }

        return tot.toLocaleString(undefined,{minimumFractionDigits: 2})
    }

    const calculatetotalamount1 = (data,_paxtypeget)=>{
        let tot = 0;
        if(data?.fd?.ADULT){
            tot += data?.fd?.ADULT?.fC?.TF * _paxtypeget.ADULT
        }
        if(data?.fd?.CHILD){
            tot += data?.fd?.CHILD?.fC?.TF * _paxtypeget.CHILD
        }
        if(data?.fd?.INFANT){
            tot += data?.fd?.INFANT?.fC?.TF * _paxtypeget.INFANT
        }
        return tot
    }

    

    const [ sortingstatus , setSortingstatus ] = React.useState(false);

    const sorting = type => {

        var unmutatee = [...listflightfilter]

        switch (type) {
            case "depature":
                unmutatee.sort(function(a, b) {
                    var c = new Date(a.dt_date);
                    var d = new Date(b.dt_date);
                    return sortingstatus == 0 ? c-d : d-c
                });
            break;

            case "duration" :
                unmutatee.sort(function(a, b) {
                    var c = a.minduration;
                    var d = b.minduration;
                    return sortingstatus == 0 ? c-d : d-c
                });
            break;

            case "arrival" :
                unmutatee.sort(function(a, b) {
                    var c = new Date(a.at_date);
                    var d = new Date(b.at_date);
                    return sortingstatus == 0 ? c-d : d-c
                });
            break;

            case "price" :

                unmutatee.sort(function(a, b) {
                    var c = a.totalPriceList[0].totalamount;
                    var d = b.totalPriceList[0].totalamount;
                    return sortingstatus == 0 ? c-d : d-c
                });

            break;

        }
        setSortingstatus(sortingstatus => !sortingstatus)
      //  setListflight(unmutatee)
        setListflightfilter(unmutatee)

    }


    /**
     * Popular Search
     * **/


    const filter = (imm , ranger , depature , arrival) => {

        const unmutatee = [...listflight]
        var filterrecord;

        if(imm.length > 0 ) {
            var sorted = imm.sort((a,b)=>a-b)
            let arrOfNum = sorted.map(str => {
                return Number(str);
              });
            var len =  arrOfNum.length; 
            if(len > 2){
                 arrOfNum.slice(-1)
            }
                
            filterrecord =  unmutatee.filter(function(t){
                if(arrOfNum.includes(t.stopinnumber)){
                    return true
                }
                if(len > 2){
                    return t.stopinnumber >=2
                }
                return false;
            });
        } else {
            filterrecord = unmutatee
        }


        if( ranger[1].label) {
            let pr = ranger[1].label;          
            let ft = pr.replace(/\,/g,'')
            filterrecord = filterrecord.filter(t=>  t.totalPriceList[0].totalamount <= ft);
        } else {
            filterrecord = unmutatee
        }


        if(depature.length > 0){

            var format = 'HH:mm';

            // var time = moment() gives you current time. no format required.
           

            filterrecord =  filterrecord.filter(function(t){
                
                if(depature.includes(1)){
                    let time = moment(t?.dept_obj?.timing,format),
                    beforeTime = moment('00:59', format),
                    afterTime = moment('00:06', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }

                if(depature.includes(2)){
                    let time = moment(t?.dept_obj?.timing,format),
                    beforeTime = moment('06:00', format),
                    afterTime = moment('12:59', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }

                if(depature.includes(3)){
                    let time = moment(t?.dept_obj?.timing,format),
                    beforeTime = moment('12:00', format),
                    afterTime = moment('18:59', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }

                if(depature.includes(4)){
                    let time = moment(t?.dept_obj?.timing,format),
                    beforeTime = moment('18:00', format),
                    afterTime = moment('00:59', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }


            })


        }




        if(arrival.length > 0){

            var format = 'HH:mm';

            // var time = moment() gives you current time. no format required.
           

            filterrecord =  filterrecord.filter(function(t){
                
                if(arrival.includes(1)){
                    let time = moment(t?.arrival_obj?.timing,format),
                    beforeTime = moment('00:59', format),
                    afterTime = moment('00:06', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }

                if(arrival.includes(2)){
                    let time = moment(t?.arrival_obj?.timing,format),
                    beforeTime = moment('06:00', format),
                    afterTime = moment('12:59', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }

                if(arrival.includes(3)){
                    let time = moment(t?.arrival_obj?.timing,format),
                    beforeTime = moment('12:00', format),
                    afterTime = moment('18:59', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }

                if(arrival.includes(4)){
                    let time = moment(t?.arrival_obj?.timing,format),
                    beforeTime = moment('18:00', format),
                    afterTime = moment('00:59', format);
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }


            })


        }

       setListflightfilter(filterrecord)


    }


 
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

                        
                            {/* <Sidemenu _minmaxprice={minmaxprice}  _sliderfun={sliderfun} _stopfilterpn={stopfilterpn}/> */}
                           { 
                            listflight.length > 0 ?  <Sidemenu _minmaxprice={minmaxprice} _filter={filter} _airline={airline}/> : <Searchmenuskeleton />
                           }
                           



                        </Grid>
                        <Grid item  md={9} className="booking_col">
                            <Typography className='bookingCol_title'>
                                
                                Flights from {location[0] ?? ''} to {location[1] ?? ''}, and back

                                </Typography>

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
                                                                       
                                                                        {/* <table className='fareTable' border="1">
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
                                                                        </table> */}
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
                                                        <Typography onClick={ () => sorting("depature")}>Departure</Typography>
                                                        <Typography onClick={ () => sorting("duration")}>Duration</Typography>
                                                        <Typography onClick={ () => sorting("arrival")}>Arrival</Typography>
                                                        <Typography onClick={ () => sorting("price")}>Price</Typography>
                                                        <Typography className='check'></Typography>
                                                    </Box>
                                                </Box>

                                                {/* flights  one way  */}
                                                {listflightfilter && listflightfilter.map((data, i) => (
                                                    <Box className='flightitem'>
                                                        <RadioGroup className="faretype_radio" 
                                                            value={flightGo}
                                                            onChange={changeFGo} >
                                                            <Box className='flight_brand'>
                                                                <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> { data?.dept_obj?.name ?? '-' }
                                                            </Box>

                                                            <span style={{ fontSize : 11 ,fontWeight : 'normal' , color:'#848f91'}} >
                                                               { data?.flight_code}
                                                            </span>


                                                            <Box className='timeandDetails'>
                                                                <Box className='from'>
                                                                    <Typography className='timeText'>  { data?.dept_obj?.timing   } </Typography>
                                                                    <Typography variant="h6" sx={{ fontSize : 11}}>  { data?.dept_obj?.timewords   } </Typography>

                                                                    <Typography className='place'> { data?.dept_obj?.city   } </Typography>
                                                                </Box>
                                                                <Box className='hours'>
                                                                    <Typography className='hourstext'>  { data?.duration } </Typography>
                                                                    <Typography className='placeType' style={{ textAlign : 'center' }}> { data?.stopwords } </Typography>
                                                                </Box>
                                                                <Box className='to'>
                                                                    <Typography className='timeText'>  {data?.arrival_obj?.timing   } </Typography>
                                                                    <Typography variant="h6" sx={{ fontSize : 11}}>  { data?.arrival_obj?.timewords   } </Typography>

                                                                    <Typography className='place'> { data?.arrival_obj?.city } </Typography>
                                                                </Box>
                                                                
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
                                                                                onChange = { (e)=> radiochangeevent(i,data?.totalPriceList , e) }
                                                                                name={ "flights-" + totaldata?.id  }
                                                                                inputProps={{ 'aria-label': 'A' }}
                                                                            />
                                                                           </span>
                                                                        <span>₹</span>
                                                                       {calculatetotalamount(totaldata)} 
                                                                       </div>
                                                                        </Typography>
                                                                        <Typography variant="h6"sx={{ fontSize:11,color : '#999'}} >{ cabinClassget }</Typography>
                                                                </Box>
                                                                    )) }
                                                                     </span>

                                                                <span>
                                                                <Typography className={`fdetails ${tabValue }`} onClick={() => tabValue == i ? TabChange('-1') : TabChange(i)}> {'Flight Details'} <KeyboardArrowDown className='down' /></Typography>
                                                                <Typography sx={{ fontSize:11,color:'#213bd4'}}>seats left {data?.totalPriceList[0]?.fd?.ADULT?.sR}</Typography>
                                                                </span>

                                                                  
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

                                                                        <Flightdetails _flightdetail={data?.flightdetails}/>

                                                                    </TabPanelUnstyled>
                                                                    <TabPanelUnstyled value={1}>

                                                                    <Faredetails value={data?.totalPriceList} _paxtypeget={paxtypeget}/>




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
