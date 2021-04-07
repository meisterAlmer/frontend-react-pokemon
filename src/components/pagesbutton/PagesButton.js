import React from "react";
import "./PagesButton.css";

function PagesButton({ setListOffset, listLimit, setListLimit, limit }) {
  const newLimit = Number(limit);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setListLimit(newLimit);
          setListOffset(0);
        }}
        className={`${
          listLimit === newLimit ? "pages-btn-active" : "pages-btn"
        }`}
      >
        {limit}
      </button>
    </>
  );
}

export default PagesButton;
