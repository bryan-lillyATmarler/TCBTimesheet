import React, { useState } from 'react'
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import DialogButton from './DialogButton';
import { Dropdown, TextField, TimePicker } from '@fluentui/react';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Update Your Day',
};

const DayDialog = ({hideDialog, toggleHideDialog, day}) => {
    const [subType, setSubType] = useState(day.sub);
    const [dayNotes, setDayNotes] = useState(day.dailyNotes);

    const timeRange = {
        start: 0,
        end: 24,
    };

    const handleTimeChange = () => {

    }

    const handleSubChange = (e, selectedOption) => {
        setSubType(selectedOption.text);
    }

    const handleDayNotesChange = (e) => {
        setDayNotes(e.target.value);
    }

    let startHour = new Date();
    startHour.setHours(12, 0)

    return (
        <>
            <Dialog
                hidden={hideDialog}
                onDismiss={toggleHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >

                <div>
                    {/* DATE */}
                    <div>
                        <p className='text-lg'>{new Date(day.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</p>
                    </div>

                    {/* TIME */}
                    <div>
                        <div className='flex'>
                            <TimePicker
                                className='mr-1'
                                // allowFreeform={false}
                                // increments={30}
                                // autoComplete="on"
                                // label={'Start Time'}
                                // useComboBoxAsMenuWidth
                                // timeRange={timeRange}
                                // onChange={handleTimeChange}
                                defaultValue={new Date(day.date)}
                            />
                            <TimePicker
                                className='ml-1'
                                value={new Date(day.date)}
                                // allowFreeform={false}
                                // increments={30}
                                // autoComplete="on"
                                // label={'End Time'}
                                // useComboBoxAsMenuWidth
                                // timeRange={timeRange}
                                // onChange={handleTimeChange}
                                // value={day.endTime}
                            />
                        </div>
                        <div className='mt-1'>
                            <p className='text-center'>8 Reg | 2 OT</p>
                        </div>
                    </div>
                    {/* SUB TYPE */}
                    <div className='mt-2'>
                        <div>
                            <Dropdown 
                                label='Select Sub'
                                options={[{key: 'Full Sub', text: 'Full Sub'}, {key: 'Meal Sub', text: 'Meal Sub'}]}
                                defaultSelectedKey={subType}
                                onChange={handleSubChange}
                            />
                        </div>
                        <div className='mt-1'>
                            <p className='text-center'>{`${subType === 'Full Sub' ? `${subType} ($200)` : `${subType} ($67)`}`}</p>
                        </div>
                    </div>

                    {/* DAY NOTES */}
                    <div className='mt-2'>
                        <TextField 
                            label='Enter any notes for the day'
                            multiline
                            onChange={handleDayNotesChange}
                            value={dayNotes}
                        />
                    </div>
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Update' classes='bg-blue-100' />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default DayDialog