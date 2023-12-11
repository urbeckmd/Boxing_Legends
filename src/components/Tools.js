import React from "react";
import "./Tools.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { addNewBoxer } from "../features/addBoxerSlice";
import { searchAllBoxers } from "../features/searchBoxerSlice";

function Tools() {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(searchAllBoxers(event.target.value))
  }

  return (
    <div className="tools__container">
      <div className="tools__left">
        <div className="tools__search">
          <Form>
            <Form.Control
              className="tools__input"
              type="text"
              placeholder="Search for Boxer"
              onChange={(event) => handleSearch(event)}
            />
          </Form>
        </div>
      </div>

      <div className="tools__right">
        <Button className="tools__addButton" variant="light" onClick={() => dispatch(addNewBoxer())}>
          <AddIcon />
          <h5>Add Boxer</h5>
        </Button>
      </div>
    </div>
  );
}

export default Tools;
