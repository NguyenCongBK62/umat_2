import React from "react";
import PropTypes from "prop-types";
import { STROKE } from "constant";

export default function LineColumnIcon({ width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill={STROKE}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="14" fill="#121958" />
      <path
        d="M12.833 14.5835C13.0835 14.9184 13.4031 15.1955 13.7702 15.396C14.1372 15.5965 14.5431 15.7158 14.9602 15.7457C15.3774 15.7755 15.7961 15.7154 16.188 15.5692C16.5798 15.423 16.9357 15.1943 17.2313 14.8985L18.9813 13.1485C19.5126 12.5984 19.8066 11.8616 19.8 11.0969C19.7933 10.3321 19.4866 9.60061 18.9458 9.05984C18.405 8.51906 17.6735 8.21232 16.9088 8.20568C16.144 8.19903 15.4073 8.49301 14.8572 9.02431L13.8538 10.0218"
        stroke="white"
      />
      <path
        d="M15.1663 13.4167C14.9158 13.0818 14.5962 12.8047 14.2291 12.6042C13.8621 12.4036 13.4562 12.2844 13.0391 12.2545C12.6219 12.2246 12.2032 12.2848 11.8113 12.431C11.4195 12.5772 11.0636 12.8059 10.768 13.1017L9.01796 14.8517C8.48667 15.4018 8.19268 16.1386 8.19933 16.9033C8.20597 17.668 8.51272 18.3996 9.05349 18.9404C9.59426 19.4811 10.3258 19.7879 11.0905 19.7945C11.8553 19.8012 12.592 19.5072 13.1421 18.9759L14.1396 17.9784"
        stroke="white"
      />
    </svg>
  );
}

LineColumnIcon.defaultProps = {
  width: "18",
  height: "18",
};

LineColumnIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};
