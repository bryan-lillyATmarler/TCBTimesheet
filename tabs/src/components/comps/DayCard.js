import React from 'react'
import { useBoolean } from '@fluentui/react-hooks';
import DayDialog from './DayDialog';
// import { isWeekend } from '../../helpers/getDates';

const DayCard = ({sub}) => {
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    const handleOpenDialog = () => {
        toggleHideDialog();
    }

    // let weekend = isWeekend(sub.date);

    return (
        <>
            <div onClick={() => handleOpenDialog()} className='grid grid-cols-4 border border-slate-400 mx-1 mt-1 p-1 rounded-lg bg-green-100 cursor-pointer md:max-w-4xl md:m-auto md:mt-2'>
                {/* DATE */}
                <div className='col-span-1 m-auto text-center'>
                    <p className='text-lg'>{new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</p>
                </div>

                <div className='col-span-3 p-1 border-l-2 ml-1'>
                    {/* HOURS */}
                    <div className='flex justify-between'>
                        <div className=''>
                            <p>07:00 - 17:00</p>
                        </div>
                        <div className=''>
                            <p>8 Reg | 2 OT</p>
                        </div>
                    </div>

                    {/* SUB */}
                    <div className='flex justify-between'>
                        <div className=''>
                            <p>{sub || 'Full Sub'}</p>
                        </div>
                        <div className=''>
                            <p>$200</p>
                        </div>
                    </div>

                    {/* DAILY NOTES */}
                    <div className='border-t-2 border-black mt-1'>
                        <p>These are some daily notes for the test</p>
                    </div>
                </div>
            </div>
            <DayDialog hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} />
        </>
    )
}

export default DayCard