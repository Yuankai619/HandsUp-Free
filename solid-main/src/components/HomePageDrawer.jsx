import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ThemeProvider } from '@mui/material/styles';
import HomePageDrawerTheme from '../themes/HomePageDrawerTheme';
import { useNavigate } from "react-router-dom";
// deerufin
import axios from 'axios';
// deerufin
function HomePageDrawer({ clickLogout ,...props}) {
    const [imgUrl, setImgUrl] = useState('');
    const [usernameUrl, setusernameUrl] = useState('');
    const [studentIdUrl, setstudentIdUrl] = useState('');
    useEffect(() => {
        console.log('s')
        GetUserInfo();
    }, []);
    const GetUserInfo = async () => {
        axios({
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },  
          withCredentials: true,
          url: "http://localhost:4000/api/getUserInfo"
        })  
        .then((res) =>{
            
            console.log(res.data);
            
            setImgUrl(res.data.thumbnail);
            setusernameUrl(res.data.username);
            setstudentIdUrl(res.data.studentID);
        })
        .catch((error) => {
          
        });
    };
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={HomePageDrawerTheme}>
            <Drawer open={props._drawerOpen} onClose={props._toggleDrawer(false)}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '250px',
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <List>
                            <ListItem>
                                <Avatar  src={imgUrl} style={{ marginRight: '22px', width: '50px', height: '50px' }} /> 
                                <Box>
                                    <Typography style={{ fontSize: "18px", fontWeight: "bold" }} >{usernameUrl}</Typography>
                                    <Typography style={{ fontSize: "12px", color: "#999999" }}>ID: {studentIdUrl}</Typography>
                                </Box>
                            </ListItem>
                            <ListItemButton>
                                <ListItemIcon><HomeIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Home" onClick={() => navigate('/home')}/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><SettingsIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Setting" onClick={() => navigate('/profile')} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><BarChartIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Statistics" />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box>
                        <List>
                            <ListItemButton onClick={clickLogout}>
                                <ListItemIcon><ExitToAppIcon style={{ color: "#EEEEEE" }} /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

        </ThemeProvider>
    );
}
export default HomePageDrawer;