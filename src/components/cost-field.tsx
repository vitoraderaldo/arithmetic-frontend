import { Grid, TextField } from "@mui/material"

interface CostFieldProps {
  cost: number | null | undefined;
}

export const CostField = (props: CostFieldProps) => {
  if (props.cost === null || props.cost === undefined) {
    return null;
  }
  return (
    <Grid item xs={4} sm={4}>
      <TextField
        label="Cost"
        variant="outlined"
        fullWidth
        value={props.cost}
        InputProps={{ readOnly: true }}
      />
    </Grid>
  )
}
