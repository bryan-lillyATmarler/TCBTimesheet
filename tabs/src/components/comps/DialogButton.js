import React from 'react';

const DialogButton = ({btnText, classes, onClick, disable }) => {
  return (
    <div className={`border border-black py-3 px-4 rounded-md ${disable ? 'cursor-progress' : 'cursor-pointer'} ${classes}`}>
        <button className={`${disable ? 'cursor-progress' : 'cursor-pointer'}`} disabled={disable} onClick={onClick}>
            {btnText}
        </button>
    </div>
  )
}

export default DialogButton;