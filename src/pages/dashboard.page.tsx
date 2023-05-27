import { Container, FormControl, Grid, TextField, Typography } from "@mui/material";
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

export const DashboardPage = () => {

  const [operations, setOperations] = useState([] as Operation[]);
  const [inputs, setInputs] = useState<CalculationInput[]>([]);

  const [selectedOperationId, setSelectedOperation] = useState(0);
  const [cost, setCost] = useState<number>();
  const [result, setResult] = useState<CalculationResponse | null>(null);

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
    const performCalculation = executeCalculation(selectedOperationId, inputs);
    performCalculation()
      .then(setResult)
      .catch(console.error)
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
    <CalculateButton selectedOperationId={selectedOperationId} calculate={calculate} />
  </Grid>

  <OperationResult result={result} />
</Container>
  );
}
