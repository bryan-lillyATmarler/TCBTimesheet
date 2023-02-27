import React from 'react'
import { useBoolean } from '@fluentui/react-hooks';
import DayDialog from './DayDialog';
import { isWeekend, calculateHours, calculateSub, isHoliday } from '../../helpers/getDates';

const DayCard = ({day}) => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    const handleOpenDialog = () => {
        toggleHideDialog();
    }

    //is the day a weekend
    day.weekend = isWeekend(day.date);
    day.holiday = isHoliday(day.date);

    //start and end times for hours
    const start = day.startTime;
    const end = day.endTime;    

    //number of hours worked reg and ot
    let hours = calculateHours(day.startTime, day.endTime, day.date);

    //calculate sub amount
    let subAmount = calculateSub(day.sub);

    return ( 
        <>
            <div onClick={() => handleOpenDialog()} className={`grid grid-cols-8 md:grid-cols-4 border border-slate-400 mx-1 mt-1 p-1 rounded-lg ${(day.holiday) ? 'bg-red-200' : day.weekend ? 'bg-neutral-200' : 'bg-green-100'} cursor-pointer md:max-w-4xl md:m-auto md:mt-2`}>
                {/* DATE */}
                <div className='col-span-3 md:col-span-1 m-auto text-center'>
                    <p className='md:text-lg text-black'>{new Date(day.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</p>
                    <p className='text-black'>{day.holiday ? '(Holiday)' : ''}</p>
                </div>

                <div className='col-span-5 md:col-span-3 p-1 border-l-2 ml-1'>
                    {/* HOURS */}
                    <div className='flex justify-between'>
                        <div className=''>
                            {start !== end &&
                                <p className='text-black'>{start} - {end}</p>
                            }
                            {start === end &&
                                <p className='text-black'>Click to add hours</p>
                            }           
                        </div>
                        <div className=''>
                            <p className='text-black'>{hours.regHours} Reg | {hours.otHours} OT</p>
                        </div>
                    </div>

                    {/* SUB */}
                    <div className='flex justify-between'>
                        <div className=''>
                            <p className='text-black'>{day.sub === '' ? '' : day.sub}</p>
                        </div>
                        <div className=''>
                            <p className='text-black'>${subAmount}</p>
                        </div>
                    </div>

                    {/* DAILY NOTES */}
                    <div className='border-t-2 border-black mt-1'>
                        <p className='text-black'>{day.dailyNotes === '' ? '' : day.dailyNotes}</p>
                    </div>
                </div>
            </div>
            <DayDialog hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} day={day} />
        </>
    )
}

export default DayCard