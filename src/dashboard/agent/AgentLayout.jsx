import React from "react";
import { Outlet } from "react-router";
import SideBar from "../../components/dashboard/Sidebar";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import { FileUser, ScrollText, SquarePen, UserRoundCheck } from "lucide-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const AgentLayout = () => {
  const agentLinks = [
    { name: "Policy clearance", path: "/agent", icon: FileUser },
    {
      name: "Assigned Customers",
      path: "assigned-customers",
      icon: UserRoundCheck,
    },
    { name: "My Blogs", path: "my-blogs", icon: ScrollText },
    { name: "Blog Posts", path: "blog-posts", icon: SquarePen },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 font-inter rounded-lg">
      {/* Sidebar */}
      <SideBar links={agentLinks} />

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

export default AgentLayout;
