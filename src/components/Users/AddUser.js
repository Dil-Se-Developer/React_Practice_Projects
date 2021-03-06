import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredGender, setEnteredGender] = useState("");
  // const [checkedRadio, setRadio] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1 || +enteredAge > 100) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0 or < 100)",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge, enteredGender);
    setEnteredUsername("");
    setEnteredAge("");
    setEnteredGender("");
    // setRadio("false");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const genderChangeHandler = (event) => {
    // setRadio('true');
    setEnteredGender(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor="age"> Age (Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={enteredAge}
          />
          <p>Select Gender :- </p>
          <div className={classes.form_control}>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="male"
              name="gender_status"
              value="Male"
              onChange={genderChangeHandler}
              // checked={checkedRadio}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="female"
              name="gender_status"
              value="Female"
              onChange={genderChangeHandler}
              // checked={checkedRadio}
            />
            <label htmlFor="Others">Others</label>
            <input
              type="radio"
              id="others"
              name="gender_status"
              value="Others"
              onChange={genderChangeHandler}
              // checked={checkedRadio}
            />
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
