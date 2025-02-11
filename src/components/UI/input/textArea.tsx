import React, { useContext } from "react";
import classes from "./Input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../../store/themeContext";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onValueChange: (value: string) => void;
  label?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  register: UseFormRegisterReturn;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onValueChange,
  label,
  placeholder,
  containerStyle,
  inputStyle,
  register,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange(e.target.value);
  };
  const { t } = useTranslation();
  const themeCtx = useContext(ThemeContext);

  const isdark= themeCtx?.theme==="dark"


  return (
    <div>
    <h3 style={{marginBottom:12,color:"#36BA98"}}>{t(`${label}`)}</h3>

    <div className={`${classes.form__control} ${classes}`}>

      <textarea
        {...register}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ padding: "8px", width: "100%", marginBottom: "10px", ...inputStyle  ,         color:isdark?"white":"black"
        }}
        {...rest}
      />
      </div>
    </div>
  );
};

export default TextArea;
