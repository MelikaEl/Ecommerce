// import React from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getUserInfoWithTokenApi from "../../utils/apis/users/getUserInfoWithTokenApi";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/common/Header/Header";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DashboardSkeleton from "../../components/skeleton/DashboardSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";
import { removeCookie } from "../../utils/helpers/cookie";
import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = () => {
  const { access_token, removeState } = useStore();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfoWithTokenApi(),
    enabled: access_token != null && access_token != undefined,
  });
  // useEffect(()=>{
  //   if (!access_token) {
  //     toast.warn("you are not logged in!");
  //     navigate("/login");
  //   }
  // },[]);
  console.log(data);

  const handleLogout = () => {
    removeCookie("credential");
    removeState();
    toast.warn("logged out successfully, redirecting to login page...");
    setTimeout(() => navigate("/login"), 1000); //navigate to the login page after 1 second
  };

  return (
    <div>
      <Header/>
      {access_token != null && access_token != undefined ? (
        <>
          {isPending && <DashboardSkeleton />}
          {error && <ErrorOnFetchApi />}
          {data && (
            <>
              <ListItem alignItems="flex-start">
                <div className="w-[10rem] pe-4 ">
                  <img
                    alt="profile image"
                    src={data?.data?.avatar}
                    className="rounded-full"
                  />
                </div>

                <ListItemText
                  primary={
                    <p className="font-bold">{`welcome, ${data?.data?.email} !`}</p>
                  }
                  secondary={
                    <div className="flex flex-col gap-4 mt-4">
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          name &nbsp; : &nbsp;
                        </Typography>
                        {data?.data?.name}
                      </div>{" "}
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          role &nbsp; : &nbsp;
                        </Typography>
                        {data?.data?.role}
                      </div>{" "}
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          password &nbsp; : &nbsp;
                        </Typography>
                        {data?.data?.password}
                      </div>{" "}
                    </div>
                  }
                />
              </ListItem>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-slate-50 rounded-md px-4 py-2 ms-4 flex items-center gap-2"
              >
                <span>Logout</span>
                <LogoutIcon />
              </button>
            </>
          )}
        </>
      ) : (
        <Link className="underline" to="/login">
          only logged in users can access
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
