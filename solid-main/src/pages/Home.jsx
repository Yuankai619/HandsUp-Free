import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import JoinedClassCardContainer from '../components/JoinedClassContainer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DialpadIcon from '@mui/icons-material/Dialpad';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`swipeable-tabpanel-${index}`}
      aria-labelledby={`swipeable-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}

        </Box>
      )}
    </div>
  );
}


const HomePagePanelTheme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
  components: {
    
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: { 
          backgroundColor: '#000000', 
        },
        root: {
          position:'relative',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingBottom: '10px', 
        }
        
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#999999",
          fontWeight: 'bold',
          fontSize: '15px',
          '&.Mui-selected': {
            color: '#EEEEEE',
          },
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        variant: 'fullWidth', 
      },
      styleOverrides: {
        root: {
          width: '100%', 
          '.MuiTabs-indicator': {
            backgroundColor: '#EEEEEE', 
          },
          
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        root: {
          // 根元素的样式
          // '& .MuiSpeedDialIcon-icon': { fontSize: '5rem' },
          [`@media (max-width:601px)`]: { 
              right:"20px",
          },
          [`@media (min-width:601px)`]: { 
              right:"55px",
          },
          position: 'absolute', 
          bottom: '82px',
        },
        fab: {
          // 悬浮按钮的样式
          backgroundColor: '#2D6CB6', 
          width: '60px',
          height: '60px',
        },
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        fab: {
          '&:hover': {
            // 鼠标悬停的背景颜色
            backgroundColor: '#2D6CB6',
          },
          '&.Mui-selected': {
            // 选中（点击）状态的背景颜色
            backgroundColor: 'purple',
          },
          '&.Mui-focusVisible': {
            // 聚焦时的背景颜色
            backgroundColor: 'orange',
          },
          backgroundColor: '#2D6CB6', 
          // '&:click': {
          //   backgroundColor: 'darkgreen', // 设置鼠标悬停时的背景颜色
          // },
          
          width: '54px',
          height: '54px',
        }
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'black', // 工具提示背景颜色
          color: 'white', // 工具提示文字颜色
        },
      },
    },
  }
});


function Home() {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []); 
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  const [open, setOpen] = useState(false);

  const handleClickSpeedDial = () => {
    setOpen(!open); // 切换 SpeedDial 的打开/关闭状态
  };
  const handleClose = () => setOpen(false);
  const handleActionClick = (event) => {
    // 阻止事件冒泡
    event.stopPropagation();
    console.log("Action clicked");
  };
  const actions = [
    { icon: <DialpadIcon />, name: 'Join by ID' },
   
  ];
  return (
    <ThemeProvider theme={HomePagePanelTheme}>
      <Box sx={{ backgroundColor: '#444444' }}>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
              {/* 可以添加更多的列表项 */}
            </List>
          </Box>
        </Drawer>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ height: 'calc(100vh - 64px)' }}//讓空白處也可以滑動
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <JoinedClassCardContainer></JoinedClassCardContainer>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <JoinedClassCardContainer></JoinedClassCardContainer>
          </TabPanel>
        </SwipeableViews>
        <SpeedDial
          ariaLabel="SpeedDial"
          icon={<SpeedDialIcon />}
          open={open}
          onClick={handleClickSpeedDial} // 控制打开/关闭
        >
          {actions.map((action) => (
            <SpeedDialAction
              
              key={action.name}
              icon={action.icon}
              onClick={handleActionClick}
              // onClick={handleClose}
              // tooltipTitle={action.}
              tooltipTitle={action.name}
              // tooltipTitle=""
              // tooltipOpen={open}
              // FabProps={{
              //   children: (
              //     <Tooltip fontSize='5px' placement="left">
              //       <GroupAddIcon />
              //     </Tooltip>
              //   ),
              // }}
            />
          ))}
        </SpeedDial>
        <AppBar>
          <Toolbar p={0}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ flexGrow: 0 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="full width tabs"
              >
                <Tab label="Joined Class" />
                <Tab label="Created Class" />
              </Tabs>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
export default Home;