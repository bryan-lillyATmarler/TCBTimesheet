import React from 'react';

const DialogButton = ({btnText, classes, onClick }) => {
  return (
    <div className={`border border-black py-3 px-4 rounded-md ${classes}`}>
        <button onClick={onClick}>
            {btnText}
        </button>
    </div>
  )
}

export default DialogButton;