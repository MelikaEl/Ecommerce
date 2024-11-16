// import React from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getUserInfoWithTokenApi from "../../utils/apis/users/getUserInfoWithTokenApi";
import { useQuery } from "@tanstack/react-query";

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  const { access_token } = useStore();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfoWithTokenApi(),
    enabled: access_token != null && access_token != undefined
  });
  // useEffect(()=>{
  //   if (!access_token) {
  //     toast.warn("you are not logged in!");
  //     navigate("/login");
  //   }
  // },[]);
  console.log(data)
  return (
    <div>
      {access_token != null && access_token != undefined ? (
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
         <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
           </ListItemAvatar>
           <ListItemText
             primary="Brunch this weekend?"
             secondary={
               <React.Fragment>
                 <Typography
                   component="span"
                   variant="body2"
                   sx={{ color: 'text.primary', display: 'inline' }}
                 >
                   Ali Connors
                 </Typography>
                 {" — I'll be in your neighborhood doing errands this…"}
               </React.Fragment>
             }
           />
         </ListItem>
         <Divider variant="inset" component="li" />
         <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
           </ListItemAvatar>
           <ListItemText
             primary="Summer BBQ"
             secondary={
               <React.Fragment>
                 <Typography
                   component="span"
                   variant="body2"
                   sx={{ color: 'text.primary', display: 'inline' }}
                 >
                   to Scott, Alex, Jennifer
                 </Typography>
                 {" — Wish I could come, but I'm out of town this…"}
               </React.Fragment>
             }
           />
         </ListItem>
         <Divider variant="inset" component="li" />
         <ListItem alignItems="flex-start">
           <ListItemAvatar>
             <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
           </ListItemAvatar>
           <ListItemText
             primary="Oui Oui"
             secondary={
               <React.Fragment>
                 <Typography
                   component="span"
                   variant="body2"
                   sx={{ color: 'text.primary', display: 'inline' }}
                 >
                   Sandra Adams
                 </Typography>
                 {' — Do you have Paris recommendations? Have you ever…'}
               </React.Fragment>
             }
           />
         </ListItem>
       </List>
      ) : (
        <Link className="underline" to="/login">
          only logged in users can access
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
