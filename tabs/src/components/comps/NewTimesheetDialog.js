import { Dialog, Dropdown, DialogType } from '@fluentui/react'
import React, {useState, useContext} from 'react'
import { userContext } from '../Context';
import DialogButton from './DialogButton'
import getSundays from '../../helpers/getSundays';
// import { getDateFormat } from '../../helpers/getDates';
import { createDays } from '../../helpers/createTimesheet';
import { createTimesheetAPI } from "../../api/timesheetAPI";

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Start a New Timesheet',
};

let secondSundays = getSundays(2);
let sundays = [];
secondSundays.forEach((sunday, i) => {
    return (
        sundays.push(
            {
                key: new Date(sunday).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }).toString(),
                text: new Date(sunday).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }).toString()
            }
        )
    )
});

const NewTimesheetDialog = ({hideDialog, toggleHideDialog}) => {
    const { setUserData, userName } = useContext(userContext);
    // let dropdownVal = getDateFormat(userData.cycleStart);
    const [startCycleDate, setStartCycleDate] = useState('');
    const [success, setSuccess] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [alreadyCreated, setAlreadyCreated] = useState(false);

    const handleStartCycleChange = (e, selectedOption) => {
        setStartCycleDate(selectedOption.text);
    }

    const handleCreateTimesheet = async() => {
        if(startCycleDate === ''){
            window.alert("Select a Start Date");
            return;
        }

        setIsFetching(true);
        let cycleStart = new Date(startCycleDate);

        let days = createDays(cycleStart);

        let timesheet = {
            username: userName,
            cycleStart,
            extraNotes: '',
            submitted: false,
            days
        }

        //send to DB
        let response = await createTimesheetAPI(timesheet);
        if(response.success){
            if(response.alreadyCreated){
                setAlreadyCreated(true);
                setUserData(response.data);
                setIsFetching(false);
                setSuccess('');
            }else{
                setSuccess('success');
                setUserData(response.data);
                setIsFetching(false);
                setTimeout(() => {
                    setSuccess('');
                    toggleHideDialog();
                }, 1000);
            }
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
                {!alreadyCreated &&
                    <>
                        <div>
                            <Dropdown
                                label='Select Start of Pay Cycle'
                                options={sundays}
                                // defaultSelectedKey={dropdownVal}
                                onChange={handleStartCycleChange}
                            />
                        </div>
                        <div className='h-5 mt-2'>
                            {isFetching &&
                                <p className='text-center bg-yellow-200'>Creating New Timesheet</p>
                            }
                            {success === 'success' &&
                                <p className='text-center bg-green-200'>Success</p>
                            }

                            {success === 'fail' &&
                                <p className='text-center bg-red-200 mt-2'>Something Went Wrong - Try Again</p>
                            }
                        </div>
                        <div className='flex justify-around mt-10'>
                            <DialogButton btnText='Create Timesheet' classes='bg-blue-100' onClick={() => handleCreateTimesheet()} />
                            <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                        </div>
                    </>
                }
                {alreadyCreated &&
                    <>
                        <div>
                            <p className='text-lg text-center font-bold'>A timesheet with this pay cycle has already been created</p>
                            <p className='text-md text-center mt-3'>It has now been loaded</p>
                            <p className='text-md text-center mt-3'>Click the 'Clear Timesheet button if you wish to clear this timesheet to default</p>
                        </div>

                        <div className='flex justify-center mt-10'>
                            <DialogButton btnText='Continue' classes='bg-blue-100' onClick={() => {toggleHideDialog(); setAlreadyCreated(false)}} />
                        </div>
                    </>
                }
                
            </Dialog>
        </>
    )
}

export default NewTimesheetDialog