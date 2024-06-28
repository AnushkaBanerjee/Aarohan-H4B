import React ,{useState} from 'react'
import { Input } from "@nextui-org/react";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import LoginBg from "../../assets/Login/Login.png";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Image,Button } from '@nextui-org/react';

function SignupPage() {
    const [avatar, setAvatar] = useState();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div
            className="bg-cover "
            style={{ backgroundImage: `url(${LoginBg})` }}
        >
            <div className="bg-gradient-to-tr from-blue-default to-blue-teal opacity-15 blur-sm "></div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
                <div className="w-full rounded-lg  shadow-2xl shadow-blue-default sm:max-w-4xl xl:p-0 bg-grey-default bg-opacity-50 backdrop-filter backdrop-blur-lg border border-transparent border-opacity-0 my-16">
                    <div className="p-16 space-y-4 md:space-y-6 sm:p-16 ">
                        <h1 className="text-2xl text-center text-blue-dark font-inter leading-tight tracking-tight md:text-2xl">
                            Create New Account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div className='w-full text-center space-y-4'>
                                <div className='flex justify-center'>
                                    <Image
                                        isZoomed
                                        alt="NextUI Fruit Image with Zoom"
                                        src={avatar}
                                        width={240}
                                        className='mx-auto'
                                    />
                                </div>
                                <Button
                                    variant="bordered"
                                    color='primary'
                                    startContent={<CloudUploadIcon />}
                                    onClick={() => document.getElementById('avatarUpload').click()}
                                >
                                    Upload Profile Picture

                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="avatarUpload"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Input
                                    label="Name"
                                    type="text"
                                    color="primary"
                                    radius="lg"
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                                <Input
                                    label="Username"
                                    type="text"
                                    color="primary"
                                    radius="lg"
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Input
                                    label="Email"
                                    type="email"
                                    color="primary"
                                    radius="lg"
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                                <Input
                                    label="Contact Number"
                                    type="phone"
                                    color="primary"
                                    radius="lg"
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Input
                                    label="Address"
                                    type="text"
                                    color="primary"
                                    radius="lg"
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <DatePicker label="Birth date" className="w-full" color='primary'
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                                <Select
                                    label="Gender"
                                    color="primary"
                                    className="w-full"
                                    radius="lg"
                                >

                                    <SelectItem key="male" color="primary">
                                        Male
                                    </SelectItem>
                                    <SelectItem key="female" color="primary">
                                        Female
                                    </SelectItem>
                                    <SelectItem key="others" color="primary">
                                        Others
                                    </SelectItem>

                                </Select>
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>

                                <Select
                                    label="Role"
                                    color="primary"
                                    className="w-full"
                                    radius="lg"
                                >

                                    <SelectItem key="student" color="primary">
                                        Student
                                    </SelectItem>
                                    <SelectItem key="mentor" color="primary">
                                        Mentor
                                    </SelectItem>

                                </Select>

                                <Select
                                    label="Language"
                                    color="primary"
                                    className="w-full"
                                    radius="lg"
                                >

                                    <SelectItem key="bengali" color="primary">
                                        Bengali
                                    </SelectItem>
                                    <SelectItem key="english" color="primary">
                                        English
                                    </SelectItem>
                                    <SelectItem key="hindi" color="primary">
                                        Hindi
                                    </SelectItem>

                                </Select>
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>

                                <Select
                                    label="Semester"
                                    color="primary"
                                    className="w-full"
                                    radius="lg"
                                >

                                    <SelectItem key="1" color="primary">
                                        1st Semester
                                    </SelectItem>
                                    <SelectItem key="2" color="primary">
                                        2nd Semester
                                    </SelectItem>
                                    <SelectItem key="3" color="primary">
                                        3rd Semester
                                    </SelectItem>
                                    <SelectItem key="4" color="primary">
                                        4th Semester
                                    </SelectItem>
                                    <SelectItem key="5" color="primary">
                                        5th Semester
                                    </SelectItem>
                                    <SelectItem key="6" color="primary">
                                        6th Semester
                                    </SelectItem>
                                    <SelectItem key="7" color="primary">
                                        7th Semester
                                    </SelectItem>
                                    <SelectItem key="8" color="primary">
                                        8th Semester
                                    </SelectItem>

                                </Select>

                                <Input
                                    label="Instiution Name"
                                    type="text"
                                    color="primary"
                                    radius="lg"
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-fit text-white-default bg-blue-default focus:ring-4 focus:outline-none focus:bg-white-default focus:text-blue-dark focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create Account
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <p className="text-m  font-medium font-inter">
                                    Don't have an account yet?{" "}
                                    <a
                                        href="/login"
                                        className="font-medium font-inter text-blue-default hover:underline"
                                    >
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
