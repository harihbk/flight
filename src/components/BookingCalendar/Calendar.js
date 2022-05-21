import React, {useEffect} from 'react'
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import './calendar.css';
import { Typography } from '@mui/material';

export default function Calendar(props) {
    const [selected, setSelected] = React.useState();
    const [fromDate, setfromDate] = React.useState();
    const [toDate, settoDate] = React.useState();
    const [singleLabels, setSingleLabels] = React.useState([3200, 4000, 44, 565, 5656, 565 ,5656, 656]);
    const [singleInvalid, setSingleInvalid] = React.useState([]);

    const { calendarOpen } = props;

    const onPageLoadingSingle = React.useCallback((event) => {
        getPrices(event.firstDay, (bookings) => {
            setSingleLabels(bookings.labels);
            setSingleInvalid(bookings.invalid);
                
        });
    }, []);

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
            <DayPicker className='bookingCalendar_Cs'
                mode="range"
                selected={selected}
                onSelect={setSelected} 
                numberOfMonths={2} 
                labels={singleLabels}
            invalid={singleInvalid}
            onPageLoading={onPageLoadingSingle}
            />
            
        ) }

        {/* <Typography>{fromDate} {toDate}</Typography> */}
    </div>
  )
}
