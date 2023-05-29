import React from 'react';
import { Container, FormControl, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Operation } from "../types/operations.type";
import { CalculationInput, CalculationResponse } from "../types/calculation.type";
import { apiService } from "../api/api.service";
import { OperationsDropdown } from "../components/operations-dropdown";
import { OperationResult } from "../components/operation-result";
import { OperationInputs } from "../components/operation-inputs";
import { CalculateButton } from "../components/calculate-button";
import { executeCalculation } from "../util/calculator/handle-calculation";
import { CostField } from "../components/cost-field";
import { ApiErrorInterface } from "../api/api.error.interface";

export const DashboardPage = () => {

  const [operations, setOperations] = useState([] as Operation[]);
  const [inputs, setInputs] = useState<CalculationInput[]>([]);

  const [selectedOperationId, setSelectedOperation] = useState(0);
  const [cost, setCost] = useState<number>();
  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [isCalculating, setIsCalculating ] = useState(false);
  const [error, setError] = useState<string>("");

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
    setResult(null)
    const operationId = e.target.value;
    setSelectedOperation(operationId);
    const operation = operations.find((operation) => operation.id === operationId);
    if (operation?.cost) {
      setCost(operation.cost)
    }
    if (operation?.inputs) {
      const inputs = [];
      for (let i = 1; i <= operation.inputs; i++) {
        const newInput: CalculationInput = { id: i, value: ''}
        inputs.push(newInput)
      }
      setInputs(inputs);
    } else {
      setInputs([]);
    }
  }

  const onInputChange = (value: string, inputId: number) => { 
    const newInputs = inputs.map((input) => {
      if (input.id === inputId) {
        return { ...input, value}
      }
      return input;
    })
    setInputs(newInputs);
  }

  const calculate = async () => {
    setError("");
    setResult(null);
    setIsCalculating(true);
    const performCalculation = executeCalculation(selectedOperationId, inputs);
    performCalculation()
      .then(setResult)
      .catch((error: ApiErrorInterface) => setError(error.message))
      .finally(() => setIsCalculating(false))
  }

  return (
    <Container maxWidth="xs" style={{ 
      padding: 40,
      border: '1px solid #ccc',
      borderRadius: '5px',
    }}>
  <Typography variant="h4" component="h1" align="center" gutterBottom style={{ marginBottom: '30px', fontWeight: 700 }}>
    Calculator
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={8} sm={6}>
      <FormControl variant="outlined" fullWidth>
        <OperationsDropdown
          operations={operations}
          selectedOperationId={selectedOperationId}
          onOperationChange={onOperationChange}
        />
      </FormControl>
    </Grid>

    <CostField cost={cost} />

    <OperationInputs inputs={inputs} onInputChange={onInputChange} />
    <Grid style={{width: '100%', marginTop: 20}}>
      {error && (
        <Typography color="error" align="center" gutterBottom>
          {error}
        </Typography>
      )}
    </Grid>
    <CalculateButton 
      selectedOperationId={selectedOperationId} 
      calculate={calculate} 
      isCalculating={isCalculating}
    />
  </Grid>

  <OperationResult result={result} />
</Container>
  );
}
