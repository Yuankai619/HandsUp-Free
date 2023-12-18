import React, { useState, useEffect } from "react";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import SignupButton from "../components/SignupButton";
import CheckboxStatement from "../components/CheckboxStatement";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// deerufin
import axios from 'axios';
// deerufin


function SignupPage() {
    console.log("turn");
    useEffect(() => {
        document.body.style.background = "#222222";
        document.body.style.overflow = '';
        return () => {
            document.body.style.background = "";
            document.body.style.overflow = '';
        };
    }, []);
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [realName, setRealName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmpasswordError, setConfirmpasswordError] = useState(false);
    const [realnameError, setRealnameError] = useState(false);
    const [studentIdError, setStudentIdError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(`haha`)
        // 確保密碼和確認密碼相同
        if (String(password) !== String(confirmPassword)) {
            setConfirmpasswordError(true);
            return;
        } else {
            setConfirmpasswordError(false);
        }
        axios({
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                username: username,
                password: password,
                realname: realName,
                studentID: studentId,
                email: email
            }),
            withCredentials: true,
            url: "http://localhost:4000/register"
        })
            .then((res) => {
                console.log('res data = ', res.data)

                navigate('/login');

            });
    };


    const curtheme = useTheme();
    const isMobile = useMediaQuery(curtheme.breakpoints.down('sm'));
    const isPad = useMediaQuery(curtheme.breakpoints.down('md'));
    const boxGap = "45px";
    return (
        <Box backgroundColor="#222222" height={"100%"}>
            <Container maxWidth="sm" sx={{ py: "55px", px: isMobile ? "45px" : (isPad ? "144px" : "360px") }}>
                <Box my={boxGap}>
                    <h1 className="signup-panel-title" sx={{}}>Profile</h1>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                    <Avatar
                        src={selectedImage}
                        sx={{ width: 120, height: 120, marginBottom:'20px'}}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera style={{color:"#EEEEEE"}}/>
                        </IconButton>
                    </label>
                </Box>
                <Box my={boxGap}>
                    <InputText
                        id="username"
                        iserror={usernameError} errorText={"error"} isrequired={true} label="username"
                        onChange={(e) => setUsername(e.target.value)}
                    ></InputText>
                </Box>
                <Box my={boxGap}>
                    <InputText
                        id="real name"
                        iserror={realnameError} errorText={"error"} isrequired={true} label="real name"
                        onChange={(e) => setRealName(e.target.value)}
                    ></InputText>
                </Box>
                <Box my={boxGap}>
                    <InputText
                        id="sutdent ID"
                        iserror={studentIdError} errorText={"error"} isrequired={true} label="student ID"
                        onChange={(e) => setStudentId(e.target.value)}
                    ></InputText>
                </Box>

                {/* <Box my={boxGap}>
                    <CheckboxStatement
                        id="accept Term"
                        statement="I accept the terms and privacy policy"
                        onChange={(e) => setIsTermsAccepted(e.target.value)}
                    ></CheckboxStatement>
                </Box> */}
                <Box sx={{ my: "60px", px: "40px" }}>
                    <SignupButton
                        id="confirm info"
                        innertext="Confirm"
                        onClick={()=>navigate('/home')}
                    ></SignupButton>
                </Box>
            </Container>
        </Box>
    );
}

export default SignupPage;

