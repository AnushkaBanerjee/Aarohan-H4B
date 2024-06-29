
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Backend_url } from '../../../BackendUrl.js';
import { useNavigate } from "react-router-dom";

function Profile({ isStudent, userData }) {
    const [openSnack, setOpenSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [file, setFile] = useState(null);
    const [avatar, setAvatar] = useState(userData.avatar);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage("");
        setErrorMessage("");
        setIsError(false);
        setOpenSnack(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }

            const formData = new FormData();
            formData.append('avatar', file);

            await axios.patch(`${Backend_url}/api/v1/users/avatar`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setReload(true);
            setSuccessMessage("Profile updated successfully");
            setIsError(false);
            setOpenSnack(true);
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Failed to update profile");
            setIsError(true);
            setOpenSnack(true);
        }
    };

    const getCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    };

    // Defaulting userData properties to empty strings if undefined or null
    const { fullName = '', username = '', email = '', contactNo = '', language = '', address = '', institution = '', standard = '' } = userData;

    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity={isError ? "error" : "success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {isError ? errorMessage : successMessage}
                </Alert>
            </Snackbar>
            <div className='flex gap-4 justify-center'>
                <Avatar src={avatar} className='h-32 w-32' />
                <div className='flex-col space-y-10 py-4'>
                    <div>
                        {isStudent ? <Chip color="success" variant='flat' size='xl'>Student</Chip> : <Chip color="danger" variant='flat' size='xl'>Mentor</Chip>}
                    </div>
                    <div className='flex gap-4 items-end'>
                        <Button color="primary" variant='flat' className='w-4' onClick={() => document.getElementById('avatarUpload').click()}>
                            <EditIcon />
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            id="avatarUpload"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <Button color="success" variant='flat' onClick={handleFormSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <Table hideHeader aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Value</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><Chip color="primary">Name</Chip></TableCell>
                            <TableCell>{fullName}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><Chip color="primary">Username</Chip></TableCell>
                            <TableCell>{username}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><Chip color="primary">Email</Chip></TableCell>
                            <TableCell>{email}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><Chip color="primary">Contact No.</Chip></TableCell>
                            <TableCell>{contactNo}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell><Chip color="primary">Language</Chip></TableCell>
                            <TableCell>{language}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell><Chip color="primary">Address</Chip></TableCell>
                            <TableCell>{address}</TableCell>
                        </TableRow>
                        {isStudent === true && (

                            <TableRow key="8">
                                <TableCell><Chip color="primary">Institution</Chip></TableCell>
                                <TableCell>{institution}</TableCell>
                            </TableRow>
                        )}
                        {isStudent === true && (
                            <TableRow key="9">
                                <TableCell><Chip color="primary">Semester</Chip></TableCell>
                                <TableCell>{standard}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Profile;
