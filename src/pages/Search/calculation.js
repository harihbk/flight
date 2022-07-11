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
            console.log(param1);
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
        helper3: function(param1, param2){
    
        }
    }

    export default helpers;