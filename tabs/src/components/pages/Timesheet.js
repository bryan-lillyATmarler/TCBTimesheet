import React, {useState, useContext} from 'react';
import Header from '../comps/Header';
import Footer from '../comps/Footer';
import DayCard from '../comps/DayCard';
import Submit from '../comps/Submit';
import { userContext, TeamsFxContext } from '../Context';
import { useData } from "@microsoft/teamsfx-react";

const sampleData = {
    user: 'Bryan Lilly',
    cycleStart: 'Sun, Jan 1, 2023',
    extraNotes: 'Some extra notes for the test',    
    days: [
        {
            date: 'Wed, Jan 25, 2023',
            startTime: 700,
            endTime: 1700,
            sub: 'Full Sub',
            dailyNotes: 'Notes for test'
        }
    ]
    
}

const Timesheet = () => {
    //user data from Teams
    const { teamsUserCredential } = useContext(TeamsFxContext);
    const { loading, data, error } = useData(async () => {
        if (teamsUserCredential) {
            const userInfo = await teamsUserCredential.getUserInfo();
            return userInfo;
        }
    });
    // const userName = (loading || error) ? "": data.displayName;

    //userData from DB
    const [userData, setUserData] = useState(sampleData);
    const [userInfo, setUserInfo] = useState(data);

    const contextValue = { userData, setUserData, userInfo, setUserInfo };
    return (
        <>
            <userContext.Provider value={contextValue}>
                <Header />


                <DayCard sub='Meal Sub' />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />
                <DayCard />

                <Footer />

                <Submit />
            </userContext.Provider>
        </>
    )
}

export default Timesheet