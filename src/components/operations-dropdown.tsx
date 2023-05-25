import { InputLabel, MenuItem, Select } from "@mui/material"
import { Operation } from "../types/operations.type"
import { Fragment } from "react"

interface OperationsDropdownProps {
  operations: Operation[];
  selectedOperationId: number | null;
  onOperationChange: (e: any) => void;
}

const renderOperationOptions = (props: OperationsDropdownProps) => {
  return props.operations.map(operation => 
    <MenuItem key={operation.id} value={operation.id}>{operation.name}</MenuItem>
  )
}

export const OperationsDropdown = (props: OperationsDropdownProps) => {
  const { onOperationChange, selectedOperationId } = props;
  return (
    <Fragment>
      <InputLabel>Operation</InputLabel>
      <Select value={selectedOperationId || ''} onChange={onOperationChange} label="Operation">
        {renderOperationOptions(props)}
      </Select>
    </Fragment>
  )
}
