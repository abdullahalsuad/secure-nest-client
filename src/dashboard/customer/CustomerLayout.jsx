import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  DollarSign,
  LayoutDashboard,
  ShieldCheck,
  ShieldUser,
} from "lucide-react";
import React from "react";
import { Outlet } from "react-router";
import SideBar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const CustomerLayout = () => {
  const customerLinks = [
    // { name: "Dashboard", path: "/my-dashboard", icon: LayoutDashboard },
    { name: "My Policies", path: "/my-dashboard", icon: ShieldUser },
    { name: "My Payments", path: "my-payments", icon: DollarSign },
    { name: "Claim policy ", path: "claim-policy", icon: ShieldCheck },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 font-inter rounded-lg">
      {/* Sidebar */}
      <SideBar links={customerLinks} />

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

export default CustomerLayout;
