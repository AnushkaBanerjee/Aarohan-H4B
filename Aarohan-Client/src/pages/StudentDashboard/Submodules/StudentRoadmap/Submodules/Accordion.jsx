import React from 'react'
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { Gauge } from '@mui/x-charts/Gauge';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { Backend_url } from '../../../../../../BackendUrl';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AccordionMy({ week, description, names, todo, isPermanent, getRoadmap, _id, marks, fullMarks, status }) {

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
const navigate = useNavigate();
    const markDone = async (id) => {
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }
            // console.log(accessToken);
            const response = await axios.patch(`${Backend_url}/api/v1/roadmaps/mark-done-roadmap?roadmapId=${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                getRoadmap();
            }

        } catch (error) {
            getRoadmap()
        }
    }

    const markUndone = async (id) => {
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }
            // console.log(accessToken);
            const response = await axios.patch(`${Backend_url}/api/v1/roadmaps/mark-pending-roadmap?roadmapId=${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                getRoadmap();
            }

        } catch (error) {
            getRoadmap()
        }
    }

    const giveTest = (id) => {
        navigate(`/Give-test/${id}/`);
    }

    return (
        <Accordion variant="splitted" className=' rounded-lg bg-transparent '>
            <AccordionItem key="1" aria-label="Accordion 1" title={`Week ${week}`} >
                <div className='space-y-4 p-4 '>
                    <div className='text-center md:flex md:justify-between space-y-4 md:space-y-0'>


                        <div className='text-left items-center'>
                            <Typography>
                                {description}
                            </Typography>
                        </div>
                        {isPermanent && <div className='mb-4'>
                            <Gauge width={100} height={100} value={(marks / fullMarks) * 100} sx={{ marginX: "auto" }} />
                            <div className='text-center'>
                                <Typography>
                                    Performance
                                </Typography>
                            </div>
                        </div>}

                        


                    </div>
                    {((marks / fullMarks) * 100) >= 80 && status !== 'pending' && (<div className="text-sm text-green-500">Suggestion: Excellent Performance Go to Next Step !!</div>)}
                        {((marks / fullMarks) * 100) < 80 && ((marks / fullMarks) * 100) > 40 && status !== 'pending' && (<div className="text-sm text-orange-500">Suggestion: Avarage Performance Need more time on it !!</div>)}
                        {((marks / fullMarks) * 100) <= 40 && status !== 'pending' && (<div className="text-sm text-red-500">Suggestion: Poor Performance Do not Jump to the next Step !!</div>)}

                    <div>
                        {names.map((name, index) => <Chip key={index} color="primary" variant='bordered' className="m-1">{name}</Chip>)}
                    </div>
                    <Table removeWrapper aria-label="Example static collection table">
                        <TableHeader >
                            <TableColumn className='bg-primary text-white-default'>Todo</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {todo.map((td, index) => <TableRow key={index}>
                                <TableCell>{td}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                    {isPermanent && (<div className='md:flex md:justify-between md:space-y-0 space-y-4 text-center'>
                        <div classname='flex justify-center items-center'><Button color='primary' className='text-white-default' onClick={() => giveTest(_id)} >Give Test</Button></div>
                        <div className='md:flex  md:space-y-0 space-y-4 md:gap-6'>
                            <div classname='flex justify-center items-center'><Button color='danger' className='text-white-default' onClick={() => markUndone(_id)}>Mark Undone</Button></div>
                            <div classname='flex justify-center items-center'><Button color='success' className='text-white-default' onClick={() => markDone(_id)}>Mark Done</Button></div>
                        </div>

                    </div>)}
                </div>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionMy