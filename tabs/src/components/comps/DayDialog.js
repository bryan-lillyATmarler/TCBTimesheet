import React, { useState, useContext, useEffect } from 'react'
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import DialogButton from './DialogButton';
import { Dropdown, TextField } from '@fluentui/react';
import { dropdownSubTypes, dropdownTimes, twentyFourHourFormat } from '../../helpers/getDates';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Update Your Day',
};

const DayDialog = ({hideDialog, toggleHideDialog, day}) => {
    const { userData, setUserData } = useContext(userContext);

    const [subType, setSubType] = useState(day.sub);
    const [dayNotes, setDayNotes] = useState(day.dailyNotes);
    const [startTime, setStartTime] = useState(twentyFourHourFormat(day.startTime).toString())
    const [endTime, setEndTime] = useState(twentyFourHourFormat(day.endTime).toString());
    const [calculatedRegular, setCalculatedRegular] = useState();
    const [calculatedOT, setCalculatedOT] = useState();

    useEffect(() => {
        calculateSelectedHours();
        // eslint-disable-next-line
    }, [startTime, endTime])

    //options for time selection;
    let timeDropdown = dropdownTimes();
    let subDropdown = dropdownSubTypes();

    const handleStartTimeChange = (e, selectedOption) => {
        setStartTime(selectedOption.text);
    }

    const handleEndTimeChange = (e, selectedOption) => {
        setEndTime(selectedOption.text);
    }

    const handleSubChange = (e, selectedOption) => {
        setSubType(selectedOption.text);
    }

    const handleDayNotesChange = (e) => {
        setDayNotes(e.target.value);
    }

    const calculateSelectedHours = () => {
        let [startHour, startMinute] = startTime.split(':').map(Number);
        let [endHour, endMinute] = endTime.split(':').map(Number);

        let start = startHour * 60 + startMinute
        let end = endHour * 60 + endMinute

        if((end - start) / 60 > 8){
            setCalculatedRegular(8);
            setCalculatedOT(((end - start)/60) - 8);
        } else {
            setCalculatedRegular((end - start)/60);
            setCalculatedOT(0);
        }
    }

    const handleUpdateDay = () => {
        let start = new Date(day.date);
        start.setHours(startTime.split(':')[0], startTime.split(':')[1])

        let end = new Date(day.date);
        end.setHours(endTime.split(':')[0], endTime.split(':')[1])

        let updatedDay = {
            date: day.date,
            startTime: start,
            endTime: end,
            sub: subType,
            dailyNotes: dayNotes
        }

        let newUserDays = [...userData.days];
        let index = newUserDays.findIndex((elem) => elem.date === day.date)
        newUserDays[index] = updatedDay;

        let newUserData = {...userData};
        newUserData.days = newUserDays;
        
        setUserData(newUserData);

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
                    {/* DATE */}
                    <div>
                        <p className='text-lg'>{new Date(day.date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</p>
                    </div>

                    {/* TIME */}
                    <div>
                        <div className='grid grid-cols-2'>
                            <Dropdown 
                                className='mr-1'
                                label='Start Time'
                                options={timeDropdown}
                                defaultSelectedKey={startTime}
                                onChange={handleStartTimeChange}
                            />
                            <Dropdown 
                                className='ml-1'
                                label='End Time'
                                options={timeDropdown}
                                defaultSelectedKey={endTime}
                                onChange={handleEndTimeChange}
                            />
                        </div>
                        <div className='mt-1'>
                            <p className='text-center'>{calculatedRegular} Reg | {calculatedOT} OT</p>
                        </div>
                    </div>
                    {/* SUB TYPE */}
                    <div className='mt-2'>
                        <div>
                            <Dropdown 
                                label='Select Sub'
                                options={subDropdown}
                                defaultSelectedKey={subType}
                                onChange={handleSubChange}
                            />
                        </div>
                        <div className='mt-1'>
                            {subType === '' &&
                                <p></p>
                            }
                            {(subType === 'Full Sub' || subType === 'Meal Sub') &&
                                <p className='text-center'>{`${subType === 'Full Sub' ? `${subType} ($200)` : `${subType} ($67)`}`}</p>
                            }
                            {subType === 'Camp Bonus' &&
                                <p className='text-center'>{`Camp Bonus ($25)`}</p>
                            }                            
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
                    <DialogButton btnText='Update' classes='bg-blue-100' onClick={() => handleUpdateDay()} />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default DayDialog