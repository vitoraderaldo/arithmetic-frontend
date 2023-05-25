import { Button, Grid } from "@mui/material"

interface OperationInputsProps {
  selectedOperationId: number
  calculate: () => void
}

export const CalculateButton = (props: OperationInputsProps) => {
  if (!props.selectedOperationId) {
    return null
  }

  return (
    <Grid item xs={12} sm={12} >
      <Button variant="contained" color="primary" onClick={props.calculate}>
        Calculate
      </Button>
    </Grid>
  )
}
