import { ReactNode } from "react";
import DrawerHeader from "./DrawerHeader";
import clsx from "clsx";
import "./drawer.scss";

type DrawerProps = {
  title?: string | ReactNode;
  children: JSX.Element | JSX.Element[] | string;
  isOpen: boolean;
  handleClose?: () => void;
  className?: string;
  closeOnBackdropClick?: boolean;
};

export default ({
  title,
  className,
  children,
  isOpen,
  handleClose,
  closeOnBackdropClick = true,
}: DrawerProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div
        className={clsx(
          `bg-body drawer card2 `,
          className
        )}
      >
        <div className="">
          <div className="w-100 ">
            {title ? (
              <DrawerHeader
                title={title}
                closeIconAction={handleClose}
                backIconAction={handleClose}
              />
            ) : null}
            <div className="card p-4">
            
            {children}
            </div>
            
          </div>
        </div>
      </div>
      <div
        className="drawer-overlay"
        style={{ zIndex: 109 }}
        onClick={() => closeOnBackdropClick && handleClose && handleClose()}
      />
    </>
  );
};
