import React , { useCallback } from "react";
import { Container,Grid, Box, Typography, Button } from '@mui/material';
import TripinfoContext from "./context";
import moment from 'moment'
import axios from "axios";



export default function Step4(){


    const handlePayment = () => {
      //  const order = await createOrder(params);
    
        const options = {
          key: "rzp_test_J6XVbB3HHLs2GN",
          key_secret : 'RVcGMbJhsC8tFB7KmSms7Ogr',
          amount: "3000",
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
        //  order_id: "12344",
          handler: (res) => {
            console.log(res);
          },
          prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
    
        const rzpay =  new window.Razorpay(options)
      //  const rzpay = new Razorpay(options);
        rzpay.open();
      };

    const things = React.useContext(TripinfoContext);
    var allitems = JSON.parse(window.localStorage.getItem('allitems'));
    var deliveryinfos = JSON.parse(window.localStorage.getItem('passangerdetail'));

    

    React.useEffect(()=>{

        let bookingId = things.bookingId
        let tot = things.totalPriceInfo.totalFareDetail.fC.TF
    
        let obj = {}
        obj.bookingId = bookingId
        obj.paymentInfos = []
        obj.paymentInfos.push({amount:tot})
        obj.travellerInfo = []
        obj.deliveryInfo = {}

        console.log(allitems);
    
        for (const key in allitems) {

            var withNoDigits = (allitems[key].label).replace(/[0-9]/g, '').toUpperCase();
            var dob = moment(allitems[key].passportinfo.dob).format("YYYY-MM-DD")
            var ed = moment(allitems[key].passportinfo.expiredate).format("YYYY-MM-DD")
            let profile = {
                ti            : allitems[key].title,
                fN            : allitems[key].firstname,
                lN            : allitems[key].lastname,
                pt            : withNoDigits,
                dob           : dob,
                pNat          : "IN",
                pNum          : allitems[key].passportinfo.passportno,
                eD            : ed,
            }

            if(allitems[key].fdetails?.length > 0){
                profile.ssrSeatInfos = allitems[key].fdetails
            }

            if(allitems[key].baggage?.length > 0){
                profile.ssrBaggageInfos = allitems[key].baggage
            }

            if(allitems[key].meals?.length > 0){
                profile.ssrMealInfos = allitems[key].meals
            }


            // "deliveryInfo": {
            //     "emails": [
            //       "xyz@xyz.com"
            //     ],
            //     "contacts": [
            //       "8691908359"
            //     ]
            //   }

           
            obj.travellerInfo.push(profile)
        }

        obj.deliveryInfo = {
            emails : [ deliveryinfos.email ],
            contacts : [deliveryinfos.mobile]
        } 


     //   https://apitest.tripjack.com/oms/v1/air/book
     console.log(obj);

     handlePayment(obj)

            // const headers = {
            //     'Content-Type': 'application/json',
            //     'apikey': process.env.REACT_APP_FLIGHT_API_KEY
            //     }
            // axios.post(`${process.env.REACT_APP_FLIGHT_URL}/oms/v1/air/book`,obj , { headers : headers}  ).then(res=>{
            //    console.log(res);
            //    handlePayment(res.data)
            //     }).catch(e=>{
        
            //     })
        


    },[])

 
    return(
        <div>
            Fourth Step
            <button onClick={handlePayment}>Click</button>
        </div>
    )
}