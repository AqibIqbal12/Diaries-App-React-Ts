import React, { FC } from 'react';
import Diaries from '../diary/Diaries';


import AppBar from "@material-ui/core/AppBar";
import { makeStyles} from '@material-ui/core';
import { useSelector } from "react-redux";
import { RootState } from '../../rootReducer';


const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  

}));


const Home: FC = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <div>  
          <p style={{fontSize:"20px"}}>Welcome: <span style={{fontWeight:"bold"}}>{isLoggedIn && user?.username}</span></p>
        </div>
      </AppBar>
      <div>
      <Diaries />
      </div>
      {/* <div className="two-cols">
        <div className="left">
          <Diaries />
        </div>
        <div className="right">
          <Editor />
        </div>
      </div> */}
    </>
  )
};

export default Home;
