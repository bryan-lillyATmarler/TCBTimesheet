import React, {useState, createContext} from 'react'
import Header from '../comps/Header'
import Footer from '../comps/Footer'
import DayCard from '../comps/DayCard'
import Submit from '../comps/Submit'

const sampleData = {
    user: 'Bryan Lilly',
    timesheet: {
        cycleStart: 'Wed, Jan 25, 2023',
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
        
}

const timesheetContext = createContext();

const Timesheet = () => {
    const [cycleStart, setCycleStart] = useState(sampleData.timesheet.cycleStart);

    // const { cycleBegin, setCycleBegin } = useContext(timesheetContext);
    const contextValue = {cycleStart, setCycleStart}
  return (
    <>
        <timesheetContext.Provider value={contextValue}>
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
        </timesheetContext.Provider>
    </>
  )
}

export default Timesheet