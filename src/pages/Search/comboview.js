import React from 'react'
import { useNavigate } from "react-router-dom";
import { Container, IconButton, Box, Typography, Button, Grid, Divider } from '@mui/material';
import { FormControlLabel, RadioGroup, Radio, Tab, Tabs } from '@mui/material';
import { TabPanelUnstyled, TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { KeyboardArrowDown } from '@mui/icons-material';
import { ArrowRightAlt } from '@mui/icons-material';
import helpers from "./calculation"
import { comboService } from "./store/comborxjs"
import moment from 'moment'
import axios from 'axios';

function Flightdetails(rest) {


    return (
        <>
            {rest?._flightdetail?.map((data) => (
                <>
                    {data?.map((flightdetail, flightdetailindex) => (
                        <>
                            <Box className='flightlist flightfrom' key={flightdetailindex}>
                                <Box className='brand'>
                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight' />
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
                    ))}
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                </>
            ))}


        </>


    );


}

const colorsRadio = {
    color: "#99999a",
    '&.Mui-checked': {
        color: "#f59625",
    },
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

function Flightoptions({ _data, _fromparent, _type }) {
    const [datas, setDatas] = React.useState(_data)

    const updatechecked = (e, key) => {
        Object.keys(datas).map(data => datas[data].checked = false)
        let obj = {}
        obj[key] = { ...datas[key], ...{ checked: true } };
        setDatas(prevstate => ({
            ...prevstate,
            ...obj
        }))

        setTimeout(() => {
            _fromparent(key, _type)
        }, 100)

        // datas[key].checked = true
    }



    return (
        <>
            {datas && Object.keys(datas)?.map((key, index) => (
                <>
                    {/* <>{datas[key]?.pricelist[0]?.id}</> */}

                    <Box className='timeandDetails' sx={{ display: 'flex', width: '100%' }}>

                        <Box className="firstdiv" sx={{ width: '80%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box >
                                    <Typography>  {datas[key]?.dept_obj?.name} </Typography>
                                    <Typography style={{ fontSize: 11, fontWeight: 'normal', color: '#848f91' }}>  {datas[key]?.flight_code} </Typography>

                                </Box>
                                <Box className='from'>
                                    <input
                                        type="radio"
                                        id={datas[key]?.pricelist[0]?.id}
                                        name={`${index}${datas[key]?.dept_obj?.city}`}
                                        checked={datas[key]?.checked}
                                        onChange={(e) => updatechecked(e, key)}
                                    />
                                    <Typography className='timeText'>  {datas[key]?.dept_obj?.timing} </Typography>
                                    <Typography className='place'> {datas[key]?.dept_obj?.city} </Typography>
                                    <Typography variant="h6" sx={{ fontSize: 11 }}>  {datas[key].dept_obj?.timewords} </Typography>

                                </Box>
                                <Box className='hours'>
                                    <Typography className="hourstext"> {datas[key].duration}</Typography>
                                    <Typography className='placeType' style={{ textAlign: 'center' }}> {datas[key]?.stopwords} </Typography>
                                </Box>
                                <Box className='to'>
                                    <Typography className='timeText'>  {datas[key]?.arrival_obj?.timing} </Typography>
                                    <Typography className='place'> {datas[key]?.arrival_obj?.city} </Typography>
                                    <Typography variant="h6" sx={{ fontSize: 11 }}>  {datas[key]?.arrival_obj?.timewords} </Typography>
                                </Box>
                            </Box>

                            <Divider />




                        </Box>
                    </Box>


                </>
            ))}
        </>
    );
}


export default function Comboview(props) {
    const { _listflightroundfilter, _cabinClassget, _paxtypeget } = props


    const [tabValue, setTabValue] = React.useState();
    const [tabValueoption, setTabValueoption] = React.useState();
    const [listflightroundfilter, setListflightroundfilter] = React.useState(_listflightroundfilter)
    const [storeindex, setStoreindex] = React.useState(false);

    const navigate = useNavigate()


    const [fare, setFare] = React.useState("")


    const TabChange = (newValue) => {
        setTabValue(newValue);
        setTabValueoption(-1)
    };

    const TabChangeoption = (newValue) => {
        setTabValueoption(newValue);
        setTabValue(-1)
    };



    // subscribe from search.js to get filtered records
    comboService.comboObservable().subscribe(res => {
        //   console.log(res);
        setListflightroundfilter(res)
        setStoreindex(!storeindex)
    }, [])


    React.useEffect(() => {
        setListflightroundfilter(listflightroundfilter)
    }, [storeindex])


    function fromparent(key, type) {

        let currentobj = listflightroundfilter

        // on change radio button for more option
        let innerobj = currentobj[tabValueoption][type]
        Object.keys(innerobj).map(r => innerobj[r].checked = false)

        currentobj[tabValueoption][type][key].checked = true



        let index = (type == "going") ? 0 : 1
        currentobj[tabValueoption].frmt[index] = innerobj[key]

        let fd = currentobj[tabValueoption][type][key].flightdetail
        currentobj[tabValueoption]['flightdetails'][index] = fd

        setStoreindex(!storeindex)
        setListflightroundfilter(currentobj)


        // on change radio button for more option
    }




    const radiochangeevent = (i, totalPriceList, e) => {

        // console.log(i);
        // console.log(totalPriceList);
        let id = e.target.value;

        let currentobj = listflightroundfilter
        currentobj[i].totalPriceList.map(d => d.checked = false)
        currentobj[i].totalPriceList.filter(e => e.id == id)[0].checked = true
        console.log(currentobj[i].totalPriceList);
        setListflightroundfilter(currentobj)
        setStoreindex(!storeindex)


    }

    const fareifreview = data => {

        let onward_departure = moment(data.frmt[0]?.dept_obj?.datetime).format('YYYY-MM-DD HH:mm')
        let onward_arrival = moment(data.frmt[0]?.arrival_obj?.datetime).format('YYYY-MM-DD HH:mm')

        let return_departure = moment(data.frmt[1]?.dept_obj?.datetime).format('YYYY-MM-DD HH:mm')
        let return_arrival = moment(data.frmt[1]?.arrival_obj?.datetime).format('YYYY-MM-DD HH:mm')

        let Originalfare = data.allfare
        var ind;
        Originalfare.map((dd, index) => {
            let going = dd?.sI?.filter(d => d.isRs == false)
            let _return = dd?.sI?.filter(d => d.isRs == true)

            let g1 = going[0];
            let g2 = going[going.length - 1];

            let r1 = _return[0];
            let r2 = _return[_return.length - 1];

            let g1date = moment(g1.dt).format('YYYY-MM-DD HH:mm')
            let g2date = moment(g2.at).format('YYYY-MM-DD HH:mm')

            let r1date = moment(r1.dt).format('YYYY-MM-DD HH:mm')
            let r2date = moment(r2.at).format('YYYY-MM-DD HH:mm')

            if ((g1date == onward_departure && g2date == onward_arrival) && (r1date == return_departure && r2date == return_arrival)) {
                ind = index
            }
        })

        let getfare = Originalfare[ind]

        // console.log(data);

        let multipleselectedfare = data.totalPriceList.findIndex(a => a.checked)
        let id = getfare?.totalPriceList[multipleselectedfare].id
        console.log(multipleselectedfare);
        console.log(getfare?.totalPriceList);
        setFare(id)

        const headers = {
            'Content-Type': 'application/json',
            'apikey': process.env.REACT_APP_FLIGHT_API_KEY
        }

        let pricd = {
            priceIds: [id]
        }

        navigate(`/booking/flight/${id}`)
        //  axios.post(`${process.env.REACT_APP_FLIGHT_URL}/fms/v1/review`,pricd , { headers : headers}  ).then(res=>{
        //    console.log(res);
        //  })

    }


    return (
        <>
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
                                    <Typography>Departure</Typography>
                                    <Typography>Duration</Typography>
                                    <Typography>Arrival</Typography>
                                    <Typography>Price</Typography>
                                    <Typography className='check'></Typography>
                                </Box>
                            </Box>


                            {listflightroundfilter && listflightroundfilter.map((data, i) => (
                                <Box className='flightitem'>
                                    <Box className='timeandDetails' sx={{ display: 'flex' }}>
                                        <Grid container className="firstdiv" sx={{ width: '100%' }}>
                                            <Grid item md={6} className='origin fcol' style={{ paddingRight: 10 }}>
                                                <Box className='flight_brand'>
                                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> {data?.frmt[0]?.dept_obj?.name}
                                                </Box>
                                                <span style={{ fontSize: 11, fontWeight: 'normal', color: '#848f91' }} >
                                                    {data?.frmt[0]?.flight_code}
                                                </span>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Box className='from'>
                                                        <Typography className='timeText'>  {data?.frmt[0]?.dept_obj?.timing} </Typography>
                                                        <Typography className='place'> {data?.frmt[0]?.dept_obj?.city} </Typography>
                                                        <Typography variant="h6" sx={{ fontSize: 11 }}>  {data?.frmt[0]?.dept_obj?.timewords} </Typography>

                                                    </Box>
                                                    <Box className='hours'>
                                                        <Typography className='hourstext'>  {data?.frmt[0]?.duration} </Typography>
                                                        <Typography className='placeType' style={{ textAlign: 'center' }}> {data?.frmt[0]?.stopwords} </Typography>
                                                    </Box>
                                                    <Box className='to'>
                                                        <Typography className='timeText'>  {data?.frmt[0]?.arrival_obj?.timing} </Typography>
                                                        <Typography className='place'> {data?.frmt[0]?.arrival_obj?.city} </Typography>
                                                        <Typography variant="h6" sx={{ fontSize: 11 }}>  {data?.frmt[0]?.arrival_obj?.timewords} </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item md={6} className='destination fcol' style={{ 'border-left': '1px dashed #efefef', paddingLeft: 10, paddingRight: 10 }}>
                                                <Box className='flight_brand'>
                                                    <img src={require('../../assets/icons/flighticon.png')} alt='flight' /> {data?.frmt[1]?.dept_obj?.name}
                                                </Box>
                                                <span style={{ fontSize: 11, fontWeight: 'normal', color: '#848f91' }} >
                                                    {data?.frmt[1]?.flight_code}
                                                </span>

                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                                    <Box className='from'>
                                                        <Typography className='timeText'>  {data?.frmt[1]?.dept_obj?.timing} </Typography>
                                                        <Typography className='place'> {data?.frmt[1]?.dept_obj?.city} </Typography>
                                                        <Typography variant="h6" sx={{ fontSize: 11 }}>  {data?.frmt[1]?.dept_obj?.timewords} </Typography>

                                                    </Box>
                                                    <Box className='hours'>
                                                        <Typography className='hourstext'>  {data?.frmt[1]?.duration} </Typography>
                                                        <Typography className='placeType' style={{ textAlign: 'center' }}> {data?.frmt[1]?.stopwords} </Typography>
                                                    </Box>
                                                    <Box className='to'>
                                                        <Typography className='timeText'>  {data?.frmt[1]?.arrival_obj?.timing} </Typography>
                                                        <Typography className='place'> {data?.frmt[1]?.arrival_obj?.city} </Typography>
                                                        <Typography variant="h6" sx={{ fontSize: 11 }}>  {data?.frmt[1]?.arrival_obj?.timewords} </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>



                                        <Box className="seconddiv" style={{ width: '30%', 'border-left': '1px dashed #efefef', paddingLeft: 10 }}>
                                            <Box className=''>
                                                <Box>
                                                    {data?.totalPriceList.map((totaldata, totindex) => (
                                                        <Box  >
                                                            <Typography className='priceText'>
                                                                <Box id={fare}>
                                                                    <span id={fare}>
                                                                        <Radio
                                                                            checked={totaldata?.checked}
                                                                            id={totaldata?.id}
                                                                            value={totaldata?.id}
                                                                            onChange={(e) => radiochangeevent(i, data?.totalPriceList, e)}
                                                                            name={"flights-" + totaldata?.id}
                                                                            inputProps={{ 'aria-label': 'A' }}
                                                                            sx={colorsRadio}
                                                                        />
                                                                    </span>
                                                                    <span>₹</span>
                                                                    {helpers.calculatetotalamount(totaldata, _paxtypeget)}
                                                                    <Box style={{ display: 'flex', columnGap: '5px' }}>
                                                                        <Typography variant="h6" sx={{ fontSize: 11, color: '#999' }}>{totaldata.fareIdentifier}</Typography>
                                                                        {' '}
                                                                        <Typography variant="h6" sx={{ fontSize: 11, color: '#999' }} >{_cabinClassget}</Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Box>



                                                <Typography className={`fdetails ${tabValue}`} onClick={() => tabValue == i ? TabChange('-1') : TabChange(i)}> {'Flight Details'} <KeyboardArrowDown className='down' /></Typography>
                                                {
                                                    (Object.keys(data?.going).length > 1 || Object.keys(data?.returns).length > 1) &&
                                                    <Typography className={`fdetails ${tabValueoption}`} onClick={() => tabValueoption == i ? TabChangeoption('-1') : TabChangeoption(i)}> {'More Option'} <KeyboardArrowDown className='down' /></Typography>
                                                }


                                            </Box>

                                            <Button className='color_primary' onClick={() => fareifreview(data)} style={{ width: '100%', maxWidth: 300, marginTop: 3 }}>Book</Button>
                                        </Box>

                                    </Box>

                                    {tabValueoption == i && (
                                        <Box className='flight_detail_bot tab'>
                                            <Grid container>
                                                <Grid item md={6}> <Flightoptions _data={data?.going} _fromparent={fromparent} _type="going" /> </Grid>
                                                <Grid item md={6}> <Flightoptions _data={data?.returns} _fromparent={fromparent} _type="returns" /> </Grid>
                                            </Grid>
                                        </Box>
                                    )}


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
                                                    <Faredetails value={data?.totalPriceList} _paxtypeget={_paxtypeget} />
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
