import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../interfaces/user.interface";
import * as Yup from "yup";
import http from "../../services/api";
import { saveToken, setAuthState } from "./authSlice";
import { setUser } from "./userSlice";
import { AuthResponse } from "../../services/mirage/routes/user";
import { useAppDispatch } from "../../store";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({

  auth: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection: "column",
    //backgroundColor:"green",
    //backgroundImage: "url(/images/bg.jpg)",
    // backgroundRepeat:"no-repeat",
    // backgroundPosition: "center",
    // backgroundSize: "100% 100%",
    position: "relative",
    //zIndex:1,

    "&::after": {
      //backgroundImage: "url(/images/bg.jpg)",
      position: "absolute",
      height: "inherit",
      width: "100%",
      opacity: "0.5",
      content: "''",
      backgroundImage: "url(/images/bg.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100% 100%",
      zIndex: -1,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#778899",

  },
  card: {
    background: "#fff",
    padding: "3rem",
    textAlign: "center",
    boxShadow: "2px 8px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "450px",
    width: "90%",
    margin: "0 auto",
  }
}));

const schema = Yup.object().shape({
  username: Yup.string()
    .required("What? No username?")
    .max(16, "Username cannot be longer than 16 characters"),
  password: Yup.string().required('Without a password, "None shall pass!"'),
  email: Yup.string().email("Please provide a valid email address (abc@xy.z)"),
});

const Auth: FC = () => {

  const { auth, card, avatar } = useStyles();

  const { handleSubmit, register, errors } = useForm<User>({
    validationSchema: schema,
  });

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const submitForm = (data: User) => {
    console.log(data)

    const path = isLogin ? "/auth/login" : "/auth/signup";
    http.post<User, AuthResponse>(path, data)
      .then((res) => {
        if (res) {
          const { user, token } = res;
          dispatch(saveToken(token));
          dispatch(setUser(user));
          dispatch(setAuthState(true));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (

    <div className={auth}>
      {/* <h1 style={{ textTransform: "uppercase" }}>Dear Diary</h1> */}
      <Avatar className={avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h5" variant="h5">
        {isLogin ? "Log in" : "Create Account"}
      </Typography>
      <div className={card}>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="inputWrapper">
            <input ref={register} name="username" placeholder="Username" />
            {errors && errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="inputWrapper">
            <input ref={register} name="password" type="password" placeholder="Password" />
            {errors && errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          {!isLogin && (
            <div className="inputWrapper">
              <input ref={register} name="email" placeholder="Email (optional)" />
              {errors && errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>
          )}
          <div className="inputWrapper">
            <button type="submit" disabled={loading}>
              {isLogin ? 'Login' : 'Create account'}
            </button>
          </div>
          <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', opacity: 0.7 }}>
            {isLogin ? 'No account? Create one' : 'Already have an account?'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;