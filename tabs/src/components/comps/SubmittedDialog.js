import { Dialog, DialogType } from '@fluentui/react'
import React, { useContext } from 'react'
import { getDateFormat } from '../../helpers/getDates';
import { userContext } from '../Context';

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Timsheet Already Submitted',
};

const SubmittedDialog = ({hideDialog, toggleHideDialog, toggleSubmitDialog}) => {
    const {userData} = useContext(userContext);
    const dateSubmitted = getDateFormat(userData.submittedOn)

    const handleResubmit = () => {
        toggleHideDialog();
        toggleSubmitDialog();
    }

  return (
    <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
    >
        <div>
            <p className='text-lg font-bold text-center mb-4'>Already Submitted</p>
            <p className='text-center'>Timesheet was already submitted on:</p>
            <p className='text-center'>{dateSubmitted}</p>
            <p className='text-center mt-10 font-bold'>Do you want to submit this Timesheet again?</p>
        </div>
        
        <div className='flex mt-5'>
            <div onClick={() => handleResubmit()} className='m-auto border border-black py-3 px-4 rounded-md cursor-pointer bg-blue-100'>
                <button>Submit Again</button>
            </div>
            <div onClick={() => toggleHideDialog()} className='m-auto border border-black py-3 px-4 rounded-md cursor-pointer bg-yellow-100'>
                <button>Cancel</button>
            </div>
        </div>
        
    </Dialog>
  )
}

export default SubmittedDialog