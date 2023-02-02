import { Dialog, TextField, DialogType } from '@fluentui/react'
import React, { useState, useContext } from 'react'
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

    const handleNotesChange = (e) => {
        setExtraNotes(e.target.value);
    }
    
    const handleSubmit = () => {
        let newUserData = {...userData};
        newUserData.extraNotes = extraNotes;

        setUserData(newUserData);

        setTimeout(() => {
            toggleExtraNotesHideDialog();
        }, 1000);
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

                <div className='flex justify-around mt-6'>
                    <DialogButton btnText='Update Extra Notes' classes='bg-blue-100' onClick={() => handleSubmit()} />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleExtraNotesHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default ExtraNotesDialog