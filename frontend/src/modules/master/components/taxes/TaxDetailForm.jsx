import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {
  TextField,
  FormControl,
  FormHelperText,
  Button,
  Autocomplete,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { validateNumber } from "../../../../services/utils";

const initialErrorState = {
  taxType: {
    invalid: false,
    message: "",
  },
  amount: {
    invalid: false,
    message: "",
  },
  startDate: {
    invalid: false,
    message: "",
  },
  endDate: {
    invalid: false,
    message: "",
  },
};

const initialState = {
  tax_type: "",
  amount: "",
  tax_start_date: null,
  tax_end_date: null,
  description: "",
};

const TaxDetailForm = ({ onTaxDetailAdd, editTaxDetail }) => {
  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [taxDetail, setTaxDetail] = useState(initialState);

  useEffect(() => {
    if (editTaxDetail) {
      if (editTaxDetail.tax_start_date) {
        editTaxDetail.tax_start_date = dayjs(editTaxDetail.tax_start_date);
      }
      if (editTaxDetail.tax_end_date) {
        editTaxDetail.tax_end_date = dayjs(editTaxDetail.tax_end_date);
      }
      setTaxDetail(editTaxDetail);
    }
  }, [editTaxDetail]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaxDetail((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const autocompleteChangeListener = (value, name) => {
    setTaxDetail((currState) => {
      return {
        ...currState,
        [name]: value,
      };
    });
  };

  const dateInputChangeHandler = (name, date) => {
    setTaxDetail((currState) => {
      return {
        ...currState,
        [name]: date,
      };
    });
  };

  const validateForm = (formData) => {
    const errors = { ...initialErrorState };
    if (!formData.tax_type?.trim?.()) {
      errors.taxType = { invalid: true, message: "Tax type is required" };
    }
    if (!formData.amount?.trim?.()) {
      errors.amount = { invalid: true, message: "Amount is required" };
    }
    if (isNaN(formData.amount) && isNaN(parseFloat(formData.amount))) {
      errors.amount = { invalid: true, message: "Amount should be a number" };
    }
    if (!formData.tax_start_date) {
      errors.tax_start_date = { invalid: true, message: "Start date is required" };
    }
    if (!formData.tax_end_date) {
      errors.endDate = { invalid: true, message: "End date is required" };
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm(taxDetail)) {
      onTaxDetailAdd(taxDetail);
      setFormErrors(initialErrorState);
      setTaxDetail(initialState);
    }
  };

  return (
    <form action="" id="taxDetailForm" onSubmit={submitHandler}>
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Tax details
        </Typography>
        <div className="grid grid-3-col">
          <div className="grid-item">
            <FormControl
              fullWidth
              size="small"
              error={formErrors.taxType.invalid}
            >
              <Autocomplete
                disablePortal
                autoSelect
                size="small"
                name="tax_type"
                options={["Insurance", "Road tax", "Fitness", "PUC", "RTO"]}
                freeSolo
                value={taxDetail.tax_type}
                onChange={(e, value) =>
                  autocompleteChangeListener(value, "tax_type")
                }
                openOnFocus
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tax type"
                    error={formErrors.taxType.invalid}
                    fullWidth
                  />
                )}
              />
              {formErrors.taxType.invalid && (
                <FormHelperText>{formErrors.taxType.message}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="grid-item">
            <FormControl fullWidth error={formErrors.amount.invalid}>
              <TextField
                size="small"
                variant="outlined"
                label="Amount"
                value={taxDetail.amount || ""}
                error={formErrors.amount.invalid}
                onChange={inputChangeHandler}
                onInput={validateNumber}
                name="amount"
                id="amount"
              />
              {formErrors.amount.invalid && (
                <FormHelperText>{formErrors.amount.message}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="grid-item">
            <FormControl fullWidth error={formErrors.startDate.invalid}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  inputFormat="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  value={taxDetail.tax_start_date}
                  onChange={dateInputChangeHandler.bind(null, "tax_start_date")}
                  error={formErrors.startDate.invalid}
                  renderInput={(params) => (
                    <TextField
                      name="tax_start_date"
                      size="small"
                      {...params}
                      error={formErrors.startDate.invalid}
                    />
                  )}
                />
              </LocalizationProvider>
              {formErrors.startDate.invalid && (
                <FormHelperText>{formErrors.startDate.message}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="grid-item">
            <FormControl fullWidth error={formErrors.endDate.invalid}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End date"
                  inputFormat="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  value={taxDetail.tax_end_date}
                  error={formErrors.endDate.invalid}
                  onChange={dateInputChangeHandler.bind(null, "tax_end_date")}
                  renderInput={(params) => (
                    <TextField
                      name="tax_end_date"
                      size="small"
                      {...params}
                      error={formErrors.endDate.invalid}
                    />
                  )}
                />
              </LocalizationProvider>
              {formErrors.endDate.invalid && (
                <FormHelperText>{formErrors.endDate.message}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="grid-item">
            <FormControl fullWidth>
              <TextField
                size="small"
                variant="outlined"
                label="Description"
                value={taxDetail.description}
                onChange={inputChangeHandler}
                name="description"
                id="description"
              />
            </FormControl>
          </div>
        </div>
        <div className="right">
          <Button
            variant="contained"
            size="medium"
            type="submit"
            color="primary"
            form="taxDetailForm"
          >
            {editTaxDetail ? "Update" : "Add"}
          </Button>
        </div>
      </Paper>
    </form>
  );
};

export default TaxDetailForm;
