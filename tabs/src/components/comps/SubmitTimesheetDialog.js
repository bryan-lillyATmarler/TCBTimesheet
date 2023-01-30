import React, { useContext } from 'react';
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import DialogButton from './DialogButton';
import { getDateFormat } from '../../helpers/getDates';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Confirm Timesheet',
};

const SubmitTimesheetDialog = ({hideDialog, toggleHideDialog}) => {
    const { userData, setUserData } = useContext(userContext);

    let startDate = getDateFormat(new Date);
    let endDate = getDateFormat(new Date);

    return (
        <>
            <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >

                <div>
                    {/* PAY CYCLE */}
                    <div className='border-b-2 mb-2'>
                        <h2 className='font-bold'>Pay Cycle:</h2>
                        <p>{startDate} to {endDate}</p>
                    </div>

                    {/* TOTAL HOURS */}
                    <div className='border-b-2 mb-2'>
                        <h2 className='font-bold'>Total Hours:</h2>
                        <p>80 Regular | 20 Overtime</p>
                    </div>
                    
                    {/* TOTAL SUB AMOUNT */}
                    <div className='border-b-2 mb-2'>
                        <h2 className='font-bold'>Total Sub Amount:</h2>
                        <p>Full - $2000</p>
                        <p>Meal - $1000</p>
                    </div>

                    {/* EXTRA NOTES */}
                    <div className='border-b-2 mb-2'>
                        <h2 className='font-bold'>Extra Notes:</h2>
                        <p>Some of the extra notes that need to be on the form to send to the admin for bookeeping</p>
                    </div>
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Submit' classes='bg-blue-100' />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default SubmitTimesheetDialog