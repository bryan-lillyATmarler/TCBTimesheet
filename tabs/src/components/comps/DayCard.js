import React from 'react'
import { useBoolean } from '@fluentui/react-hooks';
import DayDialog from './DayDialog';
import { twentyFourHourFormat, isWeekend, calculateHours, calculateSub } from '../../helpers/getDates';

const DayCard = ({day}) => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    const handleOpenDialog = () => {
        toggleHideDialog();
    }

    //is the day a weekend
    day.weekend = isWeekend(day.date);

    //start and end times for hours
    const start = twentyFourHourFormat(day.startTime);
    const end = twentyFourHourFormat(day.endTime);

    //number of hours worked reg and ot
    let hours = calculateHours(day.startTime, day.endTime);

    //calculate sub amount
    let subAmount = calculateSub(day.sub);

    return (
        <>
            <div onClick={() => handleOpenDialog()} className={`grid grid-cols-4 border border-slate-400 mx-1 mt-1 p-1 rounded-lg ${day.weekend ? 'bg-neutral-200' : 'bg-green-100'} cursor-pointer md:max-w-4xl md:m-auto md:mt-2`}>
                {/* DATE */}
                <div className='col-span-1 m-auto text-center'>
                    <p className='text-lg'>{new Date(day.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</p>
                </div>

                <div className='col-span-3 p-1 border-l-2 ml-1'>
                    {/* HOURS */}
                    <div className='flex justify-between'>
                        <div className=''>
                            <p>{start} - {end}</p>
                        </div>
                        <div className=''>
                            <p>{hours.regHours} Reg | {hours.otHours} OT</p>
                        </div>
                    </div>

                    {/* SUB */}
                    <div className='flex justify-between'>
                        <div className=''>
                            <p>{day.sub === '' ? 'Click to add sub' : day.sub}</p>
                        </div>
                        <div className=''>
                            <p>${subAmount}</p>
                        </div>
                    </div>

                    {/* DAILY NOTES */}
                    <div className='border-t-2 border-black mt-1'>
                        <p>{day.dailyNotes === '' ? 'Click to add Daily Notes' : day.dailyNotes}</p>
                    </div>
                </div>
            </div>
            <DayDialog hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} day={day} />
        </>
    )
}

export default DayCard