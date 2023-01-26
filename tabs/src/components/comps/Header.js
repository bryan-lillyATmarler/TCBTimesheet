import React, { useState, useContext } from 'react'
import { userContext } from '../Context';
import { Image } from '@fluentui/react-northstar';
import { useBoolean } from '@fluentui/react-hooks';
import HeaderDialog from './HeaderDialog';
import { getDateFormat, getTwoWeeks } from '../../helpers/getDates';



const Header = () => {
    const { userData } = useContext(userContext);
    const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    const [openHeader, setOpenHeader] = useState(false);

    const handleOpenHeader = () => {
        setOpenHeader(!openHeader);
    }

    const handleOpenDialog = () => {
        toggleHideDialog();
    }

    //Get Date and two weeks ahead of date and format
    let cycleStartDate = getDateFormat(userData.timesheet.cycleStart);
    let cycleEndDate = getTwoWeeks(userData.timesheet.cycleStart);

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
                </div>

                {openHeader &&
                    <div className='px-3 cursor-pointer md:px-0 md:grid md:grid-cols-4' onClick={() => handleOpenDialog()}>
                        {/* START OF PAY CYCLE */}
                        <div className='md:col-span-2 md:px-5'>
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

                        <div className='md:col-span-2 md:border-l-2'>
                            {/* EXTRA NOTES */}
                            <div className='border-t-2 md:border-none'>
                                <p className='text-center'>Extra Notes</p>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            <HeaderDialog hideDialog={hideDialog} toggleHideDialog={toggleHideDialog} />
        </>
    )
}

export default Header