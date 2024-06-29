import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../components/Auth/EyeFilledIcon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/Auth/EyeSlashFilledIcon/EyeSlashFilledIcon";
import LoginBg from "../../assets/Login/Login.png";
import { Backend_url } from "../../../BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage("");
    setErrorMessage("");
    setIsError(false);
    setOpenSnack(false);
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Backend_url}/api/v1/users/login`,
        {
          email: email,
          password: password,
        }
      );
      document.cookie = `accessToken=${response.data.data.accessToken}; path=/;`;
      document.cookie = `refreshToken=${response.data.data.refreshToken}; path=/;`;
      if (response?.data.data.user.role === "student" || response?.data.data.user.role === "mentor") {
        setSuccessMessage("Login successful");
        setIsError(false);
        setOpenSnack(true);
        
        setTimeout(() => {
          if (response.data.data.user.role === "student") {
            navigate("/Student/Home");
          } else if (response.data.data.user.role === "mentor") {
            navigate("/Mentor/Home");
          }
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMessage("User not found, Please sign up first");
      } else if (error.response?.status === 401) {
        setErrorMessage("Wrong email or password");
      } else {
        setErrorMessage("Server error. Please try again later");
      }
      setIsError(true);
      setOpenSnack(true);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className="bg-cover h-screen"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
    <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert
          onClose={handleClose}
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isError ? errorMessage : successMessage}
        </Alert>
      </Snackbar>
      <div className=" bg-gradient-to-tr from-blue-default to-blue-teal opacity-15 blur-sm"></div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-4/6 mt-40 rounded-lg  shadow-2xl shadow-blue-default md:mt-0 sm:max-w-md xl:p-0 bg-grey-default bg-opacity-50 backdrop-filter backdrop-blur-lg border border-transparent border-opacity-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl text-center text-blue-dark font-inter leading-tight tracking-tight md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
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
                label="Password"
                color="primary"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-blue-500 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-blue-500 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                required
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
                    "group-data-[focus=true]:bg-white-200/50",
                    "!cursor-text",
                  ],
                }}
              />
              <div className="flex justify-center">
                <button
                  onClick={(e) => signIn(e)}
                  type="submit"
                  className="w-fit text-white-default bg-blue-default focus:ring-4 focus:outline-none focus:bg-white-default focus:text-blue-dark focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
              </div>
              <div className="flex justify-center">
                <p className="text-m  font-medium font-inter">
                  Don’t have an account yet?{" "}
                  <a
                    href="/Signup"
                    className="font-medium font-inter text-blue-default hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
