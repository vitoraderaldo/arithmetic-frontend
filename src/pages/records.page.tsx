import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Container, Typography, Grid, FormControl } from '@mui/material';
import { OperationsDropdown } from '../components/operations-dropdown';
import { Operation } from '../types/operations.type';
import { apiService } from '../api/api.service';

interface Record {
  id: number;
  operation: string;
  amount: number;
  userBalance: number;
  operationResponse: string;
  date: string;
}

interface FilterOptions {
  operationId: number;
  startDate: string;
  endDate: string;
}

export const RecordsPage: React.FC = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  const [operations, setOperations] = useState([] as Operation[]);
  const [records, setRecords] = useState<Record[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    operationId: 0,
    startDate: startDate.toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchRecords();
    fetchOperations();
  }, [filters, currentPage]);

  const fetchRecords = async () => {
    
  };

  const fetchOperations = async () => {
    try {
      const response = await apiService.getOperations()
      setOperations(response.operations);
    } catch (error) {
      console.error(error)
    }
  }

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilterSubmit = () => {
    console.log('filters', filters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
      <Container >
         <Typography variant="h4" component="h1" align="center" gutterBottom style={{marginBottom: 30}}>
          Records
        </Typography>

        <Grid item xs={12} style={{textAlign: 'right'}}>
          <FormControl variant="outlined" >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <OperationsDropdown 
                  operations={operations} 
                  selectedOperationId={filters.operationId} 
                  onOperationChange={handleFilterChange}
                  includeAllOption  
                />
              </Grid>

              <Grid item>
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  variant='standard'
                />
              </Grid>

              <Grid item>
                <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  variant='standard'
                />
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleFilterSubmit}>Apply Filters</Button>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Operation</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Operation Response</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.operation}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>{record.userBalance}</TableCell>
                  <TableCell>{record.operationResponse}</TableCell>
                  <TableCell>{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button
              key={page}
              variant="outlined"
              //color={page === currentPage ? 'primary' : 'default'}
              onClick={() => handlePageChange(page)}
            >
            {page}
            </Button>
            ))}
          </div>
      </Container>
  );
};
