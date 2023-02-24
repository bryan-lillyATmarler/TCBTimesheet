import React, {useState, useContext } from 'react';
import Header from '../comps/Header';
import Footer from '../comps/Footer';
import DayCard from '../comps/DayCard';
import { userContext, TeamsFxContext } from '../Context';
import { useData } from "@microsoft/teamsfx-react";
import { Image, initializeIcons } from '@fluentui/react';
import { getLatestTimesheetAPI } from '../../api/timesheetAPI';
import { useBoolean } from '@fluentui/react-hooks';
import NewTimesheetDialog from '../comps/NewTimesheetDialog';
import PreviousTimesheetDialog from '../comps/PreviousTimesheetDialog';
import { GrDocumentTime, GrSchedules, GrAddCircle } from 'react-icons/gr';


const Timesheet = () => {
    //user data from Teams
    const { teamsUserCredential } = useContext(TeamsFxContext);
        //eslint-disable-next-line
    const { loading, data, error } = useData(async () => {
        if (teamsUserCredential) {
            const userInfo = await teamsUserCredential.getUserInfo();
            return userInfo;
        }
    });
    const userName = (loading || error) ? "": data.displayName;

    initializeIcons();

    const [userData, setUserData] = useState('Empty');
    const [success, setSuccess] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [newTimesheetHideDialog, { toggle: toggleNewTimesheetHideDialog }] = useBoolean(true);
    const [previousTimesheetHideDialog, { toggle: togglePreviousTimesheetHideDialog }] = useBoolean(true);

    const fetchUserData = async() => {
        setIsFetching(true);
        setUserData('');
        let response = await getLatestTimesheetAPI(userName);

        if(response.success){
            setIsFetching(false);
            setSuccess('success');
            if(response.data === 'Empty'){
                setSuccess('no data');
                setUserData('');
                setTimeout(() => {
                    setUserData('Empty');
                }, 2000);
            } else {
                setUserData(response.data);
            }            
        } else {
            setIsFetching(false);
            setSuccess('fail');
            setTimeout(() => {
                setUserData('Empty');
            }, 2000);
        }

        setTimeout(() => {
            setSuccess('');
        }, 2000);
    }

    const handleLoadLatestTimesheet = () => {
        fetchUserData();
    }

    const contextValue = { userData, setUserData, userName };
    return (
        <>
            <userContext.Provider value={contextValue}>

                {userData !== '' && userData !== 'Empty' &&
                    <>
                        <Header />
                        {
                        userData.days.map((day) => {
                            return (
                                <DayCard key={day.date} day={day} />
                            )
                        }
                        )}
                    </>
                }

                {userData === 'Empty' &&
                    <div className='h-screen flex flex-col'>
                        <div className='mt-4 mx-auto max-w-3xl'>
                            <Image  src='./TCB_Transparent_Full.png' alt='TCB Locating' />
                        </div>
                        <div className='mx-auto mb-10'>
                            <h1 className='md:text-5xl'>Timesheet</h1>
                        </div>
                        <div className='grid grid-cols-1'>
                            <div onClick={() => handleLoadLatestTimesheet()} className='text-black mx-auto mt-5 h-10 cursor-pointer bg-green-100 border border-black rounded-lg grid grid-cols-5 shadow-lg hover:shadow-2xl hover:bg-green-200'>
                                <GrDocumentTime size={20} className='col-span-1 m-auto' />
                                <button className='col-span-4 text-lg mr-2 text-black'>Load Last Timesheet</button>
                            </div>
                            <div onClick={() => toggleNewTimesheetHideDialog()} className='text-black mx-auto mt-5 h-10 cursor-pointer bg-yellow-100 border border-black rounded-lg grid grid-cols-5 shadow-lg hover:shadow-2xl hover:bg-yellow-200'>
                                <GrAddCircle size={20} className='col-span-1 m-auto' /> 
                                <button className='col-span-4 text-lg mr-2 text-black'>Start New Timesheet</button>
                            </div>
                            <div onClick={() => togglePreviousTimesheetHideDialog()} className='text-black mx-auto mt-5 h-10 cursor-pointer bg-blue-100 border border-black rounded-lg grid grid-cols-5 shadow-lg hover:shadow-2xl hover:bg-blue-200'>
                                <GrSchedules size={20} className='col-span-1 m-auto' /> 
                                <button className='col-span-4 text-lg mr-2 text-black'>View Previous Timesheet</button>
                            </div>
                        </div>
                    </div>
                }

                {success === 'fail' &&
                    <>
                        <div className='h-screen flex'>
                            <div className='m-auto'>
                                <p className='text-large'>Something Went Wrong - Try Again</p>
                            </div>
                        </div>
                    </>
                }

                {success === 'no data' &&
                    <>
                        <div className='h-screen flex'>
                            <div className='m-auto'>
                                <p className='text-large'>Could not find any timesheet - Start a New Timesheet</p>
                            </div>
                        </div>
                    </>
                }

                {isFetching &&
                    <>
                        <div className='h-screen flex'>
                            <div className='m-auto'>
                                <p className='text-lg'>Loading...</p>
                            </div>
                        </div>
                    </>
                }


                
                <NewTimesheetDialog  hideDialog={newTimesheetHideDialog} toggleHideDialog={toggleNewTimesheetHideDialog} />
                <PreviousTimesheetDialog hideDialog={previousTimesheetHideDialog} toggleHideDialog={togglePreviousTimesheetHideDialog} />

                <Footer />
            </userContext.Provider>
        </>
    )
}

export default Timesheet