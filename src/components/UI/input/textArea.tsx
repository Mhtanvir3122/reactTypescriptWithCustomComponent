import React, { useContext } from "react";
import classes from "./Input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../../store/themeContext";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  onValueChange?: (value: string) => void; // Made optional
  label?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  register?: UseFormRegisterReturn; // Made optional
  error?: any;
  isRequired?: boolean; // New prop to control required validation
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onValueChange,
  label,
  placeholder,
  containerStyle,
  inputStyle,
  register,
  error,
  isRequired = false, // Default is optional
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };
  const { t } = useTranslation();
  const themeCtx = useContext(ThemeContext);
  const isDark = themeCtx?.theme === "dark";

  return (
    <div style={containerStyle}>
      {label && (
        <h3 style={{ marginBottom: 12, color: "#36BA98" }}>
          {t(label)} {isRequired ? <span className="text-danger">*</span> : null}
        </h3>
      )}
      <div className={`${classes.form__control}`}>
        <textarea
          {...(register || {})} // Only spread register if provided
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          style={{
            padding: "8px",
            width: "100%",
            marginBottom: "10px",
            color: isDark ? "white" : "black",
            ...inputStyle,
          }}
          {...rest}
        />
      </div>
      {error && <p style={{ color: "red", marginTop: 4 }}>{error}</p>}
    </div>
  );
};

export default TextArea;
