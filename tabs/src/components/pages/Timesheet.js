import React, {useState, useContext } from 'react';
import Header from '../comps/Header';
import Footer from '../comps/Footer';
import DayCard from '../comps/DayCard';
import { userContext, TeamsFxContext } from '../Context';
import { useData } from "@microsoft/teamsfx-react";
import { initializeIcons } from '@fluentui/react';
import { getLatestTimesheetAPI } from '../../api/timesheetAPI';
import { useBoolean } from '@fluentui/react-hooks';
import NewTimesheetDialog from '../comps/NewTimesheetDialog';
import PreviousTimesheetDialog from '../comps/PreviousTimesheetDialog';


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
                    <div className='h-screen flex'>
                        <div className='m-auto grid grid-cols-1'>
                            <div onClick={() => handleLoadLatestTimesheet()} className='text-black mx-auto mt-5 h-10 cursor-pointer bg-green-100 border border-black rounded-md p-3'>
                                <button>Load Last Timesheet</button>
                            </div>
                            <div onClick={() => toggleNewTimesheetHideDialog()} className='text-black mx-auto mt-5 h-10 cursor-pointer bg-yellow-100 border border-black rounded-md p-3'>
                                <button>Start New Timesheet</button>
                            </div>
                            <div onClick={() => togglePreviousTimesheetHideDialog()} className='text-black mx-auto mt-5 h-10 cursor-pointer bg-blue-100 border border-black rounded-md p-3'>
                                <button>View Previous Timesheet</button>
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