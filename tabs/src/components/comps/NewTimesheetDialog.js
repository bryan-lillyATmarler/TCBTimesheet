import { Dialog, Dropdown, DialogType } from '@fluentui/react'
import React, {useState, useContext} from 'react'
import { userContext } from '../Context';
import DialogButton from './DialogButton'
import getSundays from '../../helpers/getSundays';
import { getDateFormat } from '../../helpers/getDates';
import { createDays } from '../../helpers/createTimesheet';

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
    const { userData, setUserData, userName } = useContext(userContext);
    let dropdownVal = getDateFormat(userData.cycleStart);
    const [startCycleDate, setStartCycleDate] = useState('')

    const handleStartCycleChange = (e, selectedOption) => {
        setStartCycleDate(selectedOption.text);
    }

    const handleCreateTimesheet = () => {
        let cycleStart = new Date(startCycleDate);

        let days = createDays(cycleStart);

        let timesheet = {
            username: userName,
            cycleStart,
            extraNotes: '',
            submitted: false,
            days
        }

        console.log(timesheet)
        setUserData(timesheet);
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
                        options={sundays}
                        defaultSelectedKey={dropdownVal}
                        onChange={handleStartCycleChange}
                    />
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Create Timesheet' classes='bg-blue-100' onClick={() => handleCreateTimesheet()} />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default NewTimesheetDialog