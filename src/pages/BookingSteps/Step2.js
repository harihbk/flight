import React, { useEffect , useContext , useRef} from "react";
import { Container, InputLabel ,MenuItem ,Grid, Box, Typography, Button, ButtonGroup, Modal, FormGroup, FormControl, TextField, FormControlLabel, RadioGroup, Radio,Select, Checkbox } from '@mui/material';
import { List, ListItem } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TabPanelUnstyled,TabsUnstyled, TabUnstyled, TabsListUnstyled } from '@mui/base';
import { ReactComponent as CrossIcon } from '../../assets/flight/x.svg';
import { ReactComponent as SeatEmty } from '../../assets/flight/seat_empty.svg';
import { ArrowRightAlt } from '@mui/icons-material';
import { ReactComponent as CompleteIcon } from '../../assets/icons/tick.svg';
import TripinfoContext from "./context"
import * as Yup from "yup";
import moment from 'moment'
import axios from "axios";
import Seatpopup from "./seatpopup";
import AlertPopup from "./alertPopup"
import Skeleton from '@mui/material/Skeleton';
import { country } from "./country"
import { completeservice } from "./rxjs";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { ErrorMessage, Field, FieldArray, Form, Formik ,useFormikContext , getIn} from "formik";
import { _, debounce } from 'lodash'
import { useOutletContext } from "react-router-dom";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Showseatselectfn( obj ) {


    const { _currflightdetial , _pp , _setOpen , _open } = obj
    const [ seats , setSeats ] = React.useState('')
    const [ seatstatus , setSeatstatus ] = React.useState('')

    React.useEffect(()=>{
        var ind
        for (const key in _currflightdetial) {
        if (Object.hasOwnProperty.call(_currflightdetial, key)) {
            const element = Object.keys(_currflightdetial[key]);
            if(element == _pp.id){
            ind = key
            }
        }
        }
        let fd = _currflightdetial?.[ind]?.[_pp.id];
        if(fd !=null){
                   var dis='';
                   var dff=''
                   for (const key in fd) {
                       let lab = fd[key];
                       dis += `${lab['passanger']}-${lab['key']}-${lab['seat']},`
                       dff += lab['seat']
                   }
                   setSeats(dis)
                }
    },[_open])

    return (
       <>
        { seats.length > 0 && <> { seats } </> }
        { seats.length == 0 && <> No seat Selected </> }
       </>
    );
}




export default function Step2(props){
    const [hasGst, setHasGst] = React.useState('yes');
    const [updateSms, setUpdateSms] = React.useState(true);
    const [addonTab, setAddonTab] = React.useState();
    const [baggageInfo, setBaggageInfo] = React.useState(10);
    const [openPage3, setOpenPage3] = React.useState(false);
    const [promocard, setpromocard] = React.useState('promo1');
    const [startDate, setStartDate] = React.useState(new Date());
    const [paxinfo, setPaxinfo] = React.useState({});
    const [ currflightdetial , setCurrflightdetial ] = React.useState([])
    const [ currflightdetiallocalstorage , setCurrflightdetiallocalstorage ] = React.useState([])
    const [ selectflightdetail , setSelectflightdetail ] = React.useState([])
    const [ baggagelc , setBaggagelc ] = React.useState([])

    const things = useContext(TripinfoContext)

    const [data ,setData] = React.useState(things)
    const formRef = useRef()
    let incv = useRef(0)


    const { stepObj } = props;
    const { activestatus } = props;

    const { reff } = useOutletContext();

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
    

    useEffect(() =>{


        // var paxmodify = []
        // for (const key in data?.searchQuery?.paxInfo) {
        //     let k = data?.searchQuery?.paxInfo[key]
        //      for (let index = 1; index <= k ; index++) {
        //          let obj = {
        //              label : key,
        //              value : index
        //          }
        //          paxmodify.push(obj)
        //      }

        // }
        // setPaxinfo(paxmodify);

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


   // data.searchQuery.paxInfo
   var _initialValues = {}

   try {


    var dff = JSON.parse(window.localStorage.getItem('passangerdetail'))
    // if(dff?.['_baggagemeals']){

    //     try {
    //     let dfg =dff?._baggagemeals
    //     console.log(dfg);
    //    // setBaggagelc(dfg)
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }
  
    const df = date => {
        if(date){
         return new Date(date)
        }
        return ''

    }


    for (const key in data?.searchQuery?.paxInfo) {
       if(data.searchQuery.paxInfo[key] > 0){
           let cnt = data.searchQuery.paxInfo[key];
           let hh = []

           for (let index = 0; index < cnt; index++) {
            let result = key.toLowerCase();
            let localdata = dff?.[result][index];




               let o = {
                 title : localdata?.title || '',
                 firstname : localdata?.firstname || '',
                 lastname :  localdata?.lastname || '',
                 passportinfo : {
                     nationality : localdata?.passportinfo?.nationality || '',
                     passportno  : localdata?.passportinfo?.passportno || '',
                     issuedate : df(localdata?.passportinfo?.issuedate) ,
                     expiredate : df(localdata?.passportinfo?.expiredate),
                     dob :  df(localdata?.passportinfo?.dob)
                     
                 }
             };
             hh.push(o)
           }

           
           _initialValues[key.toLowerCase()] = hh
       }
    }



    console.log(data?.searchQuery?.paxInfo);
    var paxmodifyfn = []

    var ji = 0
    data?.tripInfos?.map((a,pi)=>{
         a?.sI.map((b,pii)=>{
        console.log(b);

        for (const key in data?.searchQuery?.paxInfo) {
            let k = data?.searchQuery?.paxInfo[key]
            for (let index = 1; index <= k ; index++) {
                let obj = {
                    label : key,
                    value : index,
                    inc   : ji,
                    optionbaggage : b.ssrInfo.BAGGAGE,
                    optionmeal : b.ssrInfo.MEAL,
                    fd : `${b?.da?.city} - ${ b?.aa?.city } ${ moment(b?.dt).format("ddd, MMM Do YYYY ") }`,
                    mealsvalue : dff?.['baggagemeals']?.[ji]?.['mealsvalue'] || '',
                    baggagevalue :dff?.['baggagemeals']?.[ji]?.['baggagevalue'] || ''

                }
                ji++
                paxmodifyfn.push(obj)
            }
        }
             
           // console.log(b)

        })
    })   

   

   // console.log(paxmodifyfn);
    

    // var paxmodify = []
    // for (const key in data?.searchQuery?.paxInfo) {
    //     let k = data?.searchQuery?.paxInfo[key]
    //      for (let index = 1; index <= k ; index++) {
    //          let obj = {
    //              label : key,
    //              value : index,
                
    //          }
    //          paxmodify.push(obj)
            

    //      }

    // }
    _initialValues['baggagemeals'] = paxmodifyfn

    // if(dff?.['_baggagemeals']){

    //     for (const key in dff?.['_baggagemeals']) {
    //        console.log(dff?.['_baggagemeals'][key]);
    //        let kkey = dff?.['_baggagemeals'][key]

    //        let k = Object.keys(kkey)[0];
    //        //console.log(kkey[k][0]['baggage'])
    //    //    console.log(_initialValues['_baggagemeals'][key][k][0]['baggage'])
    //      //  _initialValues['_baggagemeals'][key][k][0]['baggage'] = kkey[k][0]['baggage']
           
    //     }

    // }
 

   _initialValues['countryCode'] = dff?.countryCode || ''
   _initialValues['email'] = dff?.email || ''
   _initialValues['mobile'] = dff?.mobile || ''

   console.log(_initialValues);

   } catch (error) {
       console.log(error);
   }
  

    const validationSchemachild = {
        child : Yup.array().of(
            Yup.object().shape({
                title : Yup.string().required("Title is Required"),
                firstname : Yup.string().required("Firstname is required"),
                lastname : Yup.string().required("Lastname is required")

            })
        ),
       
    }

    const validationSchemainfant = {
        infant : Yup.array().of(
            Yup.object().shape({
                title : Yup.string().required("Title is Required"),
                firstname : Yup.string().required("Firstname is required"),
                lastname : Yup.string().required("Lastname is required")

            })
        ),
       
    }

    var schemaobj = {}
    if(data.searchQuery.paxInfo.CHILD > 0){
        schemaobj = {
           ...validationSchemachild
        }
    }

    if(data.searchQuery.paxInfo.INFANT > 0){
        schemaobj = {
            ...schemaobj,
           ...validationSchemainfant
        }
    }


    const validationSchemabaggagemeals = {
        baggagemeals : Yup.array().of(
            Yup.object().shape({
                baggage : Yup.string(),
                meals : Yup.string(),

            })
        ),
       
    }

    const validationcontactdetail = {
        countryCode: Yup.string().required("Country is required"),
        mobile : Yup.string().required("Mobile is required"),
        email  : Yup.string()
        .email("Invalid email address format")
        .required("Email is required")
    }

    const validationSchema = Yup.object().shape({
        adult : Yup.array().of(
            Yup.object().shape({
                title : Yup.string().required("Title is Required"),
                firstname : Yup.string().required("Firstname is required"),
                lastname : Yup.string().required("Lastname is required")
            })
        ),
        ...schemaobj,
        ...validationSchemabaggagemeals,
        ...validationcontactdetail
    })

   console.log(validationSchema);

    function onSubmit(fields) {

        // display form field values on success
    //    console.log(fields);
    }

    const [seats , setSeats ] = React.useState([])
    const [seatloading , setSeatloading] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const [ currentrow , setSetcurrentrow ] = React.useState([])
    const [ currentrowdata , setSetcurrentrowdata ] = React.useState({})
    const [ rowid , setRowid ] = React.useState("");
    const [popupShow, setPopupShow] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState('');

    function getflightapi(){
        

        const headers = {
            'Content-Type': 'application/json',
            'apikey': process.env.REACT_APP_FLIGHT_API_KEY
            }
    
            if(seats.length == 0 ){
                axios.post(`${process.env.REACT_APP_FLIGHT_URL}/fms/v1/seat`,{bookingId:data.bookingId} , { headers : headers}  ).then(res=>{
                  //  console.log(res?.data);
                    setSeatloading(false)
                    setSeats(res?.data?.tripSeatMap)
                  }).catch(e=>{
            
                    alert(e?.response?.data?.errors[0]?.message)
                    setSeatloading(false)
        
                  })
            }
    }


    // this method is used for seat flight details

    React.useEffect(()=>{
       var frmtobj = []
      
       for (const key in  data?.searchQuery?.paxInfo) {
          let cnnt = data?.searchQuery?.paxInfo[key]
          if(key != "INFANT"){
            for (let index = 0; index < cnnt; index++) {
                let obj = {
                 passanger : key,
                 key       : index + 1,
                 seat      : '',
                 fees      : '',
                
                }
                frmtobj.push(obj)
               
            }
          }
       }

    var seatmap=[]
     var ii = 0
     data?.tripInfos?.map((h,i)=>{
        let oo
        h.sI?.map((n,ii)=>{
             oo = {}
             n['inc'] = ii++
            oo[n.id] = frmtobj
            seatmap.push(oo)
           
         })
     })
     
   //  setCurrflightdetial(JSON.stringify(window.localStorage.setItem('updateCurrflightdetial',seatmap)));
     setCurrflightdetial(seatmap)
  //  alert(1)
    },[])
        // this method is used for seat flight details



    function getSets(pp){

   


        let isUnavailable =  seats?.tripSeat?.[pp.id];
        console.log(isUnavailable);

        console.log(isUnavailable);

        if(isUnavailable?.nt){
            setPopupShow(true);
            setAlertMsg(isUnavailable?.nt);
        }else{
            setRowid(pp.id)
            setSelectflightdetail(pp)
            let curr_row  = seats?.tripSeat?.[pp.id]
            // console.log(curr_row);
            if(curr_row == undefined){
                alert("Seat Selection not applicable")
            }else{
                setSetcurrentrow(curr_row)
                setSetcurrentrowdata(pp)
                setOpen(true) 
            }
        }
             
    }

   

    function seatbookingreturntoparentfn(temp){

       // console.log(temp);

        let updateCurrflightdetial = [...currflightdetial]
        let getRowid = rowid;
        console.log(getRowid);
        // console.log(updateCurrflightdetial);


        var ind ;
        for (const key in updateCurrflightdetial) {
            if (Object.hasOwnProperty.call(updateCurrflightdetial, key)) {
              const element = Object.keys(updateCurrflightdetial[key]);
              if(element == getRowid){
                ind = key
              }
            }
          }

        updateCurrflightdetial[ind][rowid] = temp
        window.localStorage.setItem('updateCurrflightdetial',JSON.stringify(updateCurrflightdetial))
        setCurrflightdetial(updateCurrflightdetial)
        
    }

    React.useEffect(()=>{
    try {
       // setCurrflightdetiallocalstorage(JSON.parse(window.localStorage.getItem('updateCurrflightdetial')));
       var getd = JSON.parse(window.localStorage.getItem('updateCurrflightdetial'))
    //   console.log(getd);
       if(getd != null ){
        setCurrflightdetial(JSON.parse(window.localStorage.getItem('updateCurrflightdetial')));
       }


    } catch (error) {
        console.log(error);
    }
   // alert(2)

    },[])

   


    return(
        <div>
          { open   &&  <Seatpopup _open={open} _rowid={rowid} _currentrowdata={currentrowdata} _setOpen={setOpen} _selectflightdetail={selectflightdetail} _currentrow={currentrow} _currflightdetial={currflightdetial} seatbookingreturntoparentfn={seatbookingreturntoparentfn}/>} 
            <Box className="stepWrapper">
                <Box className="stepcontHeader">
                    <Typography className="stitle">Passenger Details</Typography>
                </Box>

                <Formik 
                innerRef={reff} 
                initialValues={_initialValues} 
                validationSchema={validationSchema} 
                onSubmit={onSubmit}
               
                >
                    {({ errors, values, touched, setValues,setFieldValue }) => (
                                
                <Form>

                <Box className="boxcont">
                    <Box className="form">
                        <Box className="form_item_wrapper">
                                <FieldArray name="adult" key={'adults'}>
                                        {() => (values.adult.map((adult, i) => {
                                        const ticketErrors = errors.adult?.length && errors.adult[i] || {};
                                        const ticketTouched = touched.adult?.length && touched.adult[i] || {};
                                        return (
                                            <Box key={i} className='borderbox'>
                                                <Box className="list-group list-group-flush adultdetail" sx={{ marginBottom : 3 }}>
                                                    <Box className="list-group-item">
                                                        <Box className="formtitle" sx={{ marginBottom : 1 }}> 
                                                            <Box className="icon"></Box> <Typography>ADULT {i + 1}</Typography>
                                                        </Box>
                                                        <Box className="form-row" style={{display:'flex'}}>
                                                            <Grid container spacing={2}>
                                                                <Grid item md={2} className="form-group col-6">
                                                                    <label>Title1</label>

                                                                    <Field as="select" name={`adult.${i}.title`} className='form-control'>
                                                                        <option value="0">Select</option>
                                                                        <option value="mr">Mr</option>
                                                                        <option value="mrs">Mrs</option>
                                                                        <option value="ms">Ms</option>
                                                                    </Field>

                                                                    {/* <Field name={`adult.${i}.title`} type="text" className={'form-control' + (ticketErrors.title && ticketTouched.title ? ' is-invalid' : '' )} /> */}
                                                                    <ErrorMessage name={`adult.${i}.title`} component="div" className="invalid-feedback" />
                                                                </Grid>
                                                                <Grid item md={5}  className="form-group col-6">
                                                                    <label>First Name</label>
                                                                    <Field name={`adult.${i}.firstname`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />
                                                                    <ErrorMessage name={`adult.${i}.firstname`} component="div" className="invalid-feedback" />
                                                                </Grid>
                                                                <Grid item md={5}  className="form-group col-6">
                                                                    <label>Last Name</label>
                                                                    <Field name={`adult.${i}.lastname`} type="text" className={'form-control' + (ticketErrors.lastname && ticketTouched.lastname ? ' is-invalid' : '' )} />
                                                                    <ErrorMessage name={`adult.${i}.lastname`} component="div" className="invalid-feedback" />
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Box className="passportdetail" sx={{ marginBottom : 3 }}>
                                                    <Box className="formtitle" sx={{ marginBottom : 2 }}> 
                                                        <Box className="icon"></Box> <Typography>ADD PASSPORT INFORMATION</Typography>
                                                    </Box>
                                                    <Grid container spacing={2} >
                                                        <Grid item md={2}  >
                                                            <label>Nationality</label>
                                                            <Field as="select" name={`adult.${i}.passportinfo.nationality`} className='form-control'>
                                                                <option value="0">Select</option>
                                                                <option value="mr">Mr</option>
                                                                <option value="mrs">Mrs</option>
                                                                <option value="ms">Ms</option>
                                                            </Field>
                                                        </Grid>
                                                        <Grid item md={4}  >
                                                            <label>Passport No</label>
                                                            <Field name={`adult.${i}.passportinfo.passportno`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />

                                                        </Grid>
                                                        <Grid item md={2}  >
                                                            <label>Issue Date</label>
                                                            {/* <DatePicker name={`adult.${i}.passportinfo.issuedate`} onChange={e=> datechange(e) }/> */}
                                                            <DatePicker    
                                                                className="form-control"
                                                                name={`adult.${i}.passportinfo.issuedate`}
                                                                selected={getIn(values, `adult.${i}.passportinfo.issuedate`) || ''}
                                                                value={getIn(values, `adult.${i}.passportinfo.issuedate`) || ''}
                                                                onChange={(e) =>
                                                                setFieldValue(`adult.${i}.passportinfo.issuedate`, e)
                                                                }   
                                                                />

                                                        </Grid>
                                                        <Grid item md={2}  >
                                                            Expiry Date
                                                            <DatePicker    
                                                                className="form-control"
                                                                name={`adult.${i}.passportinfo.expiredate`}
                                                                selected={getIn(values, `adult.${i}.passportinfo.expiredate`) || ''}
                                                                value={getIn(values, `adult.${i}.passportinfo.expiredate`) || ''}
                                                                onChange={(e) =>
                                                                setFieldValue(`adult.${i}.passportinfo.expiredate`, e)
                                                                }   
                                                                />
                                                        </Grid>
                                                        <Grid item md={2}  >
                                                            Date of Birth
                                                            <DatePicker   
                                                                className="form-control" 
                                                                name={`adult.${i}.passportinfo.dob`}
                                                                selected={getIn(values, `adult.${i}.passportinfo.dob`) || ''}
                                                                value={getIn(values, `adult.${i}.passportinfo.dob`) || ''}
                                                                onChange={(e) =>
                                                                setFieldValue(`adult.${i}.passportinfo.dob`, e)
                                                                }   
                                                                />
                                                        </Grid>

                                                    </Grid>
                                                </Box>
                                            </Box>
                                        );
                                    }))}
                                    </FieldArray>
                                            {/* child */}
                                            { values?.child?.length > 0  && 
                                               <FieldArray name="child" key={'childs'}>
                                                        {() => (values.child.map((child, i) => {
                                                        const ticketErrors = errors.child?.length && errors.child[i] || {};
                                                        const ticketTouched = touched.child?.length && touched.child[i] || {};
                                                        return (
                                                            <Box  key={i}  className='borderbox'>
                                                                <Box className="list-group list-group-flush child" style={{ marginBottom : 20 }}>
                                                                    <Box className="list-group-item">
                                                                        <Box className="formtitle" sx={{ marginBottom : 2 }}> 
                                                                            <Box className="icon"></Box> <Typography>CHILD {i + 1}</Typography>
                                                                        </Box>
                                                                        <Grid container spacing={2} className="form-row" >
                                                                            <Grid item md={2} className="form-group col-6">
                                                                                <label>Title</label>

                                                                                <Field as="select" name={`child.${i}.title`} className={'form-control'}>
                                                                                    <option value="0">Select</option>
                                                                                    <option value="mr">Mr</option>
                                                                                    <option value="mrs">Mrs</option>
                                                                                    <option value="ms">Ms</option>
                                                                                </Field>

                                                                                <ErrorMessage name={`child.${i}.title`} component="div" className="invalid-feedback" />
                                                                            </Grid>
                                                                            <Grid item md={5} className="form-group col-6">
                                                                                <label>First Name</label>
                                                                                <Field name={`child.${i}.firstname`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />
                                                                                <ErrorMessage name={`child.${i}.firstname`} component="div" className="invalid-feedback" />
                                                                            </Grid>
                                                                            <Grid item md={5} className="form-group col-6">
                                                                                <label>Last Name</label>
                                                                                <Field name={`child.${i}.lastname`} type="text" className={'form-control' + (ticketErrors.lastname && ticketTouched.lastname ? ' is-invalid' : '' )} />
                                                                                <ErrorMessage name={`child.${i}.lastname`} component="div" className="invalid-feedback" />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                </Box>

                                                                <Box className="passportdetail">
                                                                    <Box className="formtitle" sx={{ marginBottom : 2 }}> 
                                                                        <Box className="icon"></Box> <Typography>ADD PASSPORT INFORMATION</Typography>
                                                                    </Box>
                                                                    <Grid container spacing={2} >
                                                                        <Grid item md={2}>
                                                                            <label>Nationality</label>
                                                                            <Field as="select" name={`child.${i}.passportinfo.nationality`} className='form-control'>
                                                                                <option value="0">Select</option>
                                                                                <option value="mr">Mr</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>
                                                                        </Grid>
                                                                        <Grid  item md={4}> 
                                                                            <label>Passport No</label>
                                                                            <Field name={`child.${i}.passportinfo.passportno`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />

                                                                        </Grid>
                                                                        <Grid  item md={2}>
                                                                            <label>Issue Date</label>
                                                                            <DatePicker    
                                                                                className="form-control"
                                                                                name={`child.${i}.passportinfo.issuedate`}
                                                                                selected={getIn(values, `child.${i}.passportinfo.issuedate`) || ''}
                                                                                value={getIn(values, `child.${i}.passportinfo.issuedate`) || ''}
                                                                                onChange={(e) =>
                                                                                setFieldValue(`child.${i}.passportinfo.issuedate`, e)
                                                                                }   
                                                                            />

                                                                        </Grid>
                                                                        <Grid  item md={2}>
                                                                            Expiry Date
                                                                            <DatePicker    
                                                                                className="form-control"
                                                                                name={`child.${i}.passportinfo.expiredate`}
                                                                                selected={getIn(values, `child.${i}.passportinfo.expiredate`) || ''}
                                                                                value={getIn(values, `child.${i}.passportinfo.expiredate`) || ''}
                                                                                onChange={(e) =>
                                                                                setFieldValue(`child.${i}.passportinfo.expiredate`, e)
                                                                                }   
                                                                            />
                                                                        </Grid>
                                                                        <Grid  item md={2}>
                                                                            Date of Birth
                                                                            <DatePicker    
                                                                                className="form-control"
                                                                                name={`child.${i}.passportinfo.dob`}
                                                                                selected={getIn(values, `child.${i}.passportinfo.dob`) || ''}
                                                                                value={getIn(values, `child.${i}.passportinfo.dob`) || ''}
                                                                                onChange={(e) =>
                                                                                setFieldValue(`child.${i}.passportinfo.dob`, e)
                                                                                }   
                                                                            />
                                                                        </Grid>

                                                                    </Grid>
                                                                </Box>
                                                            </Box>
                                                        );
                                                    }))}
                                                    </FieldArray> 
                                            }

                                                    {/* INFANT */}


                                            { values?.infant?.length > 0  && 
                                                    <FieldArray name="infant"  key={'infants'}>
                                                        {() => (values.infant.map((infant, i) => {
                                                        const ticketErrors = errors.infant?.length && errors.infant[i] || {};
                                                        const ticketTouched = touched.infant?.length && touched.infant[i] || {};
                                                        return (
                                                            <>
                                                            <div key={i} className="list-group list-group-flush" >
                                                                <div className="list-group-item">
                                                                    <h5 className="card-title">infant {i + 1}</h5>
                                                                    <Grid container spacing={2} className="form-row">
                                                                        <Grid item md={2} className="form-group col-6">
                                                                            <label>Title</label>

                                                                            <Field as="select" name={`infant.${i}.title`}>
                                                                                <option value="0">Select</option>
                                                                                <option value="mr">Mr</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>

                                                                            <ErrorMessage name={`infant.${i}.title`} component="div" className="invalid-feedback" />
                                                                        </Grid>
                                                                        <Grid item md={5}  className="form-group col-6">
                                                                            <label>First Name</label>
                                                                            <Field name={`infant.${i}.firstname`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`infant.${i}.firstname`} component="div" className="invalid-feedback" />
                                                                        </Grid>
                                                                        <Grid  item md={5} className="form-group col-6">
                                                                            <label>Last Name</label>
                                                                            <Field name={`infant.${i}.lastname`} type="text" className={'form-control' + (ticketErrors.lastname && ticketTouched.lastname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`infant.${i}.lastname`} component="div" className="invalid-feedback" />
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </div>

                                                            <Box>
                                                                <Typography>ADD PASSPORT INFORMATION</Typography>
                                                                <Grid  container spacing={2} className="form-row">
                                                                    <Grid item md={2}  >
                                                                        <label>Nationality</label>
                                                                        <Field as="select" name={`infant.${i}.passportinfo.nationality`} className={'form-control'}>
                                                                            <option value="0">Select</option>
                                                                            <option value="mr">Mr</option>
                                                                            <option value="mrs">Mrs</option>
                                                                            <option value="ms">Ms</option>
                                                                        </Field>
                                                                    </Grid>
                                                                    <Grid item md={4} >
                                                                        <label>Passport No</label>
                                                                        <Field name={`infant.${i}.passportinfo.passportno`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />

                                                                    </Grid>
                                                                    <Grid item md={2} >
                                                                        <label>Issue Date</label>
                                                                        <DatePicker    
                                                                            className="formpicker form-control"
                                                                            name={`infant.${i}.passportinfo.issuedate`}
                                                                            selected={getIn(values, `infant.${i}.passportinfo.issuedate`) || ''}
                                                                            value={getIn(values, `infant.${i}.passportinfo.issuedate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`infant.${i}.passportinfo.issuedate`, e)
                                                                            }   
                                                                            />

                                                                    </Grid>
                                                                    <Grid item md={2} >
                                                                        Expiry Date
                                                                        <DatePicker  
                                                                            className="formpicker form-control"  
                                                                            name={`infant.${i}.passportinfo.expiredate`}
                                                                            selected={getIn(values, `infant.${i}.passportinfo.expiredate`) || ''}
                                                                            value={getIn(values, `infant.${i}.passportinfo.expiredate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`infant.${i}.passportinfo.expiredate`, e)
                                                                            }   
                                                                            />
                                                                    </Grid>
                                                                    <Grid item md={2} >
                                                                        Date of Birth
                                                                        <DatePicker    
                                                                            className="formpicker"
                                                                            name={`infant.${i}.passportinfo.dob`}
                                                                            selected={getIn(values, `infant.${i}.passportinfo.dob`) || ''}
                                                                            value={getIn(values, `infant.${i}.passportinfo.dob`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`infant.${i}.passportinfo.dob`, e)
                                                                            }   
                                                                            />
                                                                    </Grid>

                                                                </Grid>
                                                            </Box>
                                                            </>
                                                        );
                                                    }))}
                                                    </FieldArray>
                                            }


                                <Box className="contact borderbox" sx={{ marginTop : 2 }}>
                                    <Box className="formtitle" sx={{ marginBottom : 1 }}> 
                                        <Box className="icon"></Box> <Typography>CONTACT DETAILS</Typography>
                                    </Box>
                                    <Grid container spacing={2} >
                                        <Grid item md={2} className="form-group">
                                            <label htmlFor="Country">Country</label>
                                            <Field as="select" name="countryCode" className='form-control'>
                                            <option value="0">Select</option>    
                                                { country.map(d =>(
                                                    <option value={d.code}>{d.country}</option>
                                                )) }
                                            </Field>
                                            <div className="invalid-feedback">{errors.countryCode}</div>
                                        </Grid>


                                        <Grid item md={4} className="form-group">
                                            <label htmlFor="email">Mobile</label>
                                                <Field
                                                type="text"
                                                name="mobile"
                                                placeholder="Enter mobile"
                                                autocomplete="off"
                                                className={`mt-2 form-control
                                                ${touched.mobile && errors.mobile ? "is-invalid" : ""}`}
                                                />
                
                                            <div className="invalid-feedback">{errors.mobile}</div>

                                        </Grid>
                                        <Grid item md={4}  className="form-group">
                                            <label htmlFor="email">Email</label>
                                                <Field
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                autocomplete="off"
                                                className={`mt-2 form-control
                                                ${touched.email && errors.email ? "is-invalid" : ""}`}
                                                />
                                                <div className="invalid-feedback">{errors.email}</div>
                                        </Grid>
                                    </Grid>
                                </Box>
                              
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
                                <TabUnstyled>Add Baggage,Meals</TabUnstyled>
                                {/* <TabUnstyled>Meals</TabUnstyled> */}
                                <TabUnstyled onChange={()=> getflightapi() }>Seats</TabUnstyled>
                            </TabsListUnstyled>
                            <TabPanelUnstyled value={0} >


                                                            
                                                                <FieldArray name="baggagemeals" key={'bagg'}>

                                                                    {() =>  values?.baggagemeals?.map((_baggagemeals, i) => {
                                                                        console.log(_baggagemeals);
                                                                        return (


                                                                            <>
                                                                            <Box key={i} sx={{ marginBottom : 2 }}>
                                                                                <Grid container spacing={2} alignItems={'center'}>
                                                                                    <Grid item>
                                                                                        <Typography>{_baggagemeals.label}{_baggagemeals.value}</Typography>
                                                                                    </Grid>
                                                                                    <Grid item md={4}>
                                                                                            <Box className="location_badge">
                                                                                                <Typography> { _baggagemeals.fd } </Typography>
                                                                                            </Box> 
                                                                                        
                                                                                    </Grid>
                                                                                    <Grid item md={3}>
                                                                                        <FormGroup>
                                                                                            <label>Baggage </label>
                                                                                            <Field as="select" name={`baggagemeals.${i}.baggagevalue`}  className='form-control'>
                                                                                                <option value="0">Select</option>
                                                                                                { _baggagemeals.optionbaggage?.length > 0 && _baggagemeals.optionbaggage?.map((bagg)=>(
                                                                                                    <option value={bagg.code}   >{bagg.desc} @ {bagg.amount}</option>
                                                                                                ))}
                                                                                            </Field>
                                                                                        </FormGroup>
                                                                                    </Grid>
                        
                                                                                    <Grid item md={3}>
                                                                                        <FormGroup>
                                                                                            <label>Meals</label>
                                                                                            <Field as="select" name={`baggagemeals.${i}.mealsvalue`}  className='form-control'>
                                                                                                <option value="0">Select</option>
                                                                                                { _baggagemeals.optionmeal?.length > 0 && _baggagemeals.optionmeal?.map((mel)=>(
                                                                                                    <option value={mel.code}   >{mel.desc} @ {mel.amount}</option>
                                                                                                ))}
                                                                                            </Field>
                                                                                        </FormGroup>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Box>
                                                                        </>



                                                                        //     <Field as="select" name={`baggage.${i}.weight`} className='form-control'>
                                                                        //         <option value="0">Select</option>
                                                                        //         { _baggagemeals.optionbaggage?.length > 0 && _baggagemeals.optionbaggage?.map((bagg)=>(
                                                                        //             <option value={bagg.code}   >{bagg.desc} @ {bagg.amount}</option>
                                                                        //         ))}
                                                                        // </Field>
                                                                        )
                                                                    })}
                                                            

                                                                </FieldArray>    

                                                                  

{/* 
                                { (()=>{
                                    var ii=0
                                    return (
                                        data?.tripInfos?.map((a,pi)=>{
                                           return a?.sI.map((b,pii)=>{
                                                    return (
                                                        <>
                                                            { values?.baggagemeals?.length > 0  &&  
                                                            
                                                                <FieldArray name="baggagemeals" key={'bagg'}>

                                                                    { (()=>{
                                                                        return (
                                                                           <>
                                                                                {
                                                                                     values?.baggagemeals?.map((_baggagemeals, i) => {
                                                                                        ii++
                                                                                         console.log(_baggagemeals);

                                                                                        // selected={bagg.code == dff?.['_baggagemeals'][ii-1][_baggagemeals.label][i]['baggage'] ? true : false }                                                                                         ii++
                                                                                        return (
                                                                                            <>
                                                                                                <Box key={i} sx={{ marginBottom : 2 }}>
                                                                                                    <Grid container spacing={2} alignItems={'center'}>
                                                                                                        <Grid item>
                                                                                                            <Typography>{_baggagemeals.label}{_baggagemeals.value}</Typography>
                                                                                                        </Grid>
                                                                                                        <Grid item md={4}>
                                                                                                            {( b?.ssrInfo?.BAGGAGE?.length > 0 || b?.ssrInfo?.MEAL?.length > 0 ) && 
                                                                                                                <Box className="location_badge">
                                                                                                                    <Typography> { b?.da?.city } - { b?.aa?.city }  { moment(b?.dt).format("ddd, MMM Do YYYY ") } </Typography>
                                                                                                                </Box> 
                                                                                                            }
                                                                                                        </Grid>
                                                                                                        <Grid item md={3}>
                                                                                                            <FormGroup>
                                                                                                                <label>Baggage </label>
                                                                                                                <Field as="select" name={`_baggagemeals.${ii-1}.${_baggagemeals.label}.${i}.baggage`}  className='form-control'>
                                                                                                                    <option value="0">Select</option>
                                                                                                                    { b?.ssrInfo?.BAGGAGE?.length > 0 && b?.ssrInfo?.BAGGAGE?.map((bagg)=>(
                                                                                                                        <option value={bagg.code}  selected={bagg.code == dff?.['_baggagemeals'][ii-1][_baggagemeals.label][i]['baggage'] ? true : false } >{bagg.desc} @ {bagg.amount}</option>
                                                                                                                    ))}
                                                                                                                </Field>
                                                                                                            </FormGroup>
                                                                                                        </Grid>
                                            
                                                                                                        <Grid item md={3}>
                                                                                                            <FormGroup>
                                                                                                                <label>Meals</label>
                                                                                                                <Field as="select" name={`_baggagemeals.${ii-1}.${_baggagemeals.label}.${i}.meals`} className='form-control'>
                                                                                                                    <option value="0">Select</option>
                                                                                                                    { b?.ssrInfo?.MEAL?.length > 0 && b?.ssrInfo?.MEAL?.map((meal)=>(
                                                                                                                        <option value={meal.code}>{meal.desc} @ {meal.amount}</option>
                                                                                                                    ))}
                                                                                                                </Field>
                                                                                                            </FormGroup>
                                                                                                        </Grid>
                                                                                                    </Grid>
                                                                                                </Box>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                           </>
                                                                        )
                                                                    })() }

                                                                </FieldArray>
                                                              
                                                                
                                                            }
                                                        </>    
                                                        
                                                    )   
                                            })
                                        })
                                    );
                                })(values) } */}


                            </TabPanelUnstyled>


                           
                            <TabPanelUnstyled value={1}>

                            { seatloading == false && 
                            <Box className="wrapper seats_wrapper">
                            <TabsUnstyled defaultValue={0} orientation="vertical" className="mealstab">
                                        <TabsListUnstyled className='tablistnav noborder'>
                                      
                                        { data?.tripInfos?.map((p,pi)=>(
                                           
                                        <React.Fragment>
                                            { p?.sI?.map((pp,ppi)=>( 
                                                <Grid container style={{ width : '100%'}} justifyContent="space-between" key={ppi} >
                                                    <Grid item style={{ width : '20%'}}>
                                                        <TabUnstyled >
                                                            <Typography className="place_text" style={{ fontWeight : '300' }}>{pp.da.city}
                                                            <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                                            {pp.aa.city}</Typography>
                                                            <Typography style={{ fontSize : 11, opacity : .7 }} className="date_text small">on { moment(pp?.dt).format("MMM Do YYYY ") } </Typography>
                                                        </TabUnstyled>
                                                    </Grid>
                                                    <Grid item>
                                                        <Showseatselectfn _setOpen={setOpen} _open={open} _currflightdetial={currflightdetial} _pp={pp}/>
                                                    </Grid>
                                                    <Grid>
                                                        <Button variant="outlined" onClick={()=>getSets(pp )}>Show Seat Map</Button>
                                                        <AlertPopup popupOpen={popupShow} mapMessage={alertMsg} _setPopupShow={setPopupShow} />
                                                    </Grid>
                                                </Grid>     
                                            ))}
                                        </React.Fragment>
                                        )) }
                                        </TabsListUnstyled>
                            </TabsUnstyled>
                        </Box>
                            }

                                { seatloading == true &&  
                                    <Box sx={{ width: '100%' }}>
                                        <Skeleton />
                                        <Skeleton animation="wave" />
                                        <Skeleton animation={false} />
                                    </Box>
                                }
                                

                            </TabPanelUnstyled>
                        </TabsUnstyled>                        
                    </Box>
                </Box>


                {/* <button type="submit">Form Submit</button> */}



</Form>
)}



</Formik>







            </Box>
        </div>
    )
}