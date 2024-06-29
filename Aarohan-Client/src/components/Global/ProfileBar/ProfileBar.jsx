import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Chip } from "@nextui-org/react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Profile from '../../Profile/Profile';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import axios from 'axios';
import { Backend_url } from '../../../../BackendUrl';
import { useNavigate } from 'react-router-dom';


function ProfileBar({isStudent,image,userData,setReload}) {
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const openProfile = () => {
    onOpen();
  }

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

  const logout = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
      }
      const response = await axios.post(
        `${Backend_url}/api/v1/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full bg-transparent flex justify-end sm:justify-between p-2 items-center'>
      <div className='ml-2 hidden sm:block'>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon className='hover:text-blue-default cursor-pointer' />
          </IconButton>
        </Paper>
      </div>
      <div className='flex gap-6 '>
        <div className='mr-2 mt-2'>
          {isStudent && <Chip color="success" variant="flat">Student Dashboard</Chip>}
          {!isStudent && <Chip color="danger" variant="flat">Mentor Dashboard</Chip>}
        </div>
        <div className='mr-2'>

          <Dropdown>
            <DropdownTrigger>
              <Avatar src={image} className='cursor-pointer' />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" color='primary'>
              <DropdownItem key="new" onClick={openProfile} >Profile</DropdownItem>
              <DropdownItem key="delete" onClick={logout} className="text-danger" color="danger">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} scrollBehavior="inside" className='h-auto my-auto'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Profile</ModalHeader>
              <ModalBody>
                <Profile isStudent={isStudent} userData={userData} setReload={setReload} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileBar