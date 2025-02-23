import React, { useContext, useEffect, useRef, useState } from "react";

import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ReportService } from "../../service/service";
import { useForm } from "react-hook-form";
import Input2 from "../UI/input/Input2";

function ForgotPass() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();


 const {
    register,
    handleSubmit,
    setValue,
  
  } = useForm();

  const logIn = (data:any) => {
      ReportService.forgotPass({...data})
        .then((resp) => {
          // loginCtx.toggleLogin();
          navigate("/");          
        })
        .catch((err) => {
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
        })
      
    };



  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "bn" ? classes.rtl : ""
      }`}
    >
      <div className={classes.loginBox}>
        {/* <div className={classes.logo}>
          <img src={images.logo} alt="digikala" />
        </div> */}
        <h2 style={{fontSize:35}} className={classes.title}>{t("Change Password")}</h2>
        <form onSubmit={handleSubmit(logIn)} noValidate>
          <Input2
                register={register("email",)}
                label="Email"
                type="text"
                onValueChange={(value) => setValue("email", value)}
                placeholder="Enter Email"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />
        
          <Input2
                register={register("newPassword",)}
                label="New Password"
                type="text"
                // value={"name"}
                onValueChange={(value) => setValue("newPassword", value)}
                placeholder="Enter New Password"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />
          <span  ref={errorMessageRef} className={classes.errorMessage}>
            {t("notMatch")}
          </span>
          <Button type="submit">{t("Submit")}</Button>
          <br />

          <Link className={classes.forgat_pass} to="/login">
            {t("Back")}
          </Link>
          {/* <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>

          </div> */}
        </form>
      </div>

      {/* <div className={classes.keyPic}>
        <div className="p-9">
        <img
          src={require("../../assets/images/22.jpg")}
          alt="illustrator key"
        />
        </div>
      </div> */}
    </div>
  );
}

export default ForgotPass;
