import React, { useEffect, useCallback } from "react";
import Banner from "../../../../../components/Global/Banner/Banner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Backend_url } from "../../../../../../BackendUrl";
import ClassBanner from "../../../../../components/Global/Banner/ClassBanner";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
];

const statusColorMap = {
  student: "success",
  mentor: "danger",
};

function Members() {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = React.useState(null);

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const getClassInfo = async () => {
    try {
      const accessToken = getCookie("accessToken");
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }

      const response = await axios.get(
        `${Backend_url}/api/v1/classes/get-my-class-dashboard-student?id=${classId}`,
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
        setClassInfo({ members: membersInfo,classInfo: classInfo });
      } else {
        console.error("Error fetching class info:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching class info:", error);
      return null;
    }
  };

  useEffect(() => {
    getClassInfo();
  }, []);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <Chip
            className="capitalize text-base"
            color={statusColorMap[user.role]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

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
      <div className="w-full bg-transparent rounded-md">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={"start"}
                className="bg-primary text-white-default text-medium"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={classInfo ? classInfo.members : []}>
            {(item) => (
              <TableRow
                key={item.id}
                className="text-blue-dark text-normal font-inter"
              >
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Members;
