import React, { useState, useContext, useEffect } from 'react'
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import DialogButton from './DialogButton';
import { Dropdown, TextField } from '@fluentui/react';
import { dropdownSubTypes, dropdownTimes, isHoliday, isWeekend, twentyFourHourFormat } from '../../helpers/getDates';
import { updateTimesheetAPI } from '../../api/timesheetAPI';

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
    const [startTime, setStartTime] = useState(day.startTime === '24:00' ? '07:00' : day.startTime)
    const [endTime, setEndTime] = useState(day.endTime === '24:00' ? '17:00' : day.endTime);
    const [calculatedRegular, setCalculatedRegular] = useState();
    const [calculatedOT, setCalculatedOT] = useState();
    const [isFetching, setIsfetching] = useState(false);
    const [negativeNums, setNegativeNums] = useState(false);

    const [success, setSuccess] = useState('');

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
        setNegativeNums(false);
        let [startHour, startMinute] = startTime.split(':').map(Number);
        let [endHour, endMinute] = endTime.split(':').map(Number);

        let start = startHour * 60 + startMinute;
        let end = endHour * 60 + endMinute;

        //if the day is a weekend all hours are OT
        if(isWeekend(day.date)){
            setCalculatedRegular(0);
            setCalculatedOT((end-start)/60);
            return;
        }

        if(isHoliday(day.date)){
            setCalculatedRegular(0);
            setCalculatedOT((end-start)/60);
            return;
        }

        if((end - start) / 60 > 8){
            setCalculatedRegular(8);
            setCalculatedOT(((end - start)/60) - 8);
        } else {
            setCalculatedRegular((end - start)/60);
            setCalculatedOT(0);
        }

        if((end - start) < 0){
            window.alert("Can't have a negative amount hours");
            setNegativeNums(true);
            return;
        }
    }

    const handleUpdateDay = async(clear = false) => {
        setIsfetching(true);
        let start;
        let end;
        let sub;
        let dailyNotes;
        if(clear){
            //clear = true then it is clearing the day data
            if(!window.confirm('Are you sure you want to clear data for this day?')){
                setIsfetching(false);
                return;
            }
            setSubType('');
            setDayNotes('');
            setStartTime('24:00');
            setEndTime('24:00');

            start = '24:00';
            end = '24:00';
            sub = '';
            dailyNotes = '';
        } else {
            start = new Date(day.date);
            start.setHours(startTime.split(':')[0], startTime.split(':')[1])
        
            end = new Date(day.date);
            end.setHours(endTime.split(':')[0], endTime.split(':')[1])
        
            start = twentyFourHourFormat(start);
            end = twentyFourHourFormat(end);
            sub = subType;
            dailyNotes = dayNotes;
        }

        let updatedDay = {
            date: day.date,
            startTime: start,
            endTime: end,
            sub,
            dailyNotes
        }

        let newUserDays = [...userData.days];
        let index = newUserDays.findIndex((elem) => elem.date === day.date)
        newUserDays[index] = updatedDay;

        let newUserData = {...userData};
        newUserData.days = newUserDays;

        let response = await updateTimesheetAPI(newUserData);

        if(response.success){
            setSuccess('success');
            setUserData(response.data);
            setIsfetching(false);
            setTimeout(() => {
                setSuccess('');
                toggleHideDialog();
            }, 1000);
        } else {
            setSuccess('fail');
            setIsfetching(false);
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

                <>
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
                                    defaultSelectedKey={startTime === '24:00' ? '07:00' : startTime}
                                    onChange={handleStartTimeChange}
                                />
                                <Dropdown
                                    className='ml-1'
                                    label='End Time'
                                    options={timeDropdown}
                                    defaultSelectedKey={endTime === '24:00' ? '17:00' : endTime}
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

                    <div className='h-4 mt-2'>
                        {isFetching &&
                            <p className='text-center bg-yellow-200'>Updating Day</p>
                        }
                        {success === 'success' &&
                            <p className='text-center bg-green-200'>Success</p>
                        }
                        {success === 'fail' &&
                            <p className='text-center bg-red-200'>Something Went Wrong - Try Again</p>
                        }
                    </div>
                    <div className='flex justify-around mt-5'>
                        <DialogButton disable={isFetching} btnText='Clear Day' classes='bg-yellow-100' onClick={() => handleUpdateDay(true)} />
                    </div>
                    
                    <div className='flex justify-around mt-10'>
                        <DialogButton disable={isFetching || negativeNums} btnText='Update' classes='bg-blue-100' onClick={() => handleUpdateDay()} />
                        <DialogButton disable={isFetching} btnText='Cancel' classes='bg-red-100' onClick={() => toggleHideDialog()} />
                    </div>
                </>

            </Dialog>
        </>
    )
}

export default DayDialog