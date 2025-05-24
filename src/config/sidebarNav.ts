const sidebarNav = [
  {
    link: "/",
    section: "dashboard",
    icon: "lucide:layout-dashboard",
    text: "Dashboard",
    permissionRole: ["USER_ROLE"],
  },
  {
    link: "/task-create",
    section: "Create Task",
    icon: "ic:round-inventory",
    permissionRole: [ "ADMIN"],
  },
  {
    link: "/task-assign",
    section: "Assign Task",
    icon: "ic:round-inventory",
    permissionRole: [ "ADMIN"],
  },
  {
    link: "/ageent-task",
    section: "My Task (Agent)",
    icon: "ic:round-inventory",
    permissionRole: ["AGENT"],
  },
  
  {
    section: "ACL",
    link: "/",
    icon: "icon-park-outline:transaction-order",
    permissionRole: ["ADMIN"],
    children: [
      {
        link: "/url",
        section: "Menu Create",
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
    permissionRole: ["ADMIN"],
    children: [
      {
        link: "/role",
        section: "Role Create",
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
  {
    link: "/analytics",
    section: "Chat",
    icon: "carbon:analytics",
    permissionRole: ["ADMIN","USER_ROLE",],
  },
];

export default sidebarNav;
