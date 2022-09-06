//import liraries
import React, { Component, useEffect } from 'react';
import {DialogTitle , Dialog, DialogContent, Box, Button} from '@mui/material';


// create a component
const AlertPopup = (props) => {
    const { popupOpen, _setPopupShow,mapMessage } = props;
    // const [isOpen, setIsOpen]  = React.useState(popupOpen); 
    // const [mapMessage, setmapMessage]  = React.useState(props.popupMsg); 

    const handleClose = () =>{
        _setPopupShow(false);
    }

    useEffect(() => {
        console.log(props);
    });

    return (
        <Box >
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={popupOpen}
                onClose={handleClose}
                style={{ width : '100%' }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{ paddingTop : 30, paddingBottom : 30, textAlign : 'center' }}> 
                    { mapMessage }
                </DialogContent>
                <Button onClick={handleClose} autoFocus>
                    Close
                    </Button>
            </Dialog>
        </Box>
    );
};

//make this component available to the app
export default AlertPopup;
