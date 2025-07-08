import { Link, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <div className="min-h-screen dark:bg-gradient-to-r  bg-teal-50 dark:from-gray-900 dark:via-teal-900 to-gray-900">
      {/* Brand */}
      <div className="text-center pt-20 mb-10">
        <Link
          to="/"
          className="inline-flex items-center text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          <div className="flex items-center justify-center text-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-700 to-teal-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold">Secure Nest</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center pb-10">
        <Outlet />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AuthLayout;
