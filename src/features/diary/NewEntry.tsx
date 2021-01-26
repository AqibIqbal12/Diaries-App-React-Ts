import React, { FC } from "react";
import Editor from "../entry/Editor";
import DiaryEntriesList from "./DiaryEntriesList";
//import NavBar from "../nav/NavBar";

const NewEntry: FC = () => {
  return (
    <>
      {/* <NavBar /> */}
      <div className="two-cols">
        <div className="left">
          <DiaryEntriesList />
        </div>
        <div className="right">
          <Editor />
        </div>
      </div>
    </>
  );
};

export default NewEntry;
