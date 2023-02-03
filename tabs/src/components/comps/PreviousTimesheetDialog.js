import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import DialogButton from './DialogButton';
import { getDateFormat } from '../../helpers/getDates';
import { availableTimesheetAPI, getTimesheetAPI } from '../../api/timesheetAPI';


const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Choose Previous Timesheet',
};

const PreviousTimesheetDialog = ({ hideDialog, toggleHideDialog }) => {
    const { setUserData, userName } = useContext(userContext);
    const [availableDates, setAvailableDate] = useState([]);
    const [timesheetKey, setTimesheetKey] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if(userName !== ''){
            fetchData();
        }
    }, [userName]);

    // fetchData();

    //Get the available dates of previous timesheets saved in DB
    async function fetchData() {
        let response = await availableTimesheetAPI(userName);
        let dropdownDates = response.data.map((date) => {
            let cycleDate = getDateFormat(date.cycleStart);
            return {
                key: date._id, text: cycleDate
            }
        });
        setAvailableDate(dropdownDates);
    }

    const handleGetTimesheet = async() => {

        let response = await getTimesheetAPI(timesheetKey);

        if(response.success){
            setUserData(response.data);
            setSuccess('success');
            setTimeout(() => {
                setSuccess('');
                toggleHideDialog();
            }, 1000);
        } else {
            setSuccess('fail');
            setTimeout(() => {
                setSuccess('');
            }, 2000);
        }
    }

    const handleStartCycleChange = (e, selectedOption) => {
        setTimesheetKey(selectedOption.key);
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
                    <Dropdown
                        label='Select Start of Pay Cycle'
                        options={availableDates}
                        onChange={handleStartCycleChange}
                    />
                </div>

                <div className='h-4 mt-4'>
                    {success === 'success' &&
                        <p className='bg-green-200 text-center'>Loading Timesheet</p>
                    }
                    {success === 'fail' &&
                        <p className='bg-red-200 text-center'>Something Went Wrong - Try Again</p>
                    }
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Load Timesheet' classes='bg-blue-100' onClick={() => handleGetTimesheet()} />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default PreviousTimesheetDialog