import React from 'react'
import { toast } from "react-toastify";
import { useEffect } from "react";
import useStore from '../../store';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const {access_token}=useStore();
  const navigate=useNavigate();
  useEffect(()=>{
    if (!access_token) {
      toast.warn("you are not logged in!");
      navigate("/login");
    }
  },[]);
  return <div>Dashboard</div>
}

export default Dashboard