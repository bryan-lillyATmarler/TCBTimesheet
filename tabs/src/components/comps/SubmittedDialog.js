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

const SubmittedDialog = ({hideDialog, toggleHideDialog}) => {
    const {userData} = useContext(userContext);
    const dateSubmitted = getDateFormat(userData.submittedOn)

  return (
    <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
    >
        <div>
            <p className='text-lg font-bold text-center mb-4'>Cannot Submit</p>
            <p className='text-center'>Timesheet was already submitted on:</p>
            <p className='text-center font-bold'>{dateSubmitted}</p>
        </div>
        
        <div className='flex mt-5'>
            <div onClick={() => toggleHideDialog()} className='m-auto border border-black py-3 px-4 rounded-md cursor-pointer bg-blue-100'>
                <button>Okay</button>
            </div>
        </div>
        
    </Dialog>
  )
}

export default SubmittedDialog