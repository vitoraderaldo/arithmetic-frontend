import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Container, Grid, FormControl, Pagination } from '@mui/material';
import { OperationsDropdown } from '../components/operations-dropdown';
import { Operation } from '../types/operations.type';
import { apiService } from '../api/api.service';
import { RecordsSearchResponse } from '../types/records.type';
import { RecordFilterOptions } from '../api/request.types';
import moment from 'moment';

export const RecordsPage: React.FC = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  const [operations, setOperations] = useState([] as Operation[]);
  const [records, setRecords] = useState<RecordsSearchResponse | null>(null);
  const [filters, setFilters] = useState<RecordFilterOptions>({
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
    try {
      const startDate = moment(filters.startDate)
      const endDate = moment(filters.endDate).add(1, 'days').toDate();
      const response = await apiService.searchRecords({
        filter: {
          operationId: filters.operationId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        pagination: {
          page: currentPage,
          pageSize: 10,
        }
      })
      setRecords(response);
      setTotalPages(response.pagination.pageTotal);
    } catch (error) {
      console.error(error)
    }
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

  // const handleFilterSubmit = async () => {
  //   await fetchRecords()
  //   setCurrentPage(1);
  // };

  const handlePageChange = (_: any, page: number) => {
    setCurrentPage(page);
  };

  // const handleFilterSubmit = (event: any) => {
  //   fetchOperations();
  // }

  return (
      <Container >
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
              {/* <Grid item>
                <Button variant="contained" onClick={handleFilterSubmit}>Apply</Button>
              </Grid> */}
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
              {records?.records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.operationName}</TableCell>
                  <TableCell>{record.amount}</TableCell>
                  <TableCell>{record.userBalance}</TableCell>
                  <TableCell>{record.operationResponse}</TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()} {new Date(record.date).toLocaleTimeString('en-us', {hour12: false})}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            boundaryCount={2}
            siblingCount={0}
            color="primary"
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: 20,
            }}
          />
        </div>
      </Container>
  );
};
