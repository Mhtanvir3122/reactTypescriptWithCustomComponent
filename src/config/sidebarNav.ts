const sidebarNav = [
  {
    link: "/",
    section: "dashboard",
    icon: "lucide:layout-dashboard",
    text: "Dashboard",
    permissionRole: ["USER_ROLE"],
  },
  {
    section: "products",
    icon: "icon-park-outline:ad-product",
    text: "Products",
    permissionRole: ["USER_ROLE"],
    
  },
  {
    link: "/customers",
    section: "customers",
    icon: "ph:users-bold",
    text: "Customers",
    permissionRole: ["USER_ROLE"],
  },
  {
    section: "orders",
    icon: "icon-park-outline:transaction-order",
    text: "Orders",
    permissionRole: ["USER_ROLE"],
    children: [
      {
        link: "/discount",
        section: "analytics",
        icon: "carbon:analytics",
        text: "Analytics",
        permissionRole: ["ADMIN"],
      },     
      {
        link: "/discount",
        section: "analytics",
        icon: "carbon:analytics",
        text: "Analytics",
        permissionRole: ["ADMIN"],
      }
    ],
  },
  {
    link: "/analytics",
    section: "analytics",
    icon: "carbon:analytics",
    text: "Analytics",
    permissionRole: ["ADMIN"],
  },
  // {
  //   link: "/discount",
  //   section: "discount",
  //   icon: "nimbus:discount-circle",
  //   text: "Discount",
  //   permissionRole: ["ADMIN"],
  // },
  {
    link: "/inventory",
    section: "inventory",
    icon: "ic:round-inventory",
    text: "Inventory",
    permissionRole: ["USER_ROLE", "ADMIN"],
  },
];

export default sidebarNav;
