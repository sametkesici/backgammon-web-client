import { useEffect, useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import "../styles/SearchBar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from '@mui/material';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "./ThemeProviderCustom";
import useMediaQuery from "@mui/material/useMediaQuery";
import useAuth from "./../hooks/useAuth";
import {
  replyFriendRequest,
  replyGameInviteRequest,
  searchUser,
} from "../api/axios";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { SocketContext } from "../context/Socket";
import Close from "@mui/icons-material/Close";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { signout } from "./../api/axios";
import { GiSwordsEmblem } from "react-icons/gi";
import NotificationMenu from "./NotificationMenu";

const pages = ["Play"];

let socket;

const ResponsiveAppBar = () => {
  const prefersMode = useMediaQuery("(prefers-color-scheme: dark)");

  const themeFromLocalStorage =
    localStorage.getItem("theme1") != null
      ? JSON.parse(localStorage.getItem("theme1"))
      : prefersMode
      ? "dark"
      : "light";

  const { theme, setTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const username = JSON.parse(localStorage.getItem("username"));

  const [gameInviteCounter, setGameInviteCounter] = useState(-1);
  const [friendNotificationList, setFriendNotificationList] = useState([]);
  const { auth, setAuth } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [mode, setMode] = useState(themeFromLocalStorage);
  const [invisible, setInvisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notificationCounter, setNotificationCounter] = useState(-1);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [anchorElUserNotification, setAnchorElUserNotification] =
    useState(null);

  const [anchorElGameInviteNotification, setAnchorElGameInviteNotification] =
    useState(null);
  const [gameInviteList, setGameInviteList] = useState([]);

  const { friendShipSocket, onlineUserSocket, gameInviteSocket } =
    useContext(SocketContext);

  useEffect(() => {
    onlineUserSocket.on("", (response) => {
      setOnlineUsers(response);
      return () => {
        onlineUserSocket.off();
      };
    });
  }, []);

  useEffect(() => {
    friendShipSocket.on(`${username}`, (response) => {
      setFriendNotificationList((prevState) => [...prevState, response]);
      console.log(response);
      return () => {
        friendShipSocket.off(`${username}`);
      };
    });
  }, []);

  useEffect(() => {
    gameInviteSocket.on(`${username}`, (response) => {
      setGameInviteList((prevState) => [...prevState, response]);
      console.log(response);
      return () => {
        gameInviteSocket.off(`${username}`);
      };
    });
  }, []);

  useEffect(() => {
    setNotificationCounter(notificationCounter + 1);
  }, [friendNotificationList]);

  useEffect(() => {
    setGameInviteCounter(gameInviteCounter + 1);
  }, [gameInviteList]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode == "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setTheme(mode);
    localStorage.setItem("theme1", JSON.stringify(mode));
  }, [mode]);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const signoutOnClick = () => {
    signout();
    localStorage.removeItem("username");
    navigate("/");
    navigate(0);
  };

  async function fetchData() {
    const response = await searchUser(value);
    let result = response.data.filter((o1) =>
      onlineUsers.some((o2) => o1 === o2)
    );
    console.log(result);
    setData(response.data);
  }

  useEffect(() => {
    if (value.length > 2) {
      fetchData();
    }
  }, [value]);

  const redirectUserProfile = (event) => {
    const redirectUser = event.target.innerText;
    navigate(`/@/${redirectUser}`);
  };

  const acceptFriendRequest = (friendName) => {
    replyFriendRequest({ friendName, friendShipStatus: "APPROVED" });
  };

  const rejectFriendRequest = (friendName) => {
    replyFriendRequest({ friendName, friendShipStatus: "REJECTED" });
  };

  const acceptGameInvite = async (username) => {
    const response = await replyGameInviteRequest({
      opponentUsername: username,
      gameStatus: "ACTIVE",
    });

    let gameUrl = response.data.url;

    navigate(`/:${gameUrl}`, {
      state: {
        username,
      },
    });
  };

  const rejectGameInvite = (username) => {
    replyGameInviteRequest({
      opponentUsername: username,
      gameStatus: "REJECTED",
    });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserNotificationMenu = (event) => {
    setAnchorElUserNotification(event.currentTarget);
  };

  const handleCloseUserNotificationMenu = () => {
    setAnchorElUserNotification(null);
  };

  const handleOpenGameInviteMenu = (event) => {
    setAnchorElGameInviteNotification(event.currentTarget);
  };

  const handleCloseGameInviteMenu = () => {
    setAnchorElGameInviteNotification(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Stack spacing={1} sx={{ width: 220 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data
                .filter((item) => {
                  const searchTerm = value.toLowerCase();
                  const userName = item.userName.toLowerCase();
                  return searchTerm && userName.startsWith(searchTerm);
                })
                .slice(0, 10)
                .map((item) => item.userName)}
              onChange={redirectUserProfile}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {onlineUsers.includes(option) ? (
                    <CircleIcon
                      sx={{ fontSize: 9, mr: 1 }}
                      color="success"
                    ></CircleIcon>
                  ) : (
                    <CircleOutlinedIcon
                      sx={{ fontSize: 9, mr: 1 }}
                    ></CircleOutlinedIcon>
                  )}
                  {option}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  size="small"
                  color="secondary"
                  onChange={onChange}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Stack>

          <Box></Box>

          <Box sx={{ flexGrow: 0, ml: 3, mr: 1 }}>
            <Tooltip title="Challange">
              <IconButton onClick={handleOpenGameInviteMenu}>
                <Badge
                  color="secondary"
                  fontSize="inherit"
                  badgeContent={gameInviteCounter}
                  invisible={invisible}
                >
                  <GiSwordsEmblem fontSize="inherit" />
                </Badge>
              </IconButton>
            </Tooltip>
            <NotificationMenu
              anchorEl={anchorElGameInviteNotification}
              handleCloseMenu={handleCloseGameInviteMenu}
              data={gameInviteList}
              text="oyun istegi geldi"
              acceptRequest={acceptGameInvite}
              rejectRequest={rejectGameInvite}
            />

            <Tooltip title="Notification">
              <IconButton
                onClick={handleOpenUserNotificationMenu}
                sx={{ ml: 2 }}
              >
                <Badge
                  color="secondary"
                  fontSize="inherit"
                  badgeContent={notificationCounter}
                  invisible={invisible}
                >
                  <NotificationsIcon fontSize="inherit" />
                </Badge>
              </IconButton>
            </Tooltip>
            <NotificationMenu
              anchorEl={anchorElUserNotification}
              handleCloseMenu={handleCloseUserNotificationMenu}
              data={friendNotificationList}
              text="arkadaslik istegi gonderildi"
              acceptRequest={acceptFriendRequest}
              rejectRequest={rejectFriendRequest}
            />
          </Box>

          {username ? (
            <Box sx={{ flexGrow: 0, pl: "15px" }}>
              <Tooltip title="Open settings">
                <MenuItem onClick={handleOpenUserMenu}>
                  <Typography textAlign="center">{username}</Typography>
                </MenuItem>
              </Tooltip>
              <Menu
                sx={{ mt: "5px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography>Prefences</Typography>
                </MenuItem>
                <MenuItem onClick={signoutOnClick}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography>Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, pl: "15px" }}>
              <Button variant="outlined" href="/login">
                Login
              </Button>
            </Box>
          )}
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
