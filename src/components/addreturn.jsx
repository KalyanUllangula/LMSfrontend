import React, { useState } from "react";
import { Grid, Typography, Button, Box, TextField } from "@mui/material";
import axios from "axios";
import Joi from "joi-browser";
import Alert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };

const AddReturn = (props) => {
  const [bookreturned, setUser] = useState({
    returnedDate: "",
    delayedDays: "",
    bookid: "",
    userid: "",
  });
  const [errors, setErrors] = useState({
    returnedDate: "",
    delayedDays: "",
    bookid: "",
    userid: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const schema = {
    returnedDate: Joi.date().required(),
    delayedDays: Joi.string().required(),
    
    bookid: Joi.number().required(),
    userid: Joi.number().required(),
  };

  const validate = () => {
    const errors = {};
    const result = Joi.validate(bookreturned, schema, { abortEarly: false });
    console.log(result);
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...bookreturned };
    usr[event.target.name] = event.target.value;

    setUser(usr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle submit");
    setErrors(validate());
    console.log(errors);
    if (errors) return;
    axios
      .post("http://localhost:8080/lms/returnbooks", bookreturned)
      .then((res) => props.history.push("/book"))
      .catch((err) => {
        console.log(err.response.data.message);
        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div>
      <Typography variant="h3">Return Book</Typography>
      <Grid container>
        <Grid item xs={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              border: "1px solid blue",
              padding: "20px",
              marginTop: "10px",
            }}
          >
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="date"
                inputFormat="yyyy/MM/dd"
                variant="outlined"
                fullWidth
                label="Returned Date"
                value={bookreturned.returnedDate}
                name="returnedDate"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.returnedDate}</Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="text"
                variant="outlined"
                fullWidth
                label="DelayedDays"
                value={bookreturned.delayedDays}
                name="delayedDays"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.delayedDays}</Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="tel"
                variant="outlined"
                fullWidth
                label="BookId"
                value={bookreturned.bookid}
                name="bookid"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.bookid}</Typography>
              )}
            </Box>

            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="tel"
                variant="outlined"
                fullWidth
                label="UserId"
                value={bookreturned.userid}
                name="userid"
                onChange={handleChange}
              />
              {errors && (
                <Typography variant="caption">{errors.userid}</Typography>
              )}
            </Box>

            <Box mt={3}>
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddReturn;