import { Grid, TextField, Typography } from "@mui/material";
import { CalculationResponse } from "../types/calculation.type";

interface OperationResultProps {
  result: CalculationResponse | null;
}

export const OperationResult = (props: OperationResultProps) => {
  const result = props?.result;

  if (result?.result === undefined || result?.result === null) {
    return null
  }
  
  return (
    <Grid container spacing={2} style={{marginTop: 50}}>

      <Grid item xs={12} sm={12}>
         <Typography variant="h5" component="h5" align="left" gutterBottom>
          Result:
        </Typography>
      </Grid>

      <Grid item xs={6} sm={6}>
        <TextField
          label="Result"
          variant="outlined"
          fullWidth
          value={result.result}
          InputProps={{readOnly: true}}
        />
      </Grid>

      <Grid item xs={6} sm={6}>
        <TextField
          label="Your final balance is"
          variant="outlined"
          fullWidth
          value={result.finalBalance}
          InputProps={{readOnly: true}}
        />
      </Grid>

    </Grid>
  );
}
