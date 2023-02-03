import React, { useContext } from 'react';
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import DialogButton from './DialogButton';
import { calculateMealFullTotalSub, calculateTotalHours, getDateFormat, getTwoWeeks } from '../../helpers/getDates';
import { submitTimesheetAPI } from '../../api/timesheetAPI';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Confirm Timesheet',
};

const SubmitTimesheetDialog = ({hideDialog, toggleHideDialog}) => {
    const { userData } = useContext(userContext);

    let startDate = getDateFormat(userData.cycleStart);
    let endDate = getTwoWeeks(userData.cycleStart);

    let subAmounts = calculateMealFullTotalSub(userData.days);

    let hours = calculateTotalHours(userData.days);

    const handleSubmit = async() => {
        let response = await submitTimesheetAPI();

        console.log(response);

        setTimeout(() => {
            toggleHideDialog();    
        }, 1000);
    }

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
                        <p>{hours.reg} Regular | {hours.ot} Overtime</p>
                    </div>
                    
                    {/* TOTAL SUB AMOUNT */}
                    <div className='border-b-2 mb-2'>
                        <h2 className='font-bold'>Total Sub Amount:</h2>
                        <p>Full - ${subAmounts.full}</p>
                        <p>Meal - ${subAmounts.meal}</p>
                        <p>Camp Bonus - ${subAmounts.camp}</p>
                        <p className='mt-1 border-t-2'>Total - ${subAmounts.total}</p>
                    </div>

                    {/* EXTRA NOTES */}
                    <div className='border-b-2 mb-2'>
                        <h2 className='font-bold'>Extra Notes:</h2>
                        <p>{userData.extraNotes}</p>
                    </div>
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Submit' classes='bg-blue-100' onClick={() => handleSubmit()}/>
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default SubmitTimesheetDialog