import React, {useState, useContext} from 'react';
import Header from '../comps/Header';
import Footer from '../comps/Footer';
import DayCard from '../comps/DayCard';
// import Submit from '../comps/Submit';
import { userContext, TeamsFxContext } from '../Context';
import { useData } from "@microsoft/teamsfx-react";

const sampleData = {
    user: 'Bryan Lilly',
    cycleStart: 'Sun, Jan 1, 2023',
    extraNotes: 'Some extra notes for the test',    
    days: [
        {
            date: 'Wed, Jan 25, 2023',
            startTime: new Date(),
            endTime: new Date(),
            sub: 'Full Sub',
            dailyNotes: 'Notes for test'
        }
    ]
    
}

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

    //userData from DB
    const [userData, setUserData] = useState(sampleData);
    // const [userInfo, setUserInfo] = useState(data);

    const contextValue = { userData, setUserData, userName };
    return (
        <>
            <userContext.Provider value={contextValue}>
                <Header />

                {userData.days.map((day) => {
                    return (
                        <DayCard key={day.date} day={day} />
                    )
                })}

                <Footer />
            </userContext.Provider>
        </>
    )
}

export default Timesheet