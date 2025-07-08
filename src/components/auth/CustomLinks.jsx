import React from "react";
import { Link } from "react-router";

const CustomLinks = ({ des, url, title }) => {
  return (
    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      {des}
      <Link to={url} className="text-teal-500 hover:underline font-medium">
        {title}
      </Link>
    </p>
  );
};

export default CustomLinks;
