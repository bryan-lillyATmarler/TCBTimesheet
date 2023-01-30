import React, { useState, useContext } from 'react'
import { userContext } from '../Context';
import { Image } from '@fluentui/react-northstar';
import { useBoolean } from '@fluentui/react-hooks';
// import HeaderDialog from './HeaderDialog';
import { getDateFormat, getTwoWeeks } from '../../helpers/getDates';
import ExtraNotesDialog from './ExtraNotesDialog';
import NewTimesheetDialog from './NewTimesheetDialog';
import PreviousTimesheetDialog from './PreviousTimesheetDialog';



const Header = () => {
    const { userData } = useContext(userContext);
    const [extraNotesHideDialog, { toggle: toggleExtraNotesHideDialog }] = useBoolean(true);
    const [newTimesheetHideDialog, { toggle: toggleNewTimesheetHideDialog }] = useBoolean(true);
    const [previousTimesheetHideDialog, { toggle: togglePreviousTimesheetHideDialog }] = useBoolean(true);

    const [openHeader, setOpenHeader] = useState(false);

    const handleOpenHeader = () => {
        setOpenHeader(!openHeader);
    }

    const handleOpenExtraNotesDialog = () => {
        toggleExtraNotesHideDialog();
    }

    const handleOpenNewTimesheetDialog = () => {
        toggleNewTimesheetHideDialog();
    }

    const handlePreviousTimesheetDialog = () => {
        togglePreviousTimesheetHideDialog();
    }

    //Get Date and two weeks ahead of date and format
    let cycleStartDate = getDateFormat(userData.cycleStart);
    let cycleEndDate = getTwoWeeks(userData.cycleStart);

    return (
        <>
            <div className='p-1 border border-black sticky top-0 z-50 bg-white'>
                {/* NAME */}
                <div onClick={() => handleOpenHeader()} className='border-b-2 p-1 grid grid-cols-3 cursor-pointer'>
                    <p className='col-span-1 md:ml-5 md:text-lg'>Bryan Lilly</p>
                    <p className='text-lg col-span-1 text-center md:text-2xl'>Timesheet</p>
                    {/* LOGO */}
                    <div className='col-span-1 text-right'>
                        <Image width={30} src='./TCB Logo Transparent.png' alt='TCB Logo' />
                    </div>     
                    {!openHeader &&
                        <div className='col-span-3 border-t-2'>
                            <p className='text-center'>{cycleStartDate} - {cycleEndDate}</p>
                        </div>
                        
                    }
                </div>

                {openHeader &&
                    <div className='px-3 cursor-pointer md:px-0 md:grid md:grid-cols-4' >
                        {/* START OF PAY CYCLE */}
                        <div className='md:col-span-2 md:px-5' onClick={() => handleOpenExtraNotesDialog()}>
                            <div className=''>
                                <div className='flex justify-between'>
                                    <p>Start of pay cycle</p>
                                    <p>{cycleStartDate}</p>
                                </div>
                            </div>

                            {/* END OF PAY CYCLE */}
                            <div className=''>
                                <div className='flex justify-between'>
                                    <p>End of pay cycle</p>
                                    <p>{cycleEndDate}</p>
                                </div>
                            </div>

                            {/* TOTAL HOURS */}
                            <div className=''>
                                <div className='flex justify-between'>
                                    <p>Total Hours</p>
                                    <div>
                                        <p>80 Reg | 20 OT</p>
                                    </div>
                                </div>
                            </div>

                            {/* TOTAL SUBS */}
                            <div className=''>
                                <div className='flex justify-between'>
                                    <p>Total Sub Amount</p>
                                    <p>$2000</p>
                                </div>
                            </div>
                        </div>

                        <div className='md:col-span-2 md:border-l-2 border border-black mt-3'>
                            {/* EXTRA NOTES */}
                            <div className='border-t-2 md:border-none'>
                                <p className='text-center'>Extra Notes</p>
                            </div>
                        </div>

                        <div className='mt-10 flex'>
                            <div className='m-auto border border-black rounded-lg py-3 px-5 bg-blue-200'>
                                <button className='font-bold'>Submit Timesheet</button>
                            </div>

                        </div>

                        <div className='mt-4 flex border-t-2 pt-4'>
                            <div onClick={() => handleOpenNewTimesheetDialog()} className='m-auto border border-black rounded-lg p-3 bg-green-200'>
                                <button>Start New Timesheet</button>
                            </div>
                        </div>

                        <div className='flex justify-between mt-4 border-t-2 pt-4 mb-2'>
                            <div onClick={() => handlePreviousTimesheetDialog()} className='border border-black rounded-lg p-3 bg-yellow-200'>
                                <button>View Previous Timesheet</button>
                            </div>
                            <div className='border border-black rounded-lg p-3 bg-red-200'>
                                <button>Clear Timesheet</button>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            {/* <HeaderDialog hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} /> */}
            <ExtraNotesDialog extraNotesHideDialog={extraNotesHideDialog} toggleExtraNotesHideDialog={toggleExtraNotesHideDialog} />
            <NewTimesheetDialog hideDialog={newTimesheetHideDialog} toggleHideDialog={toggleNewTimesheetHideDialog} />
            <PreviousTimesheetDialog hideDialog={previousTimesheetHideDialog} toggleHideDialog={togglePreviousTimesheetHideDialog} />
        </>
    )
}

export default Header