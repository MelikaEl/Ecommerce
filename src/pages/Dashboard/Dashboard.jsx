// import React from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getUserInfoWithTokenApi from "../../utils/apis/users/getUserInfoWithTokenApi";
import { useQuery } from "@tanstack/react-query";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const { access_token } = useStore();
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
  return (
    <div>
      {access_token != null && access_token != undefined ? (
        <>
          {isPending && <p>loading data...</p>}
          {error && <p>error occured!</p>}
          {data && (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="profile image" src={data?.data?.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
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
