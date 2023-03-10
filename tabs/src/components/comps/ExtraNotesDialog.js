import { Dialog, TextField, DialogType } from '@fluentui/react'
import React, { useState, useContext, useEffect } from 'react'
import { updateTimesheetAPI } from '../../api/timesheetAPI';
import { userContext } from '../Context';
import DialogButton from './DialogButton'

const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Add Extra Notes',
};

const ExtraNotesDialog = ({extraNotesHideDialog, toggleExtraNotesHideDialog}) => {
    const { userData, setUserData } = useContext(userContext);
    const [extraNotes, setExtraNotes] = useState(userData.extraNotes);
    const [success, setSuccess] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setExtraNotes(userData.extraNotes);
    }, [userData]);

    const handleNotesChange = (e) => {
        setExtraNotes(e.target.value);
    }
    
    const handleSubmit = async() => {
        setIsFetching(true);
        let newUserData = {...userData};
        newUserData.extraNotes = extraNotes;

        let response = await updateTimesheetAPI(newUserData);
        if(response.success){
            setSuccess('success');
            setUserData(response.data);
            setIsFetching(false);
            setTimeout(() => {
                setSuccess('')
                toggleExtraNotesHideDialog();
            }, 1000);
        } else {
            setSuccess('fail');
            setIsFetching(false);
            setTimeout(() => {
                setSuccess('')
            }, 2000);
        }
    }

    const handleClearNotes = () => {
        setExtraNotes('');
    }

    return (
        <>
            <Dialog
                hidden={extraNotesHideDialog}
                onDismiss={toggleExtraNotesHideDialog}
                dialogContentProps={dialogContentProps}
                modalProps={modelProps}
            >

                <div>
                    <TextField
                        label='Add Extra Notes'
                        multiline
                        onChange={handleNotesChange}
                        value={extraNotes}
                    />
                </div>
                <div className='mt-4 text-center'>
                    <button onClick={() => handleClearNotes()} className='border border-black px-4 py-2 rounded-md bg-yellow-100'>Clear Extra Notes</button>
                </div>

                <div className='h-4 mt-4'>
                    {isFetching &&
                        <p className='text-center bg-yellow-200'>Adding Extra Notes</p>
                    }
                    {success === 'success' &&
                        <p className='text-center bg-green-200'>Success</p>
                    }
                    {success === 'fail' &&
                        <p className='text-center bg-red-200'>Something Went Wrong - Try Again</p>
                    }
                </div>

                <div className='flex justify-around mt-6'>
                    <DialogButton disable={isFetching} btnText='Update Extra Notes' classes='bg-blue-100' onClick={() => handleSubmit()} />
                    <DialogButton disable={isFetching} btnText='Cancel' classes='bg-red-100' onClick={() => toggleExtraNotesHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default ExtraNotesDialog