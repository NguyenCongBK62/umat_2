import React from "react";
import PropTypes from "prop-types";
import { STROKE } from "constant";

export default function HomeIcon({ width, height, customStyles }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={customStyles}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66732 7.7915C3.92045 7.7915 4.12565 7.99671 4.12565 8.24984V18.3332C4.12565 18.6978 4.27052 19.0476 4.52838 19.3054C4.78624 19.5633 5.13598 19.7082 5.50065 19.7082H16.5007C16.8653 19.7082 17.2151 19.5633 17.4729 19.3054C17.7308 19.0476 17.8757 18.6978 17.8757 18.3332V8.24984C17.8757 7.99671 18.0809 7.7915 18.334 7.7915C18.5871 7.7915 18.7923 7.99671 18.7923 8.24984V18.3332C18.7923 18.941 18.5509 19.5239 18.1211 19.9536C17.6913 20.3834 17.1084 20.6248 16.5007 20.6248H5.50065C4.89286 20.6248 4.30997 20.3834 3.8802 19.9536C3.45043 19.5239 3.20898 18.941 3.20898 18.3332V8.24984C3.20898 7.99671 3.41419 7.7915 3.66732 7.7915Z"
        fill={STROKE}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6746 1.4544C10.8621 1.29319 11.1392 1.29319 11.3267 1.4544L20.4933 9.33774C20.7027 9.51779 20.7265 9.83348 20.5464 10.0428C20.3664 10.2522 20.0507 10.276 19.8413 10.0959L11.0007 2.49297L2.16001 10.0959C1.95065 10.276 1.63496 10.2522 1.4549 10.0428C1.27484 9.83348 1.29861 9.51779 1.50797 9.33774L10.6746 1.4544ZM7.75066 11.0002C7.75066 10.724 7.97452 10.5002 8.25066 10.5002H13.7507C14.0268 10.5002 14.2507 10.724 14.2507 11.0002V20.1668C14.2507 20.443 14.0268 20.6668 13.7507 20.6668H8.25066C7.97452 20.6668 7.75066 20.443 7.75066 20.1668V11.0002ZM8.75066 11.5002V19.6668H13.2507V11.5002H8.75066Z"
        fill={STROKE}
      />
    </svg>
  );
}

HomeIcon.defaultProps = {
  width: "18",
  height: "18",
  customStyles: {},
};

HomeIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  customStyles: PropTypes.object,
};
