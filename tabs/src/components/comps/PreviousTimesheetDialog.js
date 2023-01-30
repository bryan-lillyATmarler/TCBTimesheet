import React, { useContext } from 'react';
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import DialogButton from './DialogButton';
import getSundays from '../../helpers/getSundays';
import { getDateFormat } from '../../helpers/getDates';


const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Choose Previous Timesheet',
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

const PreviousTimesheetDialog = ({ hideDialog, toggleHideDialog }) => {
    const { userData } = useContext(userContext);

    let dropdownVal = getDateFormat(userData.cycleStart);

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
                        // onChange={handleStartCycleChange}
                    />
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Load Timesheet' classes='bg-blue-100' />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default PreviousTimesheetDialog