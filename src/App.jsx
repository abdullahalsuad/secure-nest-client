import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./pages/shared/Navbar";
import Footer from "./pages/shared/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-200  bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-teal-900">
      <header>
        <Navbar />
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer>
        <Footer />
      </footer>

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
