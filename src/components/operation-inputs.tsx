import React from 'react';
import { Grid, TextField } from "@mui/material";
import { CalculationInput } from "../types/calculation.type";
import { Fragment } from "react";

interface OperationInputsProps {
  inputs: CalculationInput[];
  onInputChange: (value: string, inputId: number) => void;
}

export const OperationInputs = (props: OperationInputsProps) => {

  const elements = props?.inputs?.map((input) => {
    return (
      <Grid key={input.id} item xs={12} sm={6}>
        <TextField
          id={`argument-input-${input.id}`}
          type="text"
          label={`Argument ${input.id}`}
          variant="outlined"
          fullWidth
          value={input.value}
          onChange={(e) => props.onInputChange(e.target.value, input.id)}
          required
        />
      </Grid>
    )
  })
  return <Fragment>{elements}</Fragment>

}
