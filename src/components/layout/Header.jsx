import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy } from "react";
import { orange } from "../../Constants/Color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { server } from "../../Constants/config";
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../Specific/Search"));
const NotificationDIalog = lazy(() => import("../Specific/Notifications"));
const NewGroupDialog = lazy(() => import("../dialogs/NewGroup"));
const Header = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  
  
 
  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearchDiloge = () => {
    dispatch(setIsSearch(true));
  };

  const opennewGroup = () => {
     dispatch(setIsNewGroup(true));
  };

  const OpenNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };
  
 

  const Logouthandler = async() => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }

  };
  

  const navigateToGroup = () => navigate("/groups");
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"} >
        <AppBar
          position="static"
          sx={{
            /// bgcolor: "rgba(0,0,0)",
            
             bgcolor:orange,
            //bgcolor:"#d6536d"
          }}
        >
          <Toolbar>
            <Typography
              variant="h4"
              sx={{
                display: { xs: "none", sm: "block" },
                marginTop: "0.3rem",
                
              }}
            >
              {" "}
              Chatty{" "}
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <Tooltip title="Search people">
                {/* <TextField
                  variant="outlined"
                  placeholder="Search users"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '30px',
                      padding: '0px 2px',
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"> */}
                        <IconButton
                          color="inherit"
                          size="large"
                          onClick={openSearchDiloge}
                        >
                          <SearchIcon />
                        </IconButton>
                      {/* </InputAdornment>
                    ),
                  }}
                /> */}
              </Tooltip>

              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={opennewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Manage Group">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={navigateToGroup}
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Notification">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={OpenNotification}
                >  

                  {
                    notificationCount?<Badge badgeContent={notificationCount} sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: 'red',
                        color: 'white', // Optional: change text color to white for better visibility
                      },
                    }}> <NotificationIcon /></Badge>: <NotificationIcon />
                  }
                 
                </IconButton>
              </Tooltip>

              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={Logouthandler}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDIalog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;