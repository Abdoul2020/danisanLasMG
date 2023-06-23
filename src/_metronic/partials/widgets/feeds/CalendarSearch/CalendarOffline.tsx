import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';




const CalendarOffline = () => {
    const [value, setValue] = useState(new Date());
    const [checked, setChecked] = useState(false);

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

export default CalendarOffline