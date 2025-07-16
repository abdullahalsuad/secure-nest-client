import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="max-w-xl text-center bg-white dark:bg-gray-800 shadow-xl rounded-xl p-10">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Oops! Page not found.
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
          Let us help you find the right <strong>life insurance</strong>{" "}
          information.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Go to Life Insurance Homepage
        </a>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Think this is an error?{" "}
          <a
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
