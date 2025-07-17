import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { Outlet } from "react-router";
import SideBar from "../../components/dashboard/SideBar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import {
  Users,
  DollarSign,
  FileUser,
  UserCog,
  HeartHandshake,
  LayoutDashboard,
  ScrollText,
  SquarePen,
} from "lucide-react";

const AdminLayout = () => {
  const adminLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Applications", path: "applications", icon: FileUser },
    { name: "Manage Users", path: "users", icon: Users },
    { name: "Manage Policies", path: "policies", icon: HeartHandshake },
    { name: "Manage Transactions", path: "transactions", icon: DollarSign },
    { name: "Post A Blog", path: "blog-posts", icon: SquarePen },
    { name: "Manage Blogs", path: "manage-blogs", icon: ScrollText },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 font-inter rounded-lg">
      {/* Sidebar */}
      <SideBar links={adminLinks} />

      {/* Main Content Area */}
      <div className="flex-1 h-screen  flex flex-col ">
        {/* Top Navigation Bar */}
        <DashboardHeader />

        {/* Content Area for Routed Components */}
        <main className="flex-1 p-6 overflow-auto h-min-screen dark:bg-gray-950">
          <Outlet /> {/* Renders the child route component */}
        </main>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default AdminLayout;
