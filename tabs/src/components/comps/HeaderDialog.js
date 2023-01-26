import React, { useContext } from 'react';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react'
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import DialogButton from './DialogButton';
import getSundays from '../../helpers/getSundays';


const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Start of Pay Cycle',
};

let secondSundays = getSundays(2);
let sundays = [];
secondSundays.forEach((sunday, i) => {
    return (
        sundays.push(
            {
                key: i,
                text: new Date(sunday).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }).toString()
            }
        )
    )
});

const HeaderDialog = ({hideDialog, toggleHideDialog}) => {
    // const {cycleBegins, setCycleBegins} = useContext(timesheetContext);

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
                    />
                    <TextField 
                        label='Add Extra Notes'
                        multiline
                    />
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Change' classes='bg-blue-100' />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default HeaderDialog