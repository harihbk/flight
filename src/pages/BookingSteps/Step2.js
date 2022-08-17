import React, { useEffect , useContext} from "react";
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
import Seatpopup from "./seatpopup"
import Skeleton from '@mui/material/Skeleton';

import { ErrorMessage, Field, FieldArray, Form, Formik ,useFormikContext , getIn} from "formik";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerField({ name }) {
    const formik = useFormikContext();
    const field = formik.getFieldProps(name);
  
    console.log(name);
    return (
      <DatePicker
        value={field.value}
        onChange={value => formik.setFieldValue(name, value)}
      />
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
    const [ selectflightdetail , setSelectflightdetail ] = React.useState([])

    const things = useContext(TripinfoContext)

    const [data ,setData] = React.useState(things)



    const { stepObj } = props;
    const { activestatus } = props;
    console.log(things);

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

    for (const key in data?.searchQuery?.paxInfo) {
       if(data.searchQuery.paxInfo[key] > 0){
           let cnt = data.searchQuery.paxInfo[key];
           let hh = []

           for (let index = 0; index < cnt; index++) {
              

               let o = {
                 title : '',
                 firstname : '',
                 lastname : '',
                 passportinfo : {
                     nationality : '',
                     passportno  : '',
                     issuedate : '',
                     expirydate : '',
                     dob : ''
                 }
             };
             hh.push(o)
           }

           _initialValues[key.toLowerCase()] = hh
       }
    }
    

    var paxmodify = []
    for (const key in data?.searchQuery?.paxInfo) {
        let k = data?.searchQuery?.paxInfo[key]
         for (let index = 1; index <= k ; index++) {
             let obj = {
                 label : key,
                 value : index
             }
             paxmodify.push(obj)
         }

    }
    _initialValues['baggage'] = paxmodify
   // setPaxinfo(paxmodify);


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
        baggage : Yup.array().of(
            Yup.object().shape({
                baggage : Yup.string(),
                meals : Yup.string(),

            })
        ),
       
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
        ...validationSchemabaggagemeals
    })



    function onSubmit(fields) {

        // display form field values on success
       console.log(fields);
    }

    const [seats , setSeats ] = React.useState([])
    const [seatloading , setSeatloading] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const [ currentrow , setSetcurrentrow ] = React.useState([])
    const [ rowid , setRowid ] = React.useState("")

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
                 fees      : ''
                }
                frmtobj.push(obj)
            }
          }
       }

    var seatmap=[]
     data?.tripInfos?.map((h,i)=>{
        let oo
        h.sI?.map((n,ii)=>{
             oo = {}
            oo[n.id] = frmtobj
            seatmap.push(oo)
         })
     })

     setCurrflightdetial(seatmap)

    },[])
        // this method is used for seat flight details



    function getSets(pp){
        setRowid(pp.id)
        setSelectflightdetail(pp)
        let curr_row  = seats?.tripSeat?.[pp.id]
       // console.log(curr_row);
        if(curr_row == undefined){
            alert("Seat Selection not applicable")
        }else{
            setSetcurrentrow(curr_row)
            setOpen(true) 
        }
             
    }

   

    function seatbookingreturntoparentfn(temp){
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
        setCurrflightdetial(updateCurrflightdetial)
        // console.log(getobjbuid);
        // console.log(temp);
    }

    

    return(
        <div>
          { open   &&  <Seatpopup _open={open} _rowid={rowid} _setOpen={setOpen} _selectflightdetail={selectflightdetail} _currentrow={currentrow} _currflightdetial={currflightdetial} seatbookingreturntoparentfn={seatbookingreturntoparentfn}/>} 
            <Box className="stepWrapper">
                <Box className="stepcontHeader">
                    <Typography className="stitle">dsf</Typography>
                </Box>

                <Formik initialValues={_initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {({ errors, values, touched, setValues,setFieldValue }) => (
                                
                <Form>

                <Box className="boxcont">
                    <Box className="form">
                        <Box className="form_item">
                            <Box className="formtitle" sx={{ marginBottom : 2 }}> 
                                <Box className="icon"></Box> <Typography>Adult {'1'}</Typography>
                            </Box>

                              
                                               <FieldArray name="adult" key={'adults'}>
                                                        {() => (values.adult.map((adult, i) => {
                                                        const ticketErrors = errors.adult?.length && errors.adult[i] || {};
                                                        const ticketTouched = touched.adult?.length && touched.adult[i] || {};
                                                        return (
                                                            <>
                                                            <div key={i} className="list-group list-group-flush" >
                                                                <div className="list-group-item">
                                                                    <h5 className="card-title">Adult {i + 1}</h5>
                                                                    <div className="form-row" style={{display:'flex'}}>
                                                                        <div className="form-group col-6">
                                                                            <label>Title</label>

                                                                            <Field as="select" name={`adult.${i}.title`}>
                                                                                <option value="0">Select</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>

                                                                            {/* <Field name={`adult.${i}.title`} type="text" className={'form-control' + (ticketErrors.title && ticketTouched.title ? ' is-invalid' : '' )} /> */}
                                                                            <ErrorMessage name={`adult.${i}.title`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                        <div className="form-group col-6">
                                                                            <label>First Name</label>
                                                                            <Field name={`adult.${i}.firstname`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`adult.${i}.firstname`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                        <div className="form-group col-6">
                                                                            <label>Last Name</label>
                                                                            <Field name={`adult.${i}.lastname`} type="text" className={'form-control' + (ticketErrors.lastname && ticketTouched.lastname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`adult.${i}.lastname`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Box>
                                                                <Typography>ADD PASSPORT INFORMATION</Typography>
                                                                <Box style={{ display:'flex',justifyContent:'space-between' }}>
                                                                    <Box>
                                                                            <label>Nationality</label>
                                                                            <Field as="select" name={`adult.${i}.passportinfo.nationality`}>
                                                                                <option value="0">Select</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>
                                                                    </Box>
                                                                    <Box>
                                                                        <label>Passport No</label>
                                                                        <Field name={`adult.${i}.passportinfo.passportno`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />

                                                                    </Box>
                                                                    <Box>
                                                                        <label>Issue Date</label>
                                                                        {/* <DatePicker name={`adult.${i}.passportinfo.issuedate`} onChange={e=> datechange(e) }/> */}
                                                                        <DatePicker    
                                                                            name={`adult.${i}.passportinfo.issuedate`}
                                                                            selected={getIn(values, `adult.${i}.passportinfo.issuedate`) || ''}
                                                                            value={getIn(values, `adult.${i}.passportinfo.issuedate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`adult.${i}.passportinfo.issuedate`, e)
                                                                            }   
                                                                            />

                                                                    </Box>
                                                                    <Box>
                                                                        Expiry Date
                                                                        <DatePicker    
                                                                            name={`adult.${i}.passportinfo.expiredate`}
                                                                            selected={getIn(values, `adult.${i}.passportinfo.expiredate`) || ''}
                                                                            value={getIn(values, `adult.${i}.passportinfo.expiredate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`adult.${i}.passportinfo.expiredate`, e)
                                                                            }   
                                                                            />
                                                                    </Box>
                                                                    <Box>
                                                                        Date of Birth
                                                                        <DatePicker    
                                                                            name={`adult.${i}.passportinfo.dob`}
                                                                            selected={getIn(values, `adult.${i}.passportinfo.dob`) || ''}
                                                                            value={getIn(values, `adult.${i}.passportinfo.dob`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`adult.${i}.passportinfo.dob`, e)
                                                                            }   
                                                                            />
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                            </>
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
                                                            <>
                                                            <div key={i} className="list-group list-group-flush" >
                                                                <div className="list-group-item">
                                                                    <h5 className="card-title">child {i + 1}</h5>
                                                                    <div className="form-row" style={{display:'flex'}}>
                                                                        <div className="form-group col-6">
                                                                            <label>Title</label>

                                                                            <Field as="select" name={`child.${i}.title`}>
                                                                                <option value="0">Select</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>

                                                                            <ErrorMessage name={`child.${i}.title`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                        <div className="form-group col-6">
                                                                            <label>First Name</label>
                                                                            <Field name={`child.${i}.firstname`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`child.${i}.firstname`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                        <div className="form-group col-6">
                                                                            <label>Last Name</label>
                                                                            <Field name={`child.${i}.lastname`} type="text" className={'form-control' + (ticketErrors.lastname && ticketTouched.lastname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`child.${i}.lastname`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Box>
                                                                <Typography>ADD PASSPORT INFORMATION</Typography>
                                                                <Box style={{ display:'flex',justifyContent:'space-between' }}>
                                                                    <Box>
                                                                            <label>Nationality</label>
                                                                            <Field as="select" name={`child.${i}.passportinfo.nationality`}>
                                                                                <option value="0">Select</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>
                                                                    </Box>
                                                                    <Box>
                                                                        <label>Passport No</label>
                                                                        <Field name={`child.${i}.passportinfo.passportno`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />

                                                                    </Box>
                                                                    <Box>
                                                                        <label>Issue Date</label>
                                                                        <DatePicker    
                                                                            name={`child.${i}.passportinfo.issuedate`}
                                                                            selected={getIn(values, `child.${i}.passportinfo.issuedate`) || ''}
                                                                            value={getIn(values, `child.${i}.passportinfo.issuedate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`child.${i}.passportinfo.issuedate`, e)
                                                                            }   
                                                                            />

                                                                    </Box>
                                                                    <Box>
                                                                        Expiry Date
                                                                        <DatePicker    
                                                                            name={`child.${i}.passportinfo.expiredate`}
                                                                            selected={getIn(values, `child.${i}.passportinfo.expiredate`) || ''}
                                                                            value={getIn(values, `child.${i}.passportinfo.expiredate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`child.${i}.passportinfo.expiredate`, e)
                                                                            }   
                                                                            />
                                                                    </Box>
                                                                    <Box>
                                                                        Date of Birth
                                                                        <DatePicker    
                                                                            name={`child.${i}.passportinfo.dob`}
                                                                            selected={getIn(values, `child.${i}.passportinfo.dob`) || ''}
                                                                            value={getIn(values, `child.${i}.passportinfo.dob`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`child.${i}.passportinfo.dob`, e)
                                                                            }   
                                                                            />
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                            </>
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
                                                                    <div className="form-row" style={{display:'flex'}}>
                                                                        <div className="form-group col-6">
                                                                            <label>Title</label>

                                                                            <Field as="select" name={`infant.${i}.title`}>
                                                                                <option value="0">Select</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>

                                                                            <ErrorMessage name={`infant.${i}.title`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                        <div className="form-group col-6">
                                                                            <label>First Name</label>
                                                                            <Field name={`infant.${i}.firstname`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`infant.${i}.firstname`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                        <div className="form-group col-6">
                                                                            <label>Last Name</label>
                                                                            <Field name={`infant.${i}.lastname`} type="text" className={'form-control' + (ticketErrors.lastname && ticketTouched.lastname ? ' is-invalid' : '' )} />
                                                                            <ErrorMessage name={`infant.${i}.lastname`} component="div" className="invalid-feedback" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Box>
                                                                <Typography>ADD PASSPORT INFORMATION</Typography>
                                                                <Box style={{ display:'flex',justifyContent:'space-between' }}>
                                                                    <Box>
                                                                            <label>Nationality</label>
                                                                            <Field as="select" name={`infant.${i}.passportinfo.nationality`}>
                                                                                <option value="0">Select</option>
                                                                                <option value="mrs">Mrs</option>
                                                                                <option value="ms">Ms</option>
                                                                            </Field>
                                                                    </Box>
                                                                    <Box>
                                                                        <label>Passport No</label>
                                                                        <Field name={`infant.${i}.passportinfo.passportno`} type="text" className={'form-control' + (ticketErrors.firstname && ticketTouched.firstname ? ' is-invalid' : '' )} />

                                                                    </Box>
                                                                    <Box>
                                                                        <label>Issue Date</label>
                                                                        <DatePicker    
                                                                            name={`infant.${i}.passportinfo.issuedate`}
                                                                            selected={getIn(values, `infant.${i}.passportinfo.issuedate`) || ''}
                                                                            value={getIn(values, `infant.${i}.passportinfo.issuedate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`infant.${i}.passportinfo.issuedate`, e)
                                                                            }   
                                                                            />

                                                                    </Box>
                                                                    <Box>
                                                                        Expiry Date
                                                                        <DatePicker    
                                                                            name={`infant.${i}.passportinfo.expiredate`}
                                                                            selected={getIn(values, `infant.${i}.passportinfo.expiredate`) || ''}
                                                                            value={getIn(values, `infant.${i}.passportinfo.expiredate`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`infant.${i}.passportinfo.expiredate`, e)
                                                                            }   
                                                                            />
                                                                    </Box>
                                                                    <Box>
                                                                        Date of Birth
                                                                        <DatePicker    
                                                                            name={`infant.${i}.passportinfo.dob`}
                                                                            selected={getIn(values, `infant.${i}.passportinfo.dob`) || ''}
                                                                            value={getIn(values, `infant.${i}.passportinfo.dob`) || ''}
                                                                            onChange={(e) =>
                                                                            setFieldValue(`infant.${i}.passportinfo.dob`, e)
                                                                            }   
                                                                            />
                                                                    </Box>

                                                                </Box>
                                                            </Box>
                                                            </>
                                                        );
                                                    }))}
                                                    </FieldArray>
                                            }



                                {/* { values?.baggage?.length > 0  && 
                                
                                <FieldArray name="baggagemeals" >
                                {() => (values.baggage.map((baggagemeals, i) => {
                                const ticketErrors = errors.baggagemeals?.length && errors.baggagemeals[i] || {};
                                const ticketTouched = touched.baggagemeals?.length && touched.baggagemeals[i] || {};
                                return (
                                    <>
                                    

                                    <Box key={i}>
                                        <Box style={{ display:'flex',justifyContent:'space-between' }}>
                                           
                                            <Box>
                                                <label>Baggage</label>
                                                <Field name={`baggagemeals.${i}.baggage`} type="text" className={'form-control'} />
                                            </Box>

                                            <Box>
                                                <label>Meals</label>
                                                <Field name={`baggagemeals.${i}.meals`} type="text" className={'form-control'} />
                                            </Box>
                                           

                                        </Box>
                                    </Box>
                                    </>
                                );
                            }))}
                            </FieldArray>
                                
                                } */}





                             

                              
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

                                { data?.tripInfos?.length > 0 &&  
                                data?.tripInfos?.map((a,pi)=>(
                                    
                                    <>
                                    { a?.sI.map((b,pii)=>(
                                        <>
                                        {
                                            b?.ssrInfo?.BAGGAGE?.length > 0 && b?.ssrInfo?.MEAL?.length > 0 &&
                                            <>
                                            <Typography> { b?.da?.city } - { b?.aa?.city } on { moment(b?.dt).format("ddd, MMM Do YYYY ") } </Typography> 
                                 
                                 { values?.baggage?.length > 0  && 
                                
                                <FieldArray name="baggagemeals" key={'bagg'}>
                                {() => (values.baggage.map((baggagemeals, i) => {
                                return (
                                    <>
                                    <Box key={i}>
                                        <Typography><label>{baggagemeals.label}{baggagemeals.value}</label></Typography>
                                        <Box style={{ display:'flex',justifyContent:'space-between' }}>
                                           
                                            <Box>
                                             <label>Baggage</label>
                                                <Field as="select" name={`baggagemeals.${pi + pii}.${baggagemeals.label}.${i}.baggage`}>
                                                                                <option value="0">Select</option>
                                                                                { b?.ssrInfo?.BAGGAGE.length > 0 && b?.ssrInfo?.BAGGAGE.map((bagg)=>(
                                                                                    <option value={bagg.code}>{bagg.desc} @ {bagg.amount}</option>
                                                                                ))}
                                                                            </Field>
                                            </Box>

                                            <Box>
                                                <label>Meals</label>
                                                <Field as="select" name={`baggagemeals.${pi + pii}.${baggagemeals.label}.${i}.meals`}>
                                                                                <option value="0">Select</option>
                                                                                { b?.ssrInfo?.MEAL.length > 0 && b?.ssrInfo?.MEAL.map((meal)=>(
                                                                                    <option value={meal.code}>{meal.desc} @ {meal.amount}</option>
                                                                                ))}
                                                                            </Field>
                                            </Box>
                                           

                                        </Box>
                                    </Box>

                                    </>
                                );
                                }))}
                                </FieldArray>
                                
                                } 

                                            </>
                                            
                                        }

                               
                                       
                                        </>
                                    ))}

                                    </>
                                )) }
                               


                            </TabPanelUnstyled>


                           
                            <TabPanelUnstyled value={1}>

                            { seatloading == false && 
                            <Box className="wrapper seats_wrapper">
                            <TabsUnstyled defaultValue={0} orientation="vertical" className="mealstab">
                                        <TabsListUnstyled className='tablistnav noborder'>
                                        { data?.tripInfos?.map((p,pi)=>(
                                        <>
                                            { p?.sI?.map((pp,ppi)=>( 
                                                <Grid container style={{ width : '100%'}} justifyContent="space-between">
                                                <Grid item style={{ width : '20%'}}>
                                                    <TabUnstyled >
                                                    <Typography className="place_text" style={{ fontWeight : '300' }}>{pp.da.city}
                                                    <img src={require('../../assets/icons/arrow-right.png')} alt="arrow" style={{ width: 11, marginLeft : 3, marginRight : 3 }}/>
                                                    {pp.aa.city}</Typography>
                                                    <Typography style={{ fontSize : 11, opacity : .7 }} className="date_text small">on { moment(pp?.dt).format("MMM Do YYYY ") } </Typography>
                                                    </TabUnstyled>
                                                </Grid>
                                                <Grid>
                                                    no Seat Selected
                                                </Grid>
                                                <Grid>
                                                    <Button variant="outlined" onClick={()=>getSets(pp )}>Show Seat Map</Button>
                                                </Grid>
                                                </Grid>     
                                            ))}
                                        </>
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


                                                    <button type="submit">Form Submit</button>



</Form>
)}



</Formik>






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