import moment from 'moment'

    const helpers = {
        calculatetotalamount: function(data,_paxtypeget){
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
        },
        

         twodatetimediff : function(start,end)  {
            var startTime=moment(start , "YYYY-MM-DD hh:mm");
            var endTime=moment(end, "YYYY-MM-DD hh:mm");
    
            var duration = moment.duration(endTime.diff(startTime));
            var hours = parseInt(duration.asHours()) ;
            var minutes = parseInt(duration.asMinutes()) % 60;
    
            return `${hours}h ${minutes}m`
        },

        converttimefrmt:function(mins){
            let hours = Math.trunc(mins/60);
            let minutes = mins % 60;
            return `${hours}h:${minutes}m`
        },


        comboflightsdetail: function(param1){
            let flightdetails =param1.map((flightdetail , flightdetailindex)=>{
                return {
                    flightname : flightdetail?.oB?.name,
                    flightcodefn :  `${flightdetail?.fD?.aI?.code}-${flightdetail?.fD?.fN}`,
                    flightdetaildt : {
                        dt : moment(flightdetail?.dt).format('MMM DD,ddd, HH:mm'),
                        citycountry : `${flightdetail?.da?.city},${flightdetail?.da?.country}`,
                        name : flightdetail?.da?.name,
                        termianl : flightdetail?.da?.terminal
                    },
                    duration : this.converttimefrmt(flightdetail?.duration),
                    flightdetailat : {
                        at : moment(flightdetail?.at).format('MMM DD,ddd, HH:mm'),
                        citycountry : `${flightdetail?.aa?.city}-${flightdetail?.aa?.country}`,
                        name : flightdetail?.aa?.name,
                        termianl : flightdetail?.aa?.terminal
                    },
                    layoverduration : this.twodatetimediff(flightdetail?.at , param1[flightdetailindex+1]?.dt )
                   
                }
            })

            return flightdetails
    
        },
         calculateTime : function( data ) {
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
        },
        combofrmt: function(speddata , bool){

                let dept_obj = {
                    timing    : moment(speddata[0]?.dt).format("HH:mm"),
                    timewords : moment(speddata[0]?.dt).format("MMMM DD"),
                    city      : speddata[0]?.da?.city,
                    name : speddata[0]?.fD?.aI?.name,
                    datetime : moment(speddata[0]?.dt).format("MM-DD-YYYY HH:mm"),
                    dateString : moment(speddata[0]?.dt).unix()
                }


                let arrival_obj = {
                    timing    : moment(speddata[speddata.length - 1]?.at).format("HH:mm"),
                    timewords : moment(speddata[speddata.length - 1]?.at).format("MMMM DD") ,
                    city      : speddata[speddata.length - 1]?.aa?.city,
                    name : '',
                    datetime : moment(speddata[speddata.length - 1]?.at).format("MM-DD-YYYY HH:mm"),
                    dateString : moment(speddata[speddata.length - 1]?.at).unix()

                }

                let grouptime = `${moment(speddata[0]?.dt).unix()}${moment(speddata[speddata.length - 1]?.at).unix()}`
                let checked = bool
                let stopwords = speddata?.length == 1 ? 'Non Stop' : `${speddata?.length - 1 } Stop(s)` 
                let stopinnumber = speddata?.length == 1 ? 0 : speddata?.length - 1 
               // let duration = this.twodatetimediff(speddata[0].dt , speddata[speddata.length - 1]?.at )
                let duration = this.calculateTime( speddata )

                let flight_code =  speddata.map((indata,ind) => (
                    `${indata?.fD?.aI?.code} ${indata?.fD?.fN}${ speddata?.length -1 == ind ? '' : ',' }`
                    ))
                return { dept_obj , arrival_obj , stopwords ,stopinnumber  , flight_code , grouptime , duration , checked}

    
        }
    }

    export default helpers;