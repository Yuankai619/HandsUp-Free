import React, { useState, useEffect } from 'react';
import StreamInputPanel from '../components/StreamInputPanel';
import StreamAppBar from '../components/StreamAppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useLocation } from 'react-router-dom';
import LoginChecker from '../checker/LoginChecker';
import { useNavigate } from 'react-router-dom';
import StreamEditorMessageCard from '../components/StreamEditorMessageCard';
function Discussion() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginCheckComplete, setIsLoginCheckComplete] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const result = await LoginChecker();
            setIsLoggedIn(result.isLoggedIn);
            setIsLoginCheckComplete(true);
            if (result.redirectTo) {
                navigate(result.redirectTo);
            }
        };
        document.body.style.overflow = 'hidden';
        document.body.style.background = "#222222";
        checkLogin();
        return () => {
            console.log('return');
            // document.body.style.background = '';
            document.body.style.overflow = '';
        };
    }, []);
    //測試discussionData
    const data = {
        id: 1,
        title: "Card1",
        infoData: {
            "classID": "001",
            "state": "close",
            "ownerID": "1234556",
            "creat date": "2021/10/10",
            "description": "this is a description"
        }
    };
    const location = useLocation();
    const ClassID = location.pathname.split('/')[2];
    console.log("roomID:",ClassID);
    // const pageData = data.find(item => item.discussionName === discussionName);
    // console.log(data);
    return (
        // <Container sx={{ backgroundColor: '#444' }}>
        <div style={{padding:0 , margin:"0px"}}>  
            <StreamAppBar data={data} />
            <div style={{paddingTop:'70px'}}>
                <Container sx={{ position: 'fixed', height: 'calc(100vh - 252px)', overflow: "auto", px: "0px" }} maxWidth="100%">

                    <StreamEditorMessageCard  />
                    <StreamEditorMessageCard />
                    <StreamEditorMessageCard />
                    <StreamEditorMessageCard />
                    <StreamEditorMessageCard />
                    <StreamEditorMessageCard />
                    <StreamEditorMessageCard />
                </Container>
            </div>

            <StreamInputPanel />
        </div>
        // </Container>
    );

}
export default Discussion;
