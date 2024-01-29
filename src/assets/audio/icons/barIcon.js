import * as React from "react";
const BarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M18 5a1 1 0 1 0 0-2H2a1 1 0 0 0 0 2h16zm0 4a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h16zm1 3a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h16a1 1 0 0 1 1 1zm-1 5a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h16z"
    />
  </svg>
);
export default BarIcon;
