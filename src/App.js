import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Boxers from "./components/Boxers";
import Header from "./components/Header";
import Tools from "./components/Tools";
import AddBoxer from "./components/AddBoxer";
import { closeNewBoxer, selectAddBoxer } from "./features/addBoxerSlice";
import Footer from "./components/Footer";
import ViewBoxer from "./components/ViewBoxer";
import {
  deselectViewBoxer,
  selectToViewBoxer,
} from "./features/selectBoxerSlice";

function App() {
  const addNewBoxerOpen = useSelector(selectAddBoxer);
  const selectToViewBoxerOpen = useSelector(selectToViewBoxer);
  const dispatch = useDispatch();

  return (
    <div className="app">
      <div className="app__home" style={{ opacity: addNewBoxerOpen && "0.2" }}>
        <Header />
        <div className="app__body">
          <Boxers className="app__body" />
        </div>
        <Footer />
      </div>

      <AddBoxer
        backdrop="static"
        show={addNewBoxerOpen}
        onHide={() => dispatch(closeNewBoxer())}
      />

      <ViewBoxer
        show={selectToViewBoxerOpen}
        onHide={() => dispatch(deselectViewBoxer())}
      />
    </div>
  );
}

export default App;
