import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, IconButton, Box, Typography, Button, Grid, Divider, List, ListItem, ListItemText, InputBase, Paper } from '@mui/material';
import { FormControlLabel, RadioGroup, Radio, Tab, Tabs } from '@mui/material';
import { TabPanelUnstyled, TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { KeyboardArrowDown, ArrowRightAlt, SearchIcon, MenuIcon, FlightTakeoffIcon } from '@mui/icons-material';
import { isEmpty } from 'lodash';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment'
import axios from 'axios';
import debouce from "lodash.debounce";
import { motion } from "framer-motion";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import '../styles.css';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/header';
import Sidemenu from '../../../components/Sidemenu/Sidemenu';
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrowicon.svg';
import { useSearchParams } from 'react-router-dom';
import Searchmenuskeleton from "../Searchmenuskeleton"
import Comboview from '../comboview';
import helpers from "../calculation"
import { comboService } from "../store/comborxjs"
import { ComboStopService, CombodeparturearrivalService } from "../store/comborxjs"
import * as _ from 'lodash';
import Calendar from '../../../components/BookingCalendar/Calendar';
import Model from "../../Home/Model";


function Froms({ value }) {
    const { city, country } = value
    return (
        <div className='para'>{value.city},{value.country}</div>
    );
}

function Flightdetails(rest) {
    return (
        <>
            {rest?._flightdetail?.map((flightdetail, flightdetailindex) => (
                <>
                    <Box className='flightlist flightfrom' key={flightdetailindex}>
                        <Box className='brand'>
                            <img src={require('../../../assets/icons/flighticon.png')} alt='flight' />
                            <Typography style={{ fontSize: 10, fontWeight: '500' }}> {flightdetail?.flightdetaildt?.name}</Typography>
                            <Typography style={{ fontSize: 10, fontWeight: '500' }}> {flightdetail?.flightcodefn}</Typography>
                        </Box>
                        <Box className='time_place first'>
                            <Typography className='time1' style={{ fontSize: 17, fontWeight: '500' }}>{flightdetail?.flightdetaildt?.dt}</Typography>
                            <Typography>{flightdetail?.flightdetaildt?.citycountry}</Typography>
                            <Typography>{flightdetail?.flightdetaildt?.name}</Typography>
                            <Typography>{flightdetail?.flightdetaildt?.terminal}</Typography>


                        </Box>
                        <Box className='hours'>
                            <Typography className='hrs' style={{ fontSize: 12, fontWeight: '500' }}>{flightdetail?.duration}</Typography>
                            <Typography style={{ fontSize: 10 }}>Duration</Typography>
                        </Box>
                        <Box className='time_place'>
                            <Typography className='time1' style={{ fontSize: 17, fontWeight: '500' }}>{flightdetail?.flightdetailat?.at}</Typography>
                            <Typography>{flightdetail?.flightdetailat?.citycountry}</Typography>
                            <Typography>{flightdetail?.flightdetailat?.name}</Typography>
                            <Typography>{flightdetail?.flightdetailat?.terminal}</Typography>
                        </Box>
                    </Box>
                    {
                        flightdetail?.layoverduration != 'NaNh NaNm' &&
                        <Box className='hrsnext_flight'> {flightdetail?.layoverduration}  </Box>

                    }

                </>
            ))
            }
        </>
    );
}


function Faredetails(...rest) {
    let { value, _paxtypeget } = rest[0] || ''
    let data = value.filter(x => x.checked == true)[0]


    const calculatetotalamount = (data, index) => {
        let tot = 0;
        if (data?.fd?.ADULT) {
            tot += data?.fd?.ADULT?.fC?.TF * _paxtypeget.ADULT
        }
        if (data?.fd?.CHILD) {
            tot += data?.fd?.CHILD?.fC?.TF * _paxtypeget.CHILD
        }
        if (data?.fd?.INFANT) {
            tot += data?.fd?.INFANT?.fC?.TF * _paxtypeget.INFANT
        }
        return tot.toLocaleString(undefined, { minimumFractionDigits: 2 })
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


            {data?.fd?.ADULT &&
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


            {data?.fd?.CHILD &&
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


            {data?.fd?.INFANT &&
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


            <Divider />
            <Grid container direction="row" justifyContent="space-between">
                <Grid item>Total</Grid>
                <Grid item>₹{calculatetotalamount(data)} </Grid>
            </Grid>
        </>
    )
}

function Oneway() {
    const [tripType, setTripType] = React.useState('');
    const [flightGo, setFlightGo] = React.useState('flight_go1');
    const [flightReturn, setFlightReturn] = React.useState('flight_return1');
    const [tabValue, setTabValue] = React.useState();
    const [tabValuereturn, setTabValuereturn] = React.useState();

    const [listflight, setListflight] = React.useState([]);
    const [listflightfilter, setListflightfilter] = React.useState([]);

    const [location, setLocation] = React.useState([]);
    const [paxtypeget, setPaxtypeget] = React.useState([]);
    const [cabinClassget, setCabinClassget] = React.useState("");
    const [minmaxprice, setMinmaxprice] = React.useState(0);
    const [airline, setAirline] = React.useState([])



    // Return 
    const [airlinereturn, setAirlinereturn] = React.useState([])
    const [listflightreturn, setListflightreturn] = React.useState([])
    const [listflightfilterreturn, setListflightfilterreturn] = React.useState([])
    const [minmaxpricereturn, setMinmaxpricereturn] = React.useState([])

    const [splitType, setSplitType] = React.useState(false)
    const [displaystatus, setDisplaystatus] = React.useState("");


    // flight response status
    const [flightstatus, setFlightstatus] = React.useState("")


    //fare detail click by radio button

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [tripOpt, setTripOpt] = React.useState("oneway");
    const [preferedAirline, setPreferedAirline] = React.useState('none');
    const [fareType, setFareType] = React.useState('regular');
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [calendarOpento, setCalendarOpento] = React.useState(false);


    // const Fromref = useRef();
    const [open, setOpen] = React.useState(false);
    const [toopen, setToopen] = React.useState(false);

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchFrom, setSearchFrom] = React.useState([]);
    const [searchTo, setSearchTo] = React.useState([]);

    const [searchFromlocalstorage, setSearchFromlocalstorage] = React.useState([]);
    const [searchTolocalstorage, setSearchTolocalstorage] = React.useState([]);

    const [suggestionfrom, setSuggestionfrom] = React.useState(false);
    const [suggestionto, setSuggestionto] = React.useState(false);

    const [searchfromselected, setSearchfromselected] = React.useState({});
    const [searchtoselected, setSearchtoselected] = React.useState({});


    // Passangers 
    const [passangeropen, setPassangeropen] = React.useState(false);

    //Traveller class
    const [travellerclass, setTravellerclass] = React.useState({
        ADULT: 1,
        CHILD: 0,
        INFANT: 0
    });

    // Travel class
    const [travelclass, setTravelclass] = React.useState("Economy");

    //Calendar
    var date = new Date();
    var date1 = { ...date }
    date.setDate(date.getDate() + 1);

    // add a day
    const [calendar, setCalendar] = React.useState(date1) // from
    const [tocalendar, setTocalendar] = React.useState(date) // from
    const [calendartostatus, setCalendartostatus] = React.useState(true)

    const calendarref = useRef();
    const [stopchecked, setStopchecked] = React.useState(false);

    const handleChangeFrom = (e) => {
        setSearchTerm(e.target.value);
        const Search = e.target.value;
        if (isEmpty(Search)) {
            setSuggestionfrom(false) // show suggestion
            return
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=${Search}`).then(res => {
            setSearchFrom(res?.data)
            setSuggestionfrom(true) // show suggestion
        }).catch(err => {
            console.log(err);
        })
    };


    React.useEffect(() => {
        const url = process.env.REACT_APP_FROM_SEARCH;
        const getstorage = JSON.parse(localStorage.getItem(url));
        setSearchFromlocalstorage(getstorage)

        if (getstorage && getstorage[0]) {
            setSearchfromselected(getstorage[0] || {})
        } else {

            axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=Shirdi`).then(res => {
                let hyn = res?.data[0];
                setSearchfromselected(hyn)

            })

        }
    }, [searchFrom]);


    React.useEffect(() => {
        const url = process.env.REACT_APP_TO_SEARCH;
        const getstorage = JSON.parse(localStorage.getItem(url));
        setSearchTolocalstorage(getstorage)
        if (getstorage && getstorage[0]) {
            setSearchtoselected(getstorage[0] || {})
        } else {

            // http://localhost:3030/flight?$search=Shirdi
            axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=Chennai`).then(res => {
                let hyn = res?.data[0];
                console.log(hyn);
                setSearchtoselected(hyn)

            })
        }
    }, [searchTo]);


    const handleChangeTo = (e) => {
        setSearchTerm(e.target.value);
        const Search = e.target.value;
        if (isEmpty(Search)) {
            setSuggestionto(false) // show suggestion
            return
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/flight?$search=${Search}`).then(res => {
            setSearchTo(res?.data)
            setSuggestionto(true) // show suggestion
        }).catch(err => {
            console.log(err);
        })

    };

    const debouncedResults = React.useMemo(() => {
        return debouce(handleChangeFrom, 300);
    }, []);

    const debouncedResultsto = React.useMemo(() => {
        return debouce(handleChangeTo, 300);
    }, []);


    React.useEffect(() => {
        return () => {
            debouncedResults.cancel();
            debouncedResultsto.cancel();
        };
    });

    // from to address popup


    const clickfrom = (e) => {
        const url = process.env.REACT_APP_FROM_SEARCH;
        const getstorage = JSON.parse(localStorage.getItem(url));

        setToopen(true)


        if (getstorage != null && getstorage.length > 4) {

            var find = getstorage.find(obj => obj._id == e._id)
            if (find == undefined) {
                const swallowcopy = [e, ...getstorage]
                let gg = swallowcopy.slice(0, 5)
                localStorage.setItem(url, JSON.stringify(gg))
            } else {
                console.log(find);
                let _id = find._id
                var gets = getstorage.filter(a => a._id != _id)
                let hh = [find, ...gets]
                localStorage.setItem(url, JSON.stringify(hh))

            }

        } else {

            if (getstorage == null) {
                let arr = []
                arr.push(e)
                localStorage.setItem(url, JSON.stringify(arr))
            } else {
                var find = getstorage.find(obj => obj._id == e._id)
                if (find == undefined) {
                    getstorage.push(e)
                    localStorage.setItem(url, JSON.stringify(getstorage))
                }
            }
        }
        setSearchfromselected(e)

        setTimeout(() => {
            setOpen(false)
        }, 100)

    }


    React.useEffect(() => {
        window.localStorage.removeItem("updateCurrflightdetial")
        window.localStorage.removeItem("passangerdetail")


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
            let Obj = {
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



        /**
         * function to modify paxtype
         * **/

        const paxTypefn = data => {
            const topData = data.split("_");
            let obj = {}
            for (const key in topData) {
                let childdata = topData[key].split("-");
                switch (childdata[0]) {
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



        if (tripType == "oneway" || tripType == "rondtrip") {
            let top = itinerary.split("_");
            for (const key in top) {
                CreatesearchObject.searchQuery.routeInfos.push(CreateObject(top[key]))
            }
        }


        if (stops == 0) {
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

        axios.post(`${process.env.REACT_APP_FLIGHT_URL}/fms/v1/air-search-all`, CreatesearchObject, { headers: headers }).then(res => {
            console.log(res);
            let data = res?.data?.searchResult?.tripInfos?.ONWARD


            let datadup = res?.data?.searchResult?.tripInfos?.ONWARD
            let _return = res?.data?.searchResult?.tripInfos?.RETURN

            if (datadup && _return) {

                setTripType('roundtrip')
                setDisplaystatus("oneway")
                setSplitType(true)
                setFlightstatus('onwardreturn') // status flight api response
            }

            if (datadup && _return == undefined) {
                setTripType('oneway')
                setDisplaystatus("oneway")
                setSplitType(false)
                setFlightstatus('onward') // status flight api response

            }
            if (datadup) {
                var modifieddata = datadup.map((dd, i) => {
                    let dept_obj = {
                        timing: moment(dd?.sI[0]?.dt).format("HH:mm"),
                        timewords: moment(dd?.sI[0]?.dt).format("MMMM DD"),
                        city: dd?.sI[0]?.da?.city,
                        name: dd?.sI[0]?.fD?.aI?.name
                    }

                    let arrival_obj = {
                        timing: moment(dd?.sI[dd?.sI.length - 1]?.at).format("HH:mm"),
                        timewords: moment(dd?.sI[dd?.sI.length - 1]?.at).format("MMMM DD"),
                        city: dd?.sI[dd?.sI.length - 1]?.aa?.city,
                        name: ''
                    }



                    let paxt = paxTypefn(paxType)

                    if (dd.totalPriceList.length == 1) {
                        dd.totalPriceList[0].checked = true
                        dd.totalPriceList[0].totalamount = calculatetotalamount1(dd.totalPriceList[0], paxt)
                    } else if (dd.totalPriceList.length > 1) {
                        dd.totalPriceList[0].checked = true
                        dd.totalPriceList[0].totalamount = calculatetotalamount1(dd.totalPriceList[0], paxt)
                        for (var ii = 1; ii < dd?.totalPriceList?.length; ii++) {
                            dd.totalPriceList[ii].checked = false
                            dd.totalPriceList[ii].totalamount = calculatetotalamount1(dd.totalPriceList[ii], paxt)
                        }
                    }

                    let swallowcopy = { ...dd }
                    //  console.log(swallowcopy);

                    let flightdetails = swallowcopy?.sI.map((flightdetail, flightdetailindex) => {
                        return {
                            flightname: flightdetail?.oB?.name,
                            flightcodefn: `${flightdetail?.fD?.aI?.code}-${flightdetail?.fD?.fN}`,
                            flightdetaildt: {
                                dt: moment(flightdetail?.dt).format('MMM DD,ddd, HH:mm'),
                                citycountry: `${flightdetail?.da?.city},${flightdetail?.da?.country}`,
                                name: flightdetail?.da?.name,
                                termianl: flightdetail?.da?.terminal

                            },
                            duration: twodatetimediff(flightdetail?.dt, flightdetail?.at),
                            flightdetailat: {
                                at: moment(flightdetail?.at).format('MMM DD,ddd, HH:mm'),
                                citycountry: `${flightdetail?.aa?.city}-${flightdetail?.aa?.country}`,
                                name: flightdetail?.aa?.name,
                                termianl: flightdetail?.aa?.terminal
                            },
                            layoverduration: twodatetimediff(flightdetail?.at, dd?.sI[flightdetailindex + 1]?.dt)

                        }
                    })

                    return {
                        unique: i,
                        dept_obj: dept_obj,
                        flight_code: dd?.sI.map((indata, ind) => (
                            `${indata?.fD?.aI?.code} ${indata?.fD?.fN}${dd?.sI?.length - 1 == ind ? '' : ','}`
                        )),
                        duration: calculateTime(dd?.sI),
                        stopwords: dd?.sI?.length == 1 ? 'Non Stop' : `${dd?.sI?.length - 1} Stop(s)`,
                        stopinnumber: dd?.sI?.length == 1 ? 0 : dd?.sI?.length - 1,
                        arrival_obj: arrival_obj,
                        totalPriceList: dd.totalPriceList,
                        flightdetails: flightdetails,
                        dt_date: swallowcopy?.sI[0]?.dt,
                        at_date: swallowcopy?.sI[swallowcopy?.sI?.length - 1]?.at,
                        minduration: calculateTimemiutes(dd?.sI)

                    }
                })
                //   
                modifieddata.sort(function (a, b) {
                    var c = a.totalPriceList[0].totalamount;
                    var d = b.totalPriceList[0].totalamount;
                    return c - d
                });
                let swaldeep = [...modifieddata]
                const unique = [...new Set(swaldeep.map(item => item.dept_obj.name))]
                    .map(i => swaldeep.filter(tt => tt.dept_obj.name == i))
                    .map(ii => ii.reduce((prev, curr) => prev.totalPriceList[0].totalamount < curr.totalPriceList[0].totalamount ? prev : curr)
                    ).map(iii => ({ ...iii, cnt: swaldeep.filter(iif => iif.dept_obj.name == iii.dept_obj.name).length }))

                setAirline(unique)
                setListflight(modifieddata)
                setListflightfilter(modifieddata)
                setMinmaxprice(Math.round(swaldeep[swaldeep.length - 1].totalPriceList[0].totalamount)) //  pass min max price to popular search
            }


        }).catch(err => {
            console.log(err);
        })
    }, [])

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

    const TabChange = (newValue) => {
        setTabValue(newValue);
        console.log(newValue)
    };

    const TabChangereturn = (newValue) => {
        setTabValuereturn(newValue);
    };



    /**
     * radio button change event
     * 
     * **/

    const radiochangeevent = (parentindex, data, e) => {
        let target_id = e.target.value

        let unmutate = [...listflight]
        unmutate[parentindex]['totalPriceList'].map(idd => idd.checked = false)
        let plindex = unmutate[parentindex]['totalPriceList'].findIndex(x => x.id == target_id)
        unmutate[parentindex]['totalPriceList'][plindex].checked = true
        //  setListflight(unmutate)
        // console.log(listflightfilter);
        setListflightfilter(unmutate)
    }

    const radiochangeeventreturn = (parentindex, data, e) => {
        let target_id = e.target.value

        let unmutate = [...listflightreturn]
        unmutate[parentindex]['totalPriceList'].map(idd => idd.checked = false)
        let plindex = unmutate[parentindex]['totalPriceList'].findIndex(x => x.id == target_id)
        unmutate[parentindex]['totalPriceList'][plindex].checked = true
        //  setListflight(unmutate)
        setListflightfilterreturn(unmutate)
    }

    /**
     * calculatr time between
     * **/



    const calculateTime = (data) => {
        const minduration = data?.reduce((acc, curr) => acc + curr.duration, 0)
        var hours = 0;
        var minutes = 0;

        for (let index = 0; index < data?.length - 1; index++) {
            let at = data[index]?.at
            let dt = data[index + 1]?.dt
            var startTime = moment(at, "YYYY-MM-DD hh:mm");
            var endTime = moment(dt, "YYYY-MM-DD hh:mm");

            var duration = moment.duration(endTime.diff(startTime));
            hours += parseInt(duration.asHours());
            minutes += parseInt(duration.asMinutes()) % 60;
        }
        var tot = minduration + hours * 60 + minutes;
        return `${Math.floor(tot / 60)}h ${tot % 60}m`
    }

    const calculateTimemiutes = (data) => {
        const minduration = data?.reduce((acc, curr) => acc + curr.duration, 0)
        var hours = 0;
        var minutes = 0;

        for (let index = 0; index < data?.length - 1; index++) {
            let at = data[index]?.at
            let dt = data[index + 1]?.dt
            var startTime = moment(at, "YYYY-MM-DD hh:mm");
            var endTime = moment(dt, "YYYY-MM-DD hh:mm");

            var duration = moment.duration(endTime.diff(startTime));
            hours += parseInt(duration.asHours());
            minutes += parseInt(duration.asMinutes()) % 60;
        }
        var tot = minduration + hours * 60 + minutes;
        return (Math.floor(tot / 60) * 60) + (tot % 60)
    }




    const twodatetimediff = (start, end) => {
        var startTime = moment(start, "YYYY-MM-DD hh:mm");
        var endTime = moment(end, "YYYY-MM-DD hh:mm");

        var duration = moment.duration(endTime.diff(startTime));
        var hours = parseInt(duration.asHours());
        var minutes = parseInt(duration.asMinutes()) % 60;

        return `${hours}h ${minutes}m`
    }

    const calculatetotalamount = (data, index) => {

        let tot = 0;
        if (data?.fd?.ADULT) {
            tot += data?.fd?.ADULT?.fC?.TF * paxtypeget?.ADULT
        }
        if (data?.fd?.CHILD) {
            tot += data?.fd?.CHILD?.fC?.TF * paxtypeget?.CHILD
        }
        if (data?.fd?.INFANT) {
            tot += data?.fd?.INFANT?.fC?.TF * paxtypeget?.INFANT
        }

        return tot.toLocaleString(undefined, { minimumFractionDigits: 2 })
    }

    const calculatetotalamount1 = (data, _paxtypeget) => {
        let tot = 0;
        if (data?.fd?.ADULT) {
            tot += data?.fd?.ADULT?.fC?.TF * _paxtypeget.ADULT
        }
        if (data?.fd?.CHILD) {
            tot += data?.fd?.CHILD?.fC?.TF * _paxtypeget.CHILD
        }
        if (data?.fd?.INFANT) {
            tot += data?.fd?.INFANT?.fC?.TF * _paxtypeget.INFANT
        }
        return tot
    }

    const [sortingstatus, setSortingstatus] = React.useState(false);

    const sorting = type => {
        var unmutatee = [...listflightfilter]
        switch (type) {
            case "depature":
                unmutatee.sort(function (a, b) {
                    var c = new Date(a.dt_date);
                    var d = new Date(b.dt_date);
                    return sortingstatus == 0 ? c - d : d - c
                });
                break;

            case "duration":
                unmutatee.sort(function (a, b) {
                    var c = a.minduration;
                    var d = b.minduration;
                    return sortingstatus == 0 ? c - d : d - c
                });
                break;

            case "arrival":
                unmutatee.sort(function (a, b) {
                    var c = new Date(a.at_date);
                    var d = new Date(b.at_date);
                    return sortingstatus == 0 ? c - d : d - c
                });
                break;

            case "price":

                unmutatee.sort(function (a, b) {
                    var c = a.totalPriceList[0].totalamount;
                    var d = b.totalPriceList[0].totalamount;
                    return sortingstatus == 0 ? c - d : d - c
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

    const onewaybooknow = (data) => {
        let f = data.findIndex(a => a.checked)
        let id = data[f].id;
        navigate(`/booking/flight/${id}`)

    }


    return (
        <div className='oneway'>
            <Box className='chooseFlightSect' >
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Box className='cardBox'>
                            <Box style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', borderBottomStyle: 'solid' }}>
                                <Typography className='journerydate journey_start' component={'div'}>
                                    {'Chandigarh'}
                                    <ArrowRightAlt className='miniArrow dark' />
                                    {'Chennai '} {'Wed, 15 Jun'}
                                </Typography>
                                <Box component={'div'} className='tablehead'>
                                    <Typography onClick={() => sorting("depature")}>Departure</Typography>
                                    <Typography onClick={() => sorting("duration")}>Duration</Typography>
                                    <Typography onClick={() => sorting("arrival")}>Arrival</Typography>
                                    <Typography onClick={() => sorting("price")}>Price</Typography>
                                    <Typography className='check'></Typography>
                                </Box>
                            </Box>
                            {console.log(listflightfilter.length)}
                            {/* flights  one way  */}
                            {listflightfilter && listflightfilter.map((data, i) => (
                                <Box className='flightitem'>
                                    {/* <RadioGroup className="faretype_radio" 
                        value={flightGo}
                        onChange={changeFGo} > */}
                                    <Box className='flight_brand'>
                                        <img src={require('../../../assets/icons/flighticon.png')} alt='flight' /> {data?.dept_obj?.name ?? '-'}
                                    </Box>

                                    <span style={{ fontSize: 11, fontWeight: 'normal', color: '#848f91' }} >
                                        {data?.flight_code}
                                    </span>


                                    <Box className='timeandDetails'>
                                        <Box className='from'>
                                            <Typography className='timeText'>  {data?.dept_obj?.timing} </Typography>
                                            <Typography variant="h6" sx={{ fontSize: 11 }}>  {data?.dept_obj?.timewords} </Typography>

                                            <Typography className='place'> {data?.dept_obj?.city} </Typography>
                                        </Box>
                                        <Box className='hours'>
                                            <Typography className='hourstext'>  {data?.duration} </Typography>
                                            <Typography className='placeType' style={{ textAlign: 'center' }}> {data?.stopwords} </Typography>
                                        </Box>
                                        <Box className='to'>
                                            <Typography className='timeText'>  {data?.arrival_obj?.timing} </Typography>
                                            <Typography variant="h6" sx={{ fontSize: 11 }}>  {data?.arrival_obj?.timewords} </Typography>

                                            <Typography className='place'> {data?.arrival_obj?.city} </Typography>
                                        </Box>

                                        <span>
                                            {data?.totalPriceList.map((totaldata, totindex) => (
                                                <Box className='price' >
                                                    <Typography className='priceText'>

                                                        <div>
                                                            <span>
                                                                <Radio
                                                                    checked={totaldata?.checked}
                                                                    id={totaldata?.id}
                                                                    value={totaldata?.id}
                                                                    onChange={(e) => radiochangeevent(i, data?.totalPriceList, e)}
                                                                    name={"flights-" + totaldata?.id}
                                                                    inputProps={{ 'aria-label': 'A' }}
                                                                />
                                                            </span>
                                                            <span>₹</span>
                                                            {calculatetotalamount(totaldata)}
                                                        </div>
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ fontSize: 11, color: '#999' }} >{cabinClassget}</Typography>
                                                </Box>
                                            ))}
                                        </span>

                                        <span>
                                            <Typography className={`fdetails ${tabValue}`} onClick={() => tabValue == i ? TabChange('-1') : TabChange(i)}> {'Flight Details'} <KeyboardArrowDown className='down' /></Typography>
                                            <Typography sx={{ fontSize: 11, color: '#213bd4' }}>seats left {data?.totalPriceList[0]?.fd?.ADULT?.sR}</Typography>


                                            <Typography sx={{ fontSize: 11, color: '#213bd4' }}>

                                                <Button variant='contained' className='color_primary booknow_btn' onClick={() => onewaybooknow(data?.totalPriceList)}>Book Now</Button>
                                            </Typography>

                                        </span>


                                        {/* <Box className='check'>
                                <FormControlLabel value={'flight_go' + (i + 1)} control={<Radio sx={{ 
                                    '& .MuiSvgIcon-root': {
                                    fontSize: 20,
                                    },
                                    color: "#99999a",
                                    '&.Mui-checked': {
                                    color: "#f59625",
                                    }, }}/>}  />
                            </Box> */}
                                    </Box>
                                    {/* </RadioGroup> */}

                                    {tabValue == i && (
                                        <Box className='flight_detail_bot tab'>
                                            <TabsUnstyled defaultValue={0}>
                                                <TabsListUnstyled className='tablistnav'>
                                                    <TabUnstyled>Flight Details</TabUnstyled>
                                                    <TabUnstyled>Fare</TabUnstyled>
                                                    <TabUnstyled>Cancellation</TabUnstyled>
                                                    <TabUnstyled>Rules</TabUnstyled>
                                                </TabsListUnstyled>
                                                <TabPanelUnstyled value={0}>
                                                    <Flightdetails _flightdetail={data?.flightdetails} />
                                                </TabPanelUnstyled>
                                                <TabPanelUnstyled value={1}>
                                                    <Faredetails value={data?.totalPriceList} _paxtypeget={paxtypeget} />
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
        </div>
    )
}

export default Oneway
