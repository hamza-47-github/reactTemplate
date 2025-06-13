import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as constants from '@fortawesome/free-solid-svg-icons'

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const ChildModel = () => {
    const [allchecked, setAllChecked] = React.useState([]);
    function handleChange(e) {
        if (e.target.checked) {
            setAllChecked([...allchecked, e.target.value]);
        } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
        }
    }
    const [open, setOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
        handleOpen(); // Open the modal when a size is selected
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',

        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        borderradius: '13px'
    };


    return (
        <>


            {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
          
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500,height:500 }} className="modalstyle">
                    <form className="login-form " >
                        <div>Product Size</div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="  form-group pt-4 pb-4">
                                    <label className='pb-3'>Name</label>
                                    <input className="form-control " required id="username" name="Name" placeholder="Name"

                                    />

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group pwd-container">
                                    <label className="pb-3">
                                        Price      
                                         </label> 
                                    <input className="form-control" required id="price" name="price" placeholder="75$"

                                    />

                                </div>
                            </div>
                        </div>

                    </form>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </>
    )
}

export default ChildModel