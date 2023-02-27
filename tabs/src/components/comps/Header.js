import React, { useState, useContext } from 'react'
import { userContext } from '../Context';
import { Image } from '@fluentui/react-northstar';
import { useBoolean } from '@fluentui/react-hooks';
import { getDateFormat, getTwoWeeks, calculateTotalHours, calculateTotalSub } from '../../helpers/getDates';
import ExtraNotesDialog from './ExtraNotesDialog';
import NewTimesheetDialog from './NewTimesheetDialog';
import PreviousTimesheetDialog from './PreviousTimesheetDialog';
import SubmitTimesheetDialog from './SubmitTimesheetDialog';
import ClearTimesheetDialog from './ClearTimesheetDialog';
import SubmittedDialog from './SubmittedDialog';
import { BiMenu } from "react-icons/bi";
import { GrSchedules, GrAddCircle, GrSend, GrCircleAlert } from 'react-icons/gr';

const Header = () => {
    const { userData, userName } = useContext(userContext);
    const [extraNotesHideDialog, { toggle: toggleExtraNotesHideDialog }] = useBoolean(true);
    const [newTimesheetHideDialog, { toggle: toggleNewTimesheetHideDialog }] = useBoolean(true);
    const [previousTimesheetHideDialog, { toggle: togglePreviousTimesheetHideDialog }] = useBoolean(true);
    const [submitTimesheetHideDialog, { toggle: toggleSubmitTimesheetHideDialog }] = useBoolean(true);
    const [clearTimesheetHideDialog, { toggle: toggleClearTimesheetHideDialog }] = useBoolean(true);
    const [alreadySubmittedHideDialog, { toggle: toggleAlreadySubmittedHideDialog }] = useBoolean(true);

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
    
    const handleSubmitTimesheetDialog = () => {
        if(userData.submitted){
            toggleAlreadySubmittedHideDialog();
        } else {
            toggleSubmitTimesheetHideDialog();    
        }        
    }

    const handleClearTimesheetDialog = () => {
        toggleClearTimesheetHideDialog();
    }

    //Get Date and two weeks ahead of date and format
    let cycleStartDate = getDateFormat(userData.cycleStart);
    let cycleEndDate = getTwoWeeks(userData.cycleStart);

    let totalHours = calculateTotalHours(userData.days);

    let totalSub = calculateTotalSub(userData.days);

    return (
        <>
            <div className='p-1 border border-black sticky top-0 z-50 bg-white'>
                {/* NAME */}
                <div onClick={() => handleOpenHeader()} className='border-b-2 p-1 grid grid-cols-3 cursor-pointer'>
                    <div className='col-span-1 flex justify-start'>
                        <BiMenu size={35} className='my-auto text-black' />
                    </div>
                    <div className=' col-span-1'>
                        <p className='text-center text-black md:text-lg'>{userName}</p>
                        <p className='text-lg text-black text-center md:text-2xl'>Timesheet</p>
                        {/* <p className='text-center text-xs'>{`(Click)`}</p> */}
                    </div>
                    {/* LOGO */}
                    <div className='col-span-1 text-right flex justify-end'>
                        <Image width={40} src='./TCB Logo Transparent.png' alt='TCB Logo' className='my-auto' />
                    </div>     
                    {!openHeader &&
                        <>
                            <div className='col-span-3 border-t-2'>
                                <p className='text-center text-black'>{cycleStartDate} - {cycleEndDate}</p>
                            </div>
                            {userData.submitted &&
                                <div className='col-span-3'>
                                    <p className='text-center text-black bg-red-200 mt-2'>This timesheet was submitted on {`${getDateFormat(userData.submittedOn)}`}</p>
                                </div>

                            }
                        </>  
                    }
                </div>

                {openHeader &&
                    <div >
                        {/* START OF PAY CYCLE */}
                        <div className='px-3 cursor-pointer md:px-0 md:grid md:grid-cols-4' onClick={() => handleOpenExtraNotesDialog()}>
                            <div className='md:col-span-2 md:px-5'>
                                <div className=''>
                                    <div className='flex justify-between'>
                                        <p className='text-black'>Start of pay cycle</p>
                                        <p className='text-black'>{cycleStartDate}</p>
                                    </div>
                                </div>

                                {/* END OF PAY CYCLE */}
                                <div className=''>
                                    <div className='flex justify-between'>
                                        <p className='text-black'>End of pay cycle</p>
                                        <p className='text-black'>{cycleEndDate}</p>
                                    </div>
                                </div>

                                {/* TOTAL HOURS */}
                                <div className=''>
                                    <div className='flex justify-between'>
                                        <p className='text-black'>Total Hours</p>
                                        <div>
                                            <p className='text-black'>{totalHours.reg} Reg | {totalHours.ot} OT</p>
                                        </div>
                                    </div>
                                </div>

                                {/* TOTAL SUBS */}
                                <div className=''>
                                    <div className='flex justify-between'>
                                        <p className='text-black'>Total Sub Amount</p>
                                        <p className='text-black'>${totalSub}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='md:col-span-2 md:border-l-2 border border-black mt-3'>
                                {/* EXTRA NOTES */}
                                <div className='border-t-2 md:border-none'>
                                    <p className='text-center border-b-2 text-black'>Extra Notes {`(Click here to add/edit Extra Notes)`}</p>
                                    <p className='p-2 text-black'>{userData.extraNotes}</p>
                                </div>
                            </div>
                        </div>
                        {userData.submitted &&
                            <div className='md:col-span-4'>
                                <p className='text-center bg-red-200 mt-2 text-black'>This timesheet was submitted on {`${getDateFormat(userData.submittedOn)}`}</p>
                            </div>

                        }

                        <div className='md:col-span-4 md:grid md:grid-cols-4 md:pt-4 md:pb-4'>
                            
                            <div className='mt-5 flex md:col-span-2 md:m-auto '>
                                <div onClick={() => handleSubmitTimesheetDialog()} className='text-black mx-auto mt-5 h-10 cursor-pointer bg-green-100 border border-black rounded-lg grid grid-cols-5 shadow-lg hover:shadow-2xl hover:bg-green-200'>
                                    <GrSend size={20} className='col-span-1 m-auto' />
                                    <button className='col-span-4 text-lg mr-2 text-black'>Submit Timesheet</button>
                                </div>

                            </div>

                            <div className='mt-1 flex pt-1 md:col-span-2 md:m-0 md:border-none md:p-0'>
                                <div onClick={() => handleOpenNewTimesheetDialog()} className='text-black mx-auto h-10 mt-5 cursor-pointer bg-yellow-100 border border-black rounded-lg grid grid-cols-5 shadow-lg hover:shadow-2xl hover:bg-yellow-200'>
                                    <GrAddCircle size={20} className='col-span-1 m-auto' />
                                    <button className='col-span-4 text-lg mr-2 text-black'>Start New Timesheet</button>
                                </div>
                            </div>
                            
                            <div className='flex justify-around mt-1 pt-1 mb-1 md:m-0 md:mt-5 md:col-span-4 md:border-none md:p-0 md:justify-evenly md:grid md:grid-cols-4'>
                                <div onClick={() => handlePreviousTimesheetDialog()} className='mr-2 md:col-span-2 md:m-auto text-black mt-5 cursor-pointer bg-blue-100 border border-black rounded-lg grid grid-cols-5 shadow-lg hover:shadow-2xl hover:bg-blue-200'>
                                    <GrSchedules size={20} className='col-span-1 m-auto' />
                                    <button className='col-span-4 text-lg mr-2 text-black'>View Previous Timesheet</button>
                                </div>
                                <div onClick={() => handleClearTimesheetDialog()} className='md:col-span-2 md:m-auto text-black mt-5 cursor-pointer bg-red-100 border border-black rounded-lg grid grid-cols-5 shadow-lg hover:shadow-2xl hover:bg-red-200'>
                                    <GrCircleAlert size={20} className='col-span-1 m-auto' />
                                    <button className='col-span-4 text-lg mr-2 text-black'>Clear Timesheet</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            <ExtraNotesDialog extraNotesHideDialog={extraNotesHideDialog} toggleExtraNotesHideDialog={toggleExtraNotesHideDialog} />
            <NewTimesheetDialog hideDialog={newTimesheetHideDialog} toggleHideDialog={toggleNewTimesheetHideDialog} />
            <PreviousTimesheetDialog hideDialog={previousTimesheetHideDialog} toggleHideDialog={togglePreviousTimesheetHideDialog} />
            <SubmitTimesheetDialog hideDialog={submitTimesheetHideDialog} toggleHideDialog={toggleSubmitTimesheetHideDialog} />
            <ClearTimesheetDialog hideDialog={clearTimesheetHideDialog} toggleHideDialog={toggleClearTimesheetHideDialog} />
            <SubmittedDialog hideDialog={alreadySubmittedHideDialog} toggleHideDialog={toggleAlreadySubmittedHideDialog} toggleSubmitDialog={toggleSubmitTimesheetHideDialog} />
        </>
    )
}

export default Header