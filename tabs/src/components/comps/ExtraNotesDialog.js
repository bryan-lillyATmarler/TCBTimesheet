import { Dialog, TextField, DialogType } from '@fluentui/react'
import React from 'react'
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
                    />
                </div>

                <div className='flex justify-around mt-10'>
                    <DialogButton btnText='Add Extra Notes' classes='bg-blue-100' />
                    <DialogButton btnText='Cancel' classes='bg-red-100' onClick={() => toggleExtraNotesHideDialog()} />
                </div>
            </Dialog>
        </>
    )
}

export default ExtraNotesDialog