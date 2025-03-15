const sidebarNav = [
  {
    link: "/",
    section: "dashboard",
    icon: "lucide:layout-dashboard",
    text: "Dashboard",
    permissionRole: ["USER_ROLE"],
  },

  {
    link: "/orders",
    section: "customers",
    icon: "ph:users-bold",
    permissionRole: ["USER_ROLE"],
  },
  
  {
    link: "/analytics",
    section: "analytics",
    icon: "carbon:analytics",
    permissionRole: ["ADMIN","USER_ROLE",],
  },

  {
    link: "/url-blank",
    section: "Blank",
    icon: "ic:round-inventory",
    permissionRole: ["USER_ROLE", "ADMIN"],
  },
  {
    link: "/",
    section: "inventory",
    icon: "ic:round-inventory",
    permissionRole: ["USER_ROLE", "ADMIN"],
  },
  
  {
    section: "ACL",
    link: "/",
    icon: "icon-park-outline:transaction-order",
    permissionRole: ["ADMIN"],
    children: [
      {
        link: "/url",
        section: "Url",
        icon: "solar:accessibility-bold",
        permissionRole: ["ADMIN"],
      },     
      {
        link: "/url-assign",
        section: "Role Assign",
        icon: "carbon:analytics",
        permissionRole: ["ADMIN"],
      }
    ],
  },
  {
    section: "Role",
    link: "/",
    icon: "icon-park-outline:transaction-order",
    permissionRole: ["USER_ROLE"],
    children: [
      {
        link: "/role",
        section: "Role",
        icon: "solar:accessibility-bold",
        permissionRole: ["USER_ROLE"],
      },     
      {
        link: "/role-assign",
        section: "Role Assign",
        icon: "carbon:analytics",
        permissionRole: ["USER_ROLE"],
      }
    ],
  },
];

export default sidebarNav;
