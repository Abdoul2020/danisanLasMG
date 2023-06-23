import React, { useState,useEffect } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';




const CalendarOnline = () => {
    const [value, setValue] = useState(new Date());
    const [checked, setChecked] = useState(false);

    //selctedData to send from there.
    const [selectedDate,setSelectedDate]=useState(null)

    useEffect(() => {

console.log("datatDevelop::", selectedDate)
    }, [selectedDate])
    



    return (

        <div>

            <Calendar
                onChange={(date: any) => setValue(date)}
                value={value}
                locale="tr-TR"
                className="react-calendar"
            />


        </div>

    )
}

export default CalendarOnline