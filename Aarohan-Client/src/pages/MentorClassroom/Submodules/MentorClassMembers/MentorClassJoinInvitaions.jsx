import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Backend_url } from '../../../../../BackendUrl';
import ClassBanner from '../../../../components/Global/Banner/ClassBanner';

const JoinInvitations = () => {
    const { classId } = useParams();
    const [invitations, setInvitations] = useState([]);
    const [classInfo, setClassInfo] = useState(null);

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

    useEffect(() => {
        // Fetch join invitations data
        const fetchInvitations = async () => {
            try {
                const accessToken = getCookie('accessToken');
                if (!accessToken) {
                    console.error("Access token not found");
                    return null;
                }
                // Replace the URL with your API endpoint for fetching join invitations
                const response = await axios.get(`${Backend_url}/api/v1/classes/view-all-join-invitations?id=${classId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.data && response.data.success) {
                    const invitations = response.data.data.map(invitation => ({
                        id: invitation._id,
                        member: invitation.member,
                        time: invitation.createdAt,
                        name: invitation.memberInfo.fullName,
                        email: invitation.memberInfo.email,
                        username: invitation.memberInfo.username,
                        avatar: invitation.memberInfo.avatar,
                        institute: invitation.memberInfo.institution,
                        standard: invitation.memberInfo.standard
                    }));
                    // console.log(invitations);
                    setInvitations(invitations);
                } else {
                    console.error("Error fetching join invitations:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching join invitations:", error);
            }
        };

        fetchInvitations();
        getClassInfo();
    }, []);

    const acceptInvitation = async (member) => {
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }
            const response = await axios.patch(`${Backend_url}/api/v1/classes/accept-join-invitation?id=${classId}`, {
                memberId: member
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data && response.data.success) {
                window.location.reload();
            } else {
                console.error("Error accepting invitation:", response.data.message);
            }

        } catch (error) {
            console.error("Error accepting invitation:", error);
        }
    };

    const rejectInvitation = async (member) => {
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }
            const response = await axios.patch(`${Backend_url}/api/v1/classes/reject-join-invitation?id=${classId}`, {
                memberId: member
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data && response.data.success) {
                window.location.reload();
            } else {
                console.error("Error rejecting invitation:", response.data.message);
            }
        } catch (error) {
            console.error("Error rejecting invitation:", error);
        }
    };

    const getClassInfo = async () => {
        try {
            const accessToken = getCookie("accessToken");
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }

            const response = await axios.get(
                `${Backend_url}/api/v1/classes/get-my-class-dashboard-mentor?id=${classId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.data && response.data.success) {
                const classData = response.data.data;
                const membersInfo = classData.members.map((member) => ({
                    id: member.memberInfo._id,
                    name: member.memberInfo.fullName,
                    role: member.memberInfo.role,
                    email: member.memberInfo.email,
                    avatar: member.memberInfo.avatar,
                }));
                const classInfo = {
                    _id: classData.class._id,
                    classname: classData.class.classname,
                    thumbnail: classData.class.thumbnail,
                    title: classData.class.title,
                    description: classData.class.description,
                    category: classData.class.category,
                    createdAt: classData.class.createdAt,
                    updatedAt: classData.class.updatedAt
                };
                setClassInfo({ members: membersInfo, classInfo: classInfo });
            } else {
                console.error("Error fetching class info:", response.data.message);
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching class info:", error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div
            style={{
                height: "calc(100vh - 4.3rem)",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                overflowY: "scroll",
                overflowX: "hidden",
            }}
        >
            <ClassBanner classData={classInfo?.classInfo} />
            <div className="flex flex-wrap justify-center">
                {invitations.map(invitation => (
                    <div key={invitation.id} className="max-w-xs bg-white-default rounded-md overflow-hidden shadow-lg m-10">
                        <img style={{ width: "auto", height: "auto" }} src={invitation.avatar} alt="Student Avatar" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-cyan-950 text-lg mb-2">{invitation.name}</div>
                            <p className="text-cyan-800 text-base mb-2">Institute: {invitation.institute}</p>
                            <p className="text-cyan-800 text-base mb-2">Email: {invitation.email}</p>
                            <p className="text-cyan-800 text-base mb-2">Username: {invitation.username}</p>
                            <p className="text-cyan-800 text-base mb-2">Semester: {invitation.standard}</p>
                            <p className="text-cyan-800 text-base mb-2">Time: {new Date(invitation.time).toLocaleString()}</p>
                        </div>
                        <div className="px-6 py-4 flex justify-between text-white-default">
                            <button onClick={() => acceptInvitation(invitation.member)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Accept
                            </button>
                            <button onClick={() => rejectInvitation(invitation.member)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JoinInvitations;
