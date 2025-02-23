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
    text: "Customers",
    permissionRole: ["USER_ROLE"],
  },
  
  {
    link: "/analytics",
    section: "analytics",
    icon: "carbon:analytics",
    text: "Analytics",
    permissionRole: ["ADMIN","USER_ROLE",],
  },

  {
    link: "/",
    section: "inventory",
    icon: "ic:round-inventory",
    text: "Inventory",
    permissionRole: ["USER_ROLE", "ADMIN"],
  },

  {
    section: "ACL",
    icon: "icon-park-outline:transaction-order",
    text: "Orders",
    permissionRole: ["USER_ROLE"],
    children: [
      {
        link: "/role",
        section: "Role",
        icon: "solar:accessibility-bold",
        text: "Analytics",
        permissionRole: ["ADMIN"],
      },     
      {
        link: "/role-assign",
        section: "Role Assign",
        icon: "carbon:analytics",
        text: "Analytics",
        permissionRole: ["ADMIN"],
      }
    ],
  },
  {
    section: "Role",
    icon: "icon-park-outline:transaction-order",
    text: "Orders",
    permissionRole: ["USER_ROLE"],
    children: [
      {
        link: "/role",
        section: "Role",
        icon: "solar:accessibility-bold",
        text: "Analytics",
        permissionRole: ["ADMIN"],
      },     
      {
        link: "/role-assign",
        section: "Role Assign",
        icon: "carbon:analytics",
        text: "Analytics",
        permissionRole: ["ADMIN"],
      }
    ],
  },
];

export default sidebarNav;
