import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Paper,
} from "@mui/material";
import { Alert, Stack } from "@mui/material";
import {
  mobileNoRegEx,
  emailRegEx,
  validatePhoneNumber,
} from "../../../../services/utils";
import { useDispatch, useSelector } from "react-redux";
import { createBank, selectIsLoading } from "./slice/bankSlice";
import { LoadingSpinner } from "../../../../ui-controls";

const initialState = {
  name: "",
  branchName: "",
  branchCode: "",
  address: "",
  ifsc: "",
  micr: "",
  phone: "",
  email: "",
};

const initialErrorState = {
  name: {
    invalid: false,
    message: "",
  },
  branchName: {
    invalid: false,
    message: "",
  },
  branchCode: {
    invalid: false,
    message: "",
  },
  address: {
    invalid: false,
    message: "",
  },
  ifsc: {
    invalid: false,
    message: "",
  },
  micr: {
    invalid: false,
    message: "",
  },
  phone: {
    invalid: false,
    message: "",
  },
  email: {
    invalid: false,
    message: "",
  },
};

const BankAdd = () => {
  const [bank, setBank] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [httpError, setHttpError] = useState("");
  const isLoading = useSelector(selectIsLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToBankList = useCallback(() => {
    navigate("/master/banks");
  }, [navigate]);

  const resetButtonHandler = () => {
    setBank(initialState);
    setHttpError("");
    setFormErrors(initialErrorState);
  };

  const backButtonHandler = () => {
    goToBankList();
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBank((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm(bank)) {
      dispatch(createBank(bank))
        .then(({ payload = {} }) => {
          const { message } = payload?.data || {};
          if (message.includes("Already Exist")) {
            setHttpError(message);
          } else {
            setHttpError("");
            setBank(initialState);
            goToBankList();
          }
        })
        .catch((error) => {
          setHttpError(error.message);
        });
    }
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (!formData.name?.trim?.()) {
      errors.name = { invalid: true, message: "Bank name is required" };
    }

    if (!formData.ifsc?.trim?.()) {
      errors.ifsc = { invalid: true, message: "IFSC code is required" };
    }
    if (
      formData.phone &&
      formData.phone?.trim?.() !== "" &&
      !mobileNoRegEx.test(formData.phone)
    ) {
      errors.phone = {
        invalid: true,
        message: "Phone should be 10 digits number",
      };
    }
    if (
      formData.email &&
      formData.email?.trim?.() !== "" &&
      !emailRegEx.test(formData.email)
    ) {
      errors.email = { invalid: true, message: "Email is invalid" };
    }
    let validationErrors = false;
    for (const key in errors) {
      if (errors[key].invalid === true) {
        validationErrors = true;
      }
    }
    if (validationErrors) {
      setFormErrors(errors);
    }
    return validationErrors;
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <h1 className="pageHead">Add a bank</h1>
      <div className="inner-wrap" style={{ background: "#fff" }}>
        {httpError !== "" && (
          <Stack
            sx={{
              width: "100%",
              margin: "0 0 30px 0",
              border: "1px solid red",
              borderRadius: "4px",
            }}
            spacing={2}
          >
            <Alert severity="error">{httpError}</Alert>
          </Stack>
        )}
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <form action="" onSubmit={submitHandler}>
            <div className="grid grid-6-col">
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.name.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Bank name"
                    value={bank.name}
                    error={formErrors.name.invalid}
                    onChange={inputChangeHandler}
                    name="name"
                    id="name"
                  />
                  {formErrors.name.invalid && (
                    <FormHelperText>{formErrors.name.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.branchName.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Branch name"
                    value={bank.branchName}
                    error={formErrors.branchName.invalid}
                    onChange={inputChangeHandler}
                    name="branchName"
                    id="branchName"
                  />
                  {formErrors.branchName.invalid && (
                    <FormHelperText>
                      {formErrors.branchName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.branchCode.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Branch code"
                    value={bank.branchCode}
                    error={formErrors.branchCode.invalid}
                    onChange={inputChangeHandler}
                    name="branchCode"
                    id="branchCode"
                  />
                  {formErrors.branchCode.invalid && (
                    <FormHelperText>
                      {formErrors.branchCode.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.ifsc.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="IFSC code"
                    value={bank.ifsc}
                    error={formErrors.ifsc.invalid}
                    onChange={inputChangeHandler}
                    name="ifsc"
                    id="ifsc"
                  />
                  {formErrors.ifsc.invalid && (
                    <FormHelperText>{formErrors.ifsc.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.micr.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="MICR code"
                    value={bank.micr}
                    error={formErrors.micr.invalid}
                    onChange={inputChangeHandler}
                    name="micr"
                    id="micr"
                  />
                  {formErrors.micr.invalid && (
                    <FormHelperText>{formErrors.micr.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.phone.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Phone"
                    value={bank.phone}
                    error={formErrors.phone.invalid}
                    onChange={inputChangeHandler}
                    onInput={validatePhoneNumber}
                    name="phone"
                    id="phone"
                  />
                  {formErrors.phone.invalid && (
                    <FormHelperText>{formErrors.phone.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.email.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Email"
                    value={bank.email}
                    error={formErrors.email.invalid}
                    onChange={inputChangeHandler}
                    name="email"
                    id="email"
                  />
                  {formErrors.email.invalid && (
                    <FormHelperText>{formErrors.email.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
              <div className="grid-item">
                <FormControl fullWidth error={formErrors.address.invalid}>
                  <TextField
                    size="small"
                    variant="outlined"
                    label="Address"
                    value={bank.address}
                    error={formErrors.address.invalid}
                    onChange={inputChangeHandler}
                    name="address"
                    id="address"
                  />
                  {formErrors.address.invalid && (
                    <FormHelperText>
                      {formErrors.address.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            </div>
            <div className="right">
              <Button
                variant="outlined"
                size="medium"
                onClick={backButtonHandler}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                size="medium"
                onClick={resetButtonHandler}
                className="ml6"
              >
                Reset
              </Button>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                color="primary"
                className="ml6"
              >
                Save
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default BankAdd;
