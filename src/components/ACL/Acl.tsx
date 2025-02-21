import React from "react";

interface ACLWrapperProps {
  visibleToRoles: string[];
  children: React.ReactNode;
}

const userRole = "SUPER_ADMIN"; // এটি আসতে পারে Authentication Context বা Redux থেকে

const ACLWrapper: React.FC<ACLWrapperProps> = ({ visibleToRoles, children }) => {
  if (!visibleToRoles.includes(userRole)) {
    return null; // অনুমতি না থাকলে কিছুই দেখাবে না
  }
  return <>{children}</>;
};

export default ACLWrapper;
