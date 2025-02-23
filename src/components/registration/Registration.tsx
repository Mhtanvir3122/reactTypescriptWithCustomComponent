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

function Registration() {
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
      ReportService.registration({...data})
        .then((resp) => {
          navigate("/login");          
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
        <div className={classes.logo}>
          {/* <img src={images.registration} alt="digikala" /> */}
        </div>
        <h2 className={classes.title}>{t("Registration")}</h2>
        <form onSubmit={handleSubmit(logIn)} noValidate>
          <Input2
                register={register("username",)}
                label="User Name"
                type="text"
                onValueChange={(value) => setValue("username", value)} 
                placeholder="Enter User Name"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />
               <Input2
                register={register("email",)}
                label="Email"
                type="text"
                // value={"name"}
                onValueChange={(value) => setValue("email", value)}
                placeholder="Enter Email"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />
        
          <Input2
                register={register("password",)}
                label="Password"
                type="text"
                // value={"name"}
                onValueChange={(value) => setValue("password", value)}
                placeholder="Enter Password"
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
         
        </form>
      </div>

    
    </div>
  );
}

export default Registration;
