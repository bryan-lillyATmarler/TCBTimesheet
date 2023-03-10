import React, { useContext, useState } from 'react'
import { userContext } from '../Context';
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import DialogButton from './DialogButton';
import { createDays } from '../../helpers/createTimesheet';
import { updateTimesheetAPI } from '../../api/timesheetAPI';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Clear Timesheet ',
};

const ClearTimesheetDialog = ({hideDialog, toggleHideDialog}) => {
    const { userData, setUserData } = useContext(userContext);
    const [success, setSuccess] = useState('');
    const [isFetching, setIsfetching] = useState(false);

    const handleClearTimesheetSubmit = async() => {
        setIsfetching(true);
        let body = {
            days: createDays(userData.cycleStart)
        }

        let response = await updateTimesheetAPI(body, userData._id);

        if(response.success) {
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
    <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
    >
          {/* {!userData.submitted && */}
              <>
                  <div>
                      <p className='font-bold text-center'>Are you sure you want to clear your timesheet info?</p>
                      <p className='mt-4 text-center'>This will reset all the hours, remove subs and remove any any notes that you have added</p>
                  </div>

                  <div className='mt-4 h-4'>
                      {isFetching &&
                          <p className='bg-yellow-200 text-center'>Clearing Timesheet</p>
                      }
                      {success === 'success' &&
                          <p className='bg-green-200 text-center'>Current Timesheet Cleared</p>
                      }
                      {success === 'fail' &&
                          <p className='bg-red-200 text-center'>Something Went Wrong - Try Again</p>
                      }
                  </div>

                  <div className='flex justify-around mt-10'>
                      <DialogButton disable={isFetching} btnText='Clear Timesheet' classes='bg-red-200' onClick={() => handleClearTimesheetSubmit()} />
                      <DialogButton disable={isFetching} btnText='Cancel' classes='bg-yellow-200' onClick={() => toggleHideDialog()} />
                  </div>
              </>
        
    </Dialog>
  )
}

export default ClearTimesheetDialog;