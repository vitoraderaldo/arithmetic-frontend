import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { LeftMenu } from "../components/left-menu";
import { Fragment, useEffect, useState } from "react";
import { Operation } from "../types/operations.type";
import { CalculationInput } from "../types/calculation-inputs.type";
import { apiService } from "../api/api.service";

export const DashboardPage = () => {

  const [operations, setOperations] = useState([] as Operation[]);
  const [inputs, setInputs] = useState([] as CalculationInput[]);

  const [selectedOperationId, setSelectedOperation] = useState(0);
  const [cost, setCost] = useState(0);
  const [result, setResult] = useState('');

  useEffect(() => {

    const loadOperations = async () => {
      try {
        const response = await apiService.getOperations()
        setOperations(response.operations);
      } catch (error) {
        console.error(error)
      }
      
    };
    loadOperations();
  }, [])

  const onOperationChange = (e: any) => {
    const operationId = e.target.value;
    setSelectedOperation(operationId);
    const operation = operations.find((operation) => operation.id === operationId);
    if (operation?.cost) {
      setCost(operation.cost)
    }
    if (operation?.inputs) {
      const inputs = [];
      for (let i = 1; i <= operation.inputs; i++) {
        const newInput: CalculationInput = {
          id: i,
          value: '',
        }
        inputs.push(newInput)
      }
      setInputs(inputs);
    } else {
      setInputs([]);
    }
  }

  const renderMenuItems = () => {
    return operations.map((operation) => {
      return (
        <MenuItem key={operation.id} value={operation.id}>{operation.name}</MenuItem>
      )
    })
  }

  const handleInputChange = (value: string, inputId: number) => { 
    const newInputs = inputs.map((input) => {
      if (input.id === inputId) {
        return {
          ...input,
          value,
        }
      }
      return input;
    })
    setInputs(newInputs);
  }

  const renderInputs = () => {
    return inputs.map((input) => {
      return (
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            label={`Input ${input.id}`}
            variant="outlined"
            fullWidth
            value={input.value}
            onChange={(e) => handleInputChange(e.target.value, input.id)}
          />
        </Grid>
      )
    })
  }

  const renderResult = () => {
    if (!result) {
      return null
    }
    return (
      <Grid container spacing={2} style={{marginTop: 50}}>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Result"
            variant="outlined"
            fullWidth
            value={result}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Your final balance is"
            variant="outlined"
            fullWidth
            //value={result}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    );
  }

  const renderCalculateButton = () => {
    if (!selectedOperationId) {
      return null
    }
    return (
      <Grid item xs={12} sm={12} >
        <Button variant="contained" color="primary">
          Calculate
        </Button>
      </Grid>
    )
  }

  return (
    <Fragment>
      <LeftMenu />
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Arithmetic Calculator
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={8} sm={8}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Operation</InputLabel>
              <Select value={selectedOperationId} onChange={(e) => onOperationChange(e)} label="Operation">
                {renderMenuItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4} sm={4}>
          <TextField
              label="Cost"
              variant="standard"
              fullWidth
              value={cost}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {renderInputs()}
          
          {renderCalculateButton()}
        </Grid>

        {renderResult()}
      </Container>
    </Fragment>
  );
}
