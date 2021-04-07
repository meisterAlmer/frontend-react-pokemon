import React from "react";
import "./Navigation.css";
import PagesButton from "../pagesbutton/PagesButton";

function Navigation({
  setListOffset,
  listOffset,
  listLimit,
  listLength,
  isLoaded,
  setListLimit,
}) {
  return (
    <>
      <p className="page-nr">
        {`Page: ${isLoaded && listOffset / listLimit + 1} / ${
          isLoaded && Math.ceil(listLength / listLimit)
        }`}
      </p>
      <nav>
        <button
          type="button"
          onClick={() => {
            isLoaded && setListOffset(listOffset - listLimit);
          }}
          disabled={listOffset < listLimit}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => {
            isLoaded && setListOffset(listOffset + listLimit);
          }}
          disabled={listOffset + listLimit > listLength}
        >
          Next
        </button>
      </nav>
      <div className="items">
        <p>Cards per page</p>

        <PagesButton
          setListOffset={setListOffset}
          listLimit={listLimit}
          setListLimit={setListLimit}
          limit="4"
        />
        <PagesButton
          setListOffset={setListOffset}
          listLimit={listLimit}
          setListLimit={setListLimit}
          limit="8"
        />
        <PagesButton
          setListOffset={setListOffset}
          listLimit={listLimit}
          setListLimit={setListLimit}
          limit="20"
        />
        <PagesButton
          setListOffset={setListOffset}
          listLimit={listLimit}
          setListLimit={setListLimit}
          limit="40"
        />
      </div>
    </>
  );
}

export default Navigation;
