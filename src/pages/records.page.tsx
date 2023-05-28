import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Container, 
  Grid, 
  FormControl, 
  Pagination, 
  IconButton,
  TableSortLabel, 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OperationsDropdown } from '../components/operations-dropdown';
import { Operation } from '../types/operations.type';
import { apiService } from '../api/api.service';
import { RecordsSearchResponse } from '../types/records.type';
import { RecordFilterOptions } from '../api/request.types';
import moment from 'moment';
import { RecordDeleteDialog } from '../components/record-delete-dialog';

export const RecordsPage: React.FC = () => {

  const [operations, setOperations] = useState([] as Operation[]);
  const [records, setRecords] = useState<RecordsSearchResponse | null>(null);
  const [filters, setFilters] = useState<RecordFilterOptions>({
    operationId: 0,
    startDate: moment().subtract(1, 'week').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({key: 'dateCreated', direction: 'desc'});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting ] = useState(false);
  const [recordIdToBeDeleted, setRecordIdToBeDeleted ] = useState('');

  useEffect(() => {
    fetchRecords();
  }, [filters, currentPage, sortConfig]);

  useEffect(() => {
    fetchOperations();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await apiService.searchRecords({
        filter: {
          operationId: filters.operationId,
          startDate: moment(filters.startDate).toISOString(),
          endDate: moment(filters.endDate).add(1, 'days').toISOString(),
        },
        pagination: {
          page: currentPage,
          pageSize: 10,
        },
        sort: {
          sortBy: sortConfig.key,
          sortDirection: sortConfig.direction,
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

  const handleSortClick = (columnKey: string) => {
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      setSortConfig({ key: columnKey, direction: 'desc' });
    } else {
      setSortConfig({ key: columnKey, direction: 'asc' });
    }
  };

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
    if (name === "operationId") {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (_: any, page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (recordId: string) => {
    setRecordIdToBeDeleted(recordId);
    setIsDeleting(false)
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    try {
      await apiService.deleteRecord(recordIdToBeDeleted);
    } catch (err) {
      console.error(err);
    }
    setRecordIdToBeDeleted('');
    setIsDeleteModalOpen(false);
    fetchRecords();
  };
  
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const tableSortRender = (key: string, name: string) => {
    return (
      <TableSortLabel 
        active={sortConfig.key === key}
        onClick={() => handleSortClick(key)}
        direction={sortConfig.key === key ? sortConfig.direction : undefined}
      >
        {name}
      </TableSortLabel>
    )
  }
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
            </Grid>
          </FormControl>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{tableSortRender('operationId', 'Operation')}</TableCell>
                <TableCell>{tableSortRender('amount', 'Amount')}</TableCell>
                <TableCell>{tableSortRender('userBalance', 'Balance')}</TableCell>
                <TableCell>{tableSortRender('operationResponse', 'Operation Response')}</TableCell>
                <TableCell>{tableSortRender('dateCreated', 'Date')}</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records?.records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell style={{
                  }}>{record.operationName}</TableCell>
                  <TableCell>$ {record.amount}</TableCell>
                  <TableCell>$ {record.userBalance}</TableCell>
                  <TableCell><span style={{ 
                    background: 'grey', 
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                  }}>{record.operationResponse}</span></TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()} {new Date(record.date).toLocaleTimeString('en-us', {hour12: false})}</TableCell>
                  <TableCell>
                    <IconButton style={{ padding: 0 }} onClick={() => handleDelete(record.id)} >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <RecordDeleteDialog 
            isOpened={isDeleteModalOpen}
            isDeleting={isDeleting}
            onCancel={handleCancelDelete}
            onConfirmation={handleConfirmDelete}
          />
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
