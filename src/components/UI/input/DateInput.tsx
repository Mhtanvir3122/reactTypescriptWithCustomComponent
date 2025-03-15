import React, { useContext } from "react";
import classes from "./Input.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ThemeContext from "../../../store/themeContext";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onValueChange?: (value: string) => void; // Made optional
  label?: string;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  register?: UseFormRegisterReturn; // Made optional
  error?: any;
  isRequired?: boolean; // Controls mandatory validation
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onValueChange,
  label,
  containerStyle,
  inputStyle,
  register,
  error,
  isRequired = false,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <input
          type="date"
          {...(register || {})} // Only spread register if provided
          value={value}
          onChange={handleChange}
          style={{
            padding: "8px",
            width: "100%",
            marginBottom: "10px",
            color: isDark ? "white" : "black",
            backgroundColor: isDark ? "#333" : "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            ...inputStyle,
          }}
          {...rest}
        />
      </div>
      {error && <p style={{ color: "red", marginTop: 4 }}>{error}</p>}
    </div>
  );
};

export default DatePicker;
