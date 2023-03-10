import React, { useContext, useState } from 'react';
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import DialogButton from './DialogButton';
import { calculateMealFullTotalSub, calculateTotalHours, checkFutureHours, getDateFormat, getTwoWeeks } from '../../helpers/getDates';
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
    const { userData, setUserData } = useContext(userContext);
    const [isFetching, setIsFetching] = useState(false);
    const [success, setSuccess] = useState('');

    let startDate = getDateFormat(userData.cycleStart);
    let endDate = getTwoWeeks(userData.cycleStart);

    let subAmounts = calculateMealFullTotalSub(userData.days);

    let hours = calculateTotalHours(userData.days);

    let futureHours = checkFutureHours(endDate, userData.days);

    const handleSubmit = async() => {
        setIsFetching(true);
        let response = await submitTimesheetAPI(userData._id);

        if(response.success){
            setSuccess('success');
            setIsFetching(false);
            setUserData(response.data);
            setTimeout(() => {
                setSuccess('');
                toggleHideDialog();    
            }, 1000);
        } else {
            setSuccess('fail');
            setIsFetching(false);
            setTimeout(() => {
                setSuccess('');
            }, 2000);
        }
    }

    return (
        <>
            <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >
                {!futureHours &&
                    <>
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

                        <div className='mt-4 h-4'>
                            {isFetching &&
                                <p className='bg-yellow-200 text-center'>Submitting Timesheet - Please Wait</p>
                            }
                            {success === 'success' &&
                                <p className='bg-green-200 text-center'>Timesheet Submitted</p>
                            }
                            {success === 'fail' &&
                                <p className='bg-red-200 text-center'>Something Went Wrong - Try Again</p>
                            }
                        </div>

                        <div className='flex justify-around mt-10'>
                            <DialogButton disable={isFetching} btnText='Submit' classes='bg-blue-100' onClick={() => handleSubmit()} />
                            <DialogButton disable={isFetching} btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                        </div>

                    </>
                }
                {futureHours &&
                    <>
                        <div>
                            <p className='text-center text-lg'>You cannot submit hours that exist on future dates</p>
                        </div>
                        <div className='flex justify-around mt-10'>
                            <DialogButton disable={isFetching} btnText='Okay' classes='bg-blue-100 font-bold' onClick={() => toggleHideDialog()} />
                        </div>
                    </>
                }
            </Dialog>
        </>
    )
}

export default SubmitTimesheetDialog