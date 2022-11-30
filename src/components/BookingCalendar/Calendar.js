import React, { useEffect , useRef } from 'react'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import './calendar.css';
import { Typography } from '@mui/material';

const CustomInput = React.forwardRef((props, ref) => {
    return <Typography {...props} ref={ref} />;
  });

 const  Calendar = (props ) => {

    var date = new Date();

// add a day
date.setDate(date.getDate() + 1);

    const [selected, setSelected] = React.useState(new Date());
    const [endselected, setEndselected] = React.useState(date);

    const [fromDate, setfromDate] = React.useState();
    const [toDate, settoDate] = React.useState();
    const [singleLabels, setSingleLabels] = React.useState([3200, 4000, 44, 565, 5656, 565 ,5656, 656]);
    const [singleInvalid, setSingleInvalid] = React.useState([]);

    const { calendarOpen , onClickOutside  , _parentcalendarfuction } = props;

     const refd = React.createRef();
     const refddd = React.createRef();

  

    const onPageLoadingSingle = React.useCallback((event) => {
        getPrices(event.firstDay, (bookings) => {
            setSingleLabels(bookings.labels);
            setSingleInvalid(bookings.invalid);
                
        });
    }, []);

   

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            //  console.log(event.target.className);
            
          if (refd.current && !refd.current.contains(event.target)) {
            onClickOutside && onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ onClickOutside ]);


      const cancel = () => {
          alert('d')
      }

    //   React.useEffect(()=>{

    //     console.log(date);
    //     setSelected(date)
    //   },[])

      const handleDayChange = date => {
         
           setSelected(date)
        _parentcalendarfuction(date)
        onClickOutside()
      }


    const getPrices = (d, callback) => {
        const invalid = [];
        const labels = [];
        const bookings = [
            {
                price : 400
            },
            {
                price : 500
            },
            {
                price : 5100
            }
        ]
    
    
        // getJson('//trial.mobiscroll.com/getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(), (bookings) => {
            for (const booking of bookings) {
                const d = new Date(booking.d);
    
                if (booking.price > 0) {
                    labels.push({
                        start: d,
                        title: '$' + booking.price,
                        textColor: '#e1528f'
                    });
                } else {
                    invalid.push(d);
                }
            }
            callback({ labels, invalid });
        // }, 'jsonp');
    }
        
  return (
    <div>
        { calendarOpen && (
            <div ref={refd}>
            <DayPicker className='bookingCalendar_Cs' 
        customInput={<CustomInput inputRef={refddd} />}
        mode="single"
                selected={selected}
                onSelect={setSelected} 
                labels={singleLabels}
             invalid={singleInvalid}
             onPageLoading={onPageLoadingSingle}
             onDayClick={handleDayChange}
            />
            </div>
        ) }

        {/* <Typography>{fromDate} {toDate}</Typography> */}
    </div>
  )
}

export default Calendar
