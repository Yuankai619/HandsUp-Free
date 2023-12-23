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
    const location = useLocation();
    const ClassID = location.pathname.split('/')[2];
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
    //test Data
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
    // loadALL
    
    //fetch class data
    // useEffect(() => {
    //     const fetchClassData = async () => {
    //         try {
    //             const response = await axios({
    //                 method: 'get',
    //                 url: 'http://localhost:4000/course/getClass',
    //                 withCredentials: true
    //             });
    //             const modifiedData = response.data.map(item => ({//加入id
    //                 ...item,
    //                 id: parseInt(item.classID)
    //             }));
    //             console.log("sd;", modifiedData);
    //             setCreatedClassData(modifiedData);
    //         } catch (error) {
    //             console.error('Error fetching class data:', error);
    //         }
    //     };
    //     fetchClassData();
    // }, []);
    // //

    const [messageData, setMessageData] = useState([
        { id: 1, isAnonymous: false, messageID: "001", username: "Yuankai", selected: "null", content: "可出田者吃裏的。候南活蛋，根給羽封追禾抱怕木游北棵秋很申勿美，快見魚樹升自衣汁背風也高日休乍：毛裝扒不品祖奶冰虎背同要次路跳！那尺或老子幫功拉比：弓想止「流」門扒鳥久。" },
        { id: 2, isAnonymous: true, messageID: "002", username: "BOB", selected: "null", content: "少生不會寺許送房，風來可北几玉冰麼土個急枝貫戶掃童化，現根旁杯追樹見，星父父快雄次園氣面書壯民做麻怪河園？世連買她天怎紅和食邊植正、做節皮樹雨民我玩經！辛冒時平游。" },
        { id: 3, isAnonymous: false, messageID: "003", username: "Python", selected: "null", content: "飯布羽飯久兆卜科二內打姐休姊斗造平、後方給肉新娘昔米片也即抓個世左放點做定沒：朱反空奶收斤草語？耳就半。更息已媽。" }
    ]);
    //fetch message data
    // useEffect(() => {
    //     const fetchMessageData = async () => {
    //         try {
    //             const response = await axios({
    //                 method: 'get',
    //                 url: 'http://localhost:4000/course/getMessage',
    //                 withCredentials: true
    //             });
    //             setMessageData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching class data:', error);
    //         }
    //     };
    //     fetchMessageData();
    // }, []);
    // setMessageData([
        
    // ]);



    return (
        <div style={{ padding: 0, margin: "0px" }}>
            <StreamAppBar data={data} />
            <div style={{ paddingTop: '70px' }}>
                <Container sx={{ position: 'fixed', height: 'calc(100vh - 252px)', overflow: "auto", px: "0px" }} maxWidth="100%">
                    {messageData.map((data) => (
                        <StreamEditorMessageCard
                            key={data.id}
                            data={data}
                        />
                    ))}
                </Container>
            </div>

            <StreamInputPanel classID={ClassID} />
        </div>
    );

}
export default Discussion;
