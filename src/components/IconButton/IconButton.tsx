import React from 'react';
import "./style.scss"
type IColors = 'primary' | 'secondary' | 'success' | 'danger' | string;

export interface IButtonProps {
  color?: IColors;
  variant?: 'fill' | 'outline' | 'light' | null;
  type?: 'submit' | 'button' | 'reset';
  isDisabled?: boolean;
  className?: string;
  onClick?: (() => void) | void;
  hoverTitle?: string;
  iconName: string;
  iconColor?: IColors;
  iconSize?: number;
  iconVariant?: 'outlined' | 'filled' | 'round' | 'sharp' | 'two-tone';
  rounded?: 'circle' | 'pill' | false;
}

const IconButton: React.FC<IButtonProps> = React.memo(
  ({
    color = 'primary',
    variant = 'fill',
    type = 'button',
    isDisabled = false,
    className = '',
    onClick,
    hoverTitle = '',
    iconName,
    iconColor = 'inherit',
    iconSize = 24,
    iconVariant = 'filled',
    rounded = false,
  }: IButtonProps) => {
    // Determine button styles based on props
    const buttonClasses = [
      'icon-button',
      variant && `icon-button--${variant}`,
      rounded && `icon-button--${rounded}`,
      isDisabled && 'icon-button--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconStyle = {
      fontSize: iconSize,
      color: iconColor,
    };

    return (
      <button
        type={type}
        className={buttonClasses}
        onClick={!isDisabled && onClick ? onClick : undefined}
        title={hoverTitle}
        disabled={isDisabled}
      >
        <span
          className={`material-icons${iconVariant !== 'filled' ? `-${iconVariant}` : ''}`}
          style={iconStyle}
        >
          {iconName}
        </span>
      </button>
    );
  }
);

export default IconButton;
