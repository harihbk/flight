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
        combofrmt: function(speddata ){
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
                let checked = false
                let grouptime = `${moment(speddata[0]?.dt).unix()}${moment(speddata[speddata.length - 1]?.at).unix()}`
                let stopwords = speddata?.length == 1 ? 'Non Stop' : `${speddata?.length - 1 } Stop(s)` 
                let stopinnumber = speddata?.length == 1 ? 0 : speddata?.length - 1 
               // let duration = this.twodatetimediff(speddata[0].dt , speddata[speddata.length - 1]?.at )
                let duration = this.calculateTime( speddata )
                let flightdetail = []
                let flight_code =  speddata.map((indata,ind) => (
                    `${indata?.fD?.aI?.code}-${indata?.fD?.fN}${ speddata?.length -1 == ind ? '' : ',' }`
                    ))
                    let pricelist = []
                return { dept_obj , arrival_obj , stopwords ,stopinnumber  , flight_code , grouptime , duration ,flightdetail,checked , pricelist }

    
        },
        noofstop_filter : function (imm , unmutatee) {
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
                    if(len == 1 && arrOfNum[0] >= 2){
                        return t.stopinnumber >=2
                    } else {
                        if(arrOfNum.includes(t.stopinnumber)){
                            return true
                        }
                    }
                   
                    if(len > 2){
                        return t.stopinnumber >=2
                    }
                    return false;
                });
            } else {
                filterrecord = unmutatee
            }

            return filterrecord
        },
        ranger : function (ranger,filterrecord) {
            var filterrecord;
                let pr = ranger[1].label;          
                let ft = pr.replace(/\,/g,'')


                filterrecord = filterrecord.filter(t=>  t.totalPriceList[0].totalamount + 0.4 <= ft);
            
            return filterrecord
        },
        depaturefilter : function (depature,filterrecord) {
           

                var format = 'HH:mm';
    
                // var time = moment() gives you current time. no format required.
               
    
                var _filterrecord =  filterrecord.filter(function(t){
                    
                    if(depature.includes(1)){
                        let time = moment(t?.dept_obj?.timing,format),
                        beforeTime = moment('00:00', format),
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

                return _filterrecord;
           

        },
        arrivalfilter : function (arrival , filterrecord) {

            var format = 'HH:mm';
            filterrecord =  filterrecord.filter(function(t){
                
                if(arrival.includes(1)){
                    let time = moment(t?.arrival_obj?.timing,format),
                    beforeTime = moment('00:00', format),
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

        },
        combofilter : function (index,imm , unmutatee) {
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

                    if(len == 1 && arrOfNum[0] >= 2){
                        return t.frmt[index].stopinnumber >=2

                    } else {
                        if(arrOfNum.includes(t.frmt[index].stopinnumber)){
                            return true
                        }
                    }
                    

                    if(len > 2){
                        return t.frmt[index].stopinnumber >=2
                    }
                    return false;
                });
            } else {
                filterrecord = unmutatee
            }

            return filterrecord
        },


        combodepaturefrom : function (arrival , filterrecord) {
            var format = 'HH:mm';
            filterrecord =  filterrecord.filter(function(t){
                if(arrival.includes(1)){
                    let time = moment(t?.frmt[0]?.dept_obj?.timing,format),
                    beforeTime = moment('00:00', format),
                    afterTime = moment('06:00', format);
                  
                      // nested object filter
                      for (const key in t.going) {
                        let row = t.going[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(beforeTime, afterTime)) {
                            return true
                          } 
                    }
                    // nested object filter
    
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }
    
                if(arrival.includes(2)){
                    let time = moment(t?.frmt[0]?.dept_obj?.timing,format),
                    beforeTime = moment('06:00', format),
                    afterTime = moment('12:59', format);
                       // nested object filter
                       for (const key in t.going) {
                        let row = t.going[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(beforeTime, afterTime)) {
                            return true
                          } 
                    }
                    // nested object filter
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }
    
                if(arrival.includes(3)){
                    let time = moment(t?.frmt[0]?.dept_obj?.timing,format),
                    beforeTime = moment('12:59', format),
                    afterTime = moment('18:59', format);
                       // nested object filter
                       for (const key in t.going) {
                        let row = t.going[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(beforeTime, afterTime)) {
                            return true
                          } 
                    }
                    // nested object filter
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }
    
                if(arrival.includes(4)){
                    let time = moment(t?.frmt[0]?.dept_obj?.timing,format),
                    beforeTime = moment('18:59', format),
                    afterTime = moment('23:59', format);
                       // nested object filter
                       for (const key in t.going) {
                        let row = t.going[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(beforeTime, afterTime)) {
                            return true
                          } 
                    }
                    // nested object filter
                    if (time.isBetween(beforeTime, afterTime)) {
                        return true
                      }
                }
            }).map(res=>{
                if(Object.keys(res.going).length > 1){
    
                   var _beforeTime,_afterTime
                    if(arrival.includes(1)){
                        _beforeTime = moment('00:00', format);
                        _afterTime = moment('06:59', format);
                    // nested object filter
    
                        let _going = {}
                        for (const key in res.going) {
                            let row = res.going[key]
                            let _time = moment(row?.dept_obj?.timing,format);
                            if (_time.isBetween(_beforeTime, _afterTime)) {
                              //  console.log(row);
                              _going[key] = row
                              } 
                        }
        
        
                        if(Object.keys(_going).length > 0){
                            for (var prop in _going) {
                                _going[prop].checked = true
    
                                res.frmt[0] = _going[prop]
                                break;
                            }
                        }
                        res.going = _going
    
    
                    }
                    if(arrival.includes(2)){
                        _beforeTime = moment('06:00', format);
                        _afterTime = moment('12:59', format);
    
                        let _going = {}
                        for (const key in res.going) {
                            let row = res.going[key]
                            let _time = moment(row?.dept_obj?.timing,format);
                            if (_time.isBetween(_beforeTime, _afterTime)) {
                              //  console.log(row);
                              _going[key] = row
                              } 
                        }
        
        
                        if(Object.keys(_going).length > 0){
                            for (var prop in _going) {
                                _going[prop].checked = true
                                res.frmt[1] = _going[prop]
                                break;
                            }
                        }
                        res.going = _going
    
    
                    }
                    if(arrival.includes(3)){
                        _beforeTime = moment('12:00', format);
                        _afterTime = moment('18:59', format);
    
                        let _going = {}
                        for (const key in res.going) {
                            let row = res.going[key]
                            let _time = moment(row?.dept_obj?.timing,format);
                            if (_time.isBetween(_beforeTime, _afterTime)) {
                              //  console.log(row);
                              _going[key] = row
                              } 
                        }
        
        
                        if(Object.keys(_going).length > 0){
                            for (var prop in _going) {
                                _going[prop].checked = true
                                res.frmt[0] = _going[prop]
                                break;
                            }
                        }
                        res.returns = _going
    
    
                    }
                    if(arrival.includes(4)){
                        _beforeTime = moment('18:59', format);
                        _afterTime = moment('23:59', format);
    
                        let _going = {}
                        for (const key in res.going) {
                            let row = res.going[key]
                            let _time = moment(row?.dept_obj?.timing,format);
                            if (_time.isBetween(_beforeTime, _afterTime)) {
                              //  console.log(row);
                              _going[key] = row
                              } 
                        }
        
        
                        if(Object.keys(_going).length > 0){
                            for (var prop in _going) {
                                _going[prop].checked = true
                                res.frmt[0] = _going[prop]
                                break;
                            }
                        }
                        res.returns = _going
                    }
                } 
                return res
            })
            return filterrecord
        },


    comboarrivalfrom : function (arrival , filterrecord) {
        var format = 'HH:mm';
        filterrecord =  filterrecord.filter(function(t){
            if(arrival.includes(1)){
                let time = moment(t?.frmt[0]?.arrival_obj?.timing,format),
                beforeTime = moment('00:00', format),
                afterTime = moment('06:00', format);
              
                  // nested object filter
                  for (const key in t.going) {
                    let row = t.going[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }

            if(arrival.includes(2)){
                let time = moment(t?.frmt[0]?.arrival_obj?.timing,format),
                beforeTime = moment('06:00', format),
                afterTime = moment('12:59', format);
                   // nested object filter
                   for (const key in t.going) {
                    let row = t.going[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                // nested object filter
                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }

            if(arrival.includes(3)){
                let time = moment(t?.frmt[0]?.arrival_obj?.timing,format),
                beforeTime = moment('12:59', format),
                afterTime = moment('18:59', format);
                   // nested object filter
                   for (const key in t.going) {
                    let row = t.going[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                // nested object filter
                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }

            if(arrival.includes(4)){
                let time = moment(t?.frmt[0]?.arrival_obj?.timing,format),
                beforeTime = moment('18:59', format),
                afterTime = moment('23:59', format);
                   // nested object filter
                   for (const key in t.going) {
                    let row = t.going[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                // nested object filter
                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }
        }).map(res=>{
            if(Object.keys(res.going).length > 1){

               var _beforeTime,_afterTime
                if(arrival.includes(1)){
                    _beforeTime = moment('00:00', format);
                    _afterTime = moment('06:59', format);
                // nested object filter

                    let _going = {}
                    for (const key in res.going) {
                        let row = res.going[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                          _going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(_going).length > 0){
                        for (var prop in _going) {
                            _going[prop].checked = true

                            res.frmt[0] = _going[prop]
                            break;
                        }
                    }
                    res.going = _going


                }
                if(arrival.includes(2)){
                    _beforeTime = moment('06:00', format);
                    _afterTime = moment('12:59', format);

                    let _going = {}
                    for (const key in res.going) {
                        let row = res.going[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                          _going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(_going).length > 0){
                        for (var prop in _going) {
                            _going[prop].checked = true
                            res.frmt[1] = _going[prop]
                            break;
                        }
                    }
                    res.going = _going


                }
                if(arrival.includes(3)){
                    _beforeTime = moment('12:00', format);
                    _afterTime = moment('18:59', format);

                    let _going = {}
                    for (const key in res.going) {
                        let row = res.going[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                          _going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(_going).length > 0){
                        for (var prop in _going) {
                            _going[prop].checked = true
                            res.frmt[0] = _going[prop]
                            break;
                        }
                    }
                    res.returns = _going


                }
                if(arrival.includes(4)){
                    _beforeTime = moment('18:59', format);
                    _afterTime = moment('23:59', format);

                    let _going = {}
                    for (const key in res.going) {
                        let row = res.going[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                          _going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(_going).length > 0){
                        for (var prop in _going) {
                            _going[prop].checked = true
                            res.frmt[0] = _going[prop]
                            break;
                        }
                    }
                    res.returns = _going
                }
            } 
            return res
        })
        return filterrecord
    },






    combodepatureto : function (arrival , filterrecord) {

        
        var format = 'HH:mm';
        
        filterrecord =  filterrecord.filter(function(t){
            
            if(arrival.includes(1)){
                let time = moment(t?.frmt[1]?.dept_obj?.timing,format),
                beforeTime = moment('00:00', format),
                afterTime = moment('06:59', format);

                // nested object filter
                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.dept_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                // nested object filter
                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  } 
            }



            if(arrival.includes(2)){
                let time = moment(t?.frmt[1]?.dept_obj?.timing,format),
                beforeTime = moment('06:00', format),
                afterTime = moment('12:59', format);
                                // nested object filter

                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.dept_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }

            if(arrival.includes(3)){
                let time = moment(t?.frmt[1]?.dept_obj?.timing,format),
                beforeTime = moment('12:00', format),
                afterTime = moment('18:59', format);
                                // nested object filter

                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.dept_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }

            if(arrival.includes(4)){
                let time = moment(t?.frmt[1]?.dept_obj?.timing,format),
                beforeTime = moment('18:59', format),
                afterTime = moment('23:59', format);
                                // nested object filter

                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.dept_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }
         })
        .map(res=>{
            if(Object.keys(res.returns).length > 1){

               var _beforeTime,_afterTime
                if(arrival.includes(1)){
                    _beforeTime = moment('00:00', format);
                    _afterTime = moment('06:59', format);
                // nested object filter

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true

                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going


                }
                if(arrival.includes(2)){
                    _beforeTime = moment('06:00', format);
                    _afterTime = moment('12:59', format);

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true
                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going


                }
                if(arrival.includes(3)){
                    _beforeTime = moment('12:00', format);
                    _afterTime = moment('18:59', format);

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true

                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going


                }
                if(arrival.includes(4)){
                    _beforeTime = moment('18:59', format);
                    _afterTime = moment('23:59', format);

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.dept_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true
                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going
                }
            } 
            return res
        })
        return filterrecord

    },






    comboarrivalto : function (arrival , filterrecord) {

        
        var format = 'HH:mm';
        
        filterrecord =  filterrecord.filter(function(t){
            
            if(arrival.includes(1)){
                let time = moment(t?.frmt[1]?.arrival_obj?.timing,format),
                beforeTime = moment('00:00', format),
                afterTime = moment('06:59', format);

                // nested object filter
                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  } 
                

            }



            if(arrival.includes(2)){
                let time = moment(t?.frmt[1]?.arrival_obj?.timing,format),
                beforeTime = moment('06:00', format),
                afterTime = moment('12:59', format);
                                // nested object filter

                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }

            if(arrival.includes(3)){
                let time = moment(t?.frmt[1]?.arrival_obj?.timing,format),
                beforeTime = moment('12:00', format),
                afterTime = moment('18:59', format);
                                // nested object filter

                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }

            if(arrival.includes(4)){
                let time = moment(t?.frmt[1]?.arrival_obj?.timing,format),
                beforeTime = moment('18:00', format),
                afterTime = moment('23:59', format);
                                // nested object filter

                for (const key in t.returns) {
                    let row = t.returns[key]
                    let _time = moment(row?.arrival_obj?.timing,format);
                    if (_time.isBetween(beforeTime, afterTime)) {
                        return true
                      } 
                }
                                // nested object filter

                if (time.isBetween(beforeTime, afterTime)) {
                    return true
                  }
            }
         })
        .map(res=>{
            if(Object.keys(res.returns).length > 1){

               var _beforeTime,_afterTime
                if(arrival.includes(1)){
                    _beforeTime = moment('00:00', format);
                    _afterTime = moment('06:59', format);
                // nested object filter

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true

                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going


                }
                if(arrival.includes(2)){
                    _beforeTime = moment('06:00', format);
                    _afterTime = moment('12:59', format);

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true
                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going


                }
                if(arrival.includes(3)){
                    _beforeTime = moment('12:00', format);
                    _afterTime = moment('18:59', format);

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true

                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going


                }
                if(arrival.includes(4)){
                    _beforeTime = moment('18:00', format);
                    _afterTime = moment('23:59', format);

                    let going = {}
                    for (const key in res.returns) {
                        let row = res.returns[key]
                        let _time = moment(row?.arrival_obj?.timing,format);
                        if (_time.isBetween(_beforeTime, _afterTime)) {
                          //  console.log(row);
                            going[key] = row
                          } 
                    }
    
    
                    if(Object.keys(going).length > 0){
                        for (var prop in going) {
                            going[prop].checked = true
                            res.frmt[1] = going[prop]
                            break;
                        }
                    }
                    res.returns = going


                }

             
            } 
            return res


        })
        return filterrecord

    },
   
    }

    export default helpers;