import React from 'react';
import { InputLabel, MenuItem, Select } from "@mui/material"
import { Operation } from "../types/operations.type"
import { Fragment } from "react"

interface OperationsDropdownProps {
  operations: Operation[];
  selectedOperationId: number | null;
  onOperationChange: (e: any) => void;
  includeAllOption?: boolean;
}

const renderOperationOptions = (props: OperationsDropdownProps) => {
  return props.operations.map(operation => 
    <MenuItem key={operation.id} value={operation.id}>{operation.name}</MenuItem>
  )
}

const renderAllOperations = (props: OperationsDropdownProps) => {
  if (props.includeAllOption) {
    return (
      <MenuItem key="clear" value={'0'}>All</MenuItem>
    )
  } 
}

export const OperationsDropdown = (props: OperationsDropdownProps) => {
  const { onOperationChange, selectedOperationId } = props;
  return (
    <Fragment>
      <InputLabel>Operation</InputLabel>
      <Select 
        name="operationId" 
        value={selectedOperationId || '0'} 
        onChange={onOperationChange} 
        label="Operation"
        style={{minWidth: 150}}
      >
        {renderAllOperations(props)}
        {renderOperationOptions(props)}
      </Select>
    </Fragment>
  )
}
