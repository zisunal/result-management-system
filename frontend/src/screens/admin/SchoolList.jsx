import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Checkbox,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Block as BlockIcon,
  CheckCircle as UnblockIcon
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
    },
  },
});

const initialSchools = [
  { id: 1, name: 'Springfield Elementary School', location: 'Springfield', type: 'Public', isBlocked: false },
  { id: 2, name: 'Riverdale High School', location: 'Riverdale', type: 'Public', isBlocked: false },
  { id: 3, name: 'Sunnydale High School', location: 'Sunnydale', type: 'Public', isBlocked: true },
  { id: 4, name: 'Xavier\'s School for Gifted Youngsters', location: 'Westchester County', type: 'Private', isBlocked: false },
];

export default function SchoolList() {
  const [schools, setSchools] = useState(initialSchools);
  const [editSchool, setEditSchool] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteSchool, setDeleteSchool] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blockSchool, setBlockSchool] = useState(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [isBulkBlockModalOpen, setIsBulkBlockModalOpen] = useState(false);

  const handleEditClick = (school) => {
    setEditSchool(school);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditSchool(null);
    setIsEditModalOpen(false);
  };

  const handleEditSave = () => {
    setSchools(schools.map(school => school.id === editSchool.id ? editSchool : school));
    setIsEditModalOpen(false);
    setSnackbar({ open: true, message: 'School updated successfully!', severity: 'success' });
  };

  const handleDeleteClick = (school) => {
    setDeleteSchool(school);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteSchool(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setSchools(schools.filter(school => school.id !== deleteSchool.id));
    setIsDeleteModalOpen(false);
    setSnackbar({ open: true, message: 'School deleted successfully!', severity: 'success' });
  };

  const handleBlockClick = (school) => {
    setBlockSchool(school);
    setIsBlockModalOpen(true);
  };

  const handleBlockClose = () => {
    setBlockSchool(null);
    setIsBlockModalOpen(false);
  };

  const handleBlockConfirm = () => {
    setSchools(schools.map(school => {
      if (school.id === blockSchool.id) {
        const newStatus = !school.isBlocked;
        return { ...school, isBlocked: newStatus };
      }
      return school;
    }));
    setIsBlockModalOpen(false);
    setSnackbar({ 
      open: true, 
      message: `School ${blockSchool.isBlocked ? 'unblocked' : 'blocked'} successfully!`, 
      severity: 'success' 
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedSchools(schools.map(school => school.id));
    } else {
      setSelectedSchools([]);
    }
  };

  const handleSelectSchool = (event, schoolId) => {
    if (event.target.checked) {
      setSelectedSchools([...selectedSchools, schoolId]);
    } else {
      setSelectedSchools(selectedSchools.filter(id => id !== schoolId));
    }
  };

  const handleBulkDeleteClick = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const handleBulkDeleteClose = () => {
    setIsBulkDeleteModalOpen(false);
  };

  const handleBulkDeleteConfirm = () => {
    setSchools(schools.filter(school => !selectedSchools.includes(school.id)));
    setSelectedSchools([]);
    setIsBulkDeleteModalOpen(false);
    setSnackbar({ open: true, message: 'Selected schools deleted successfully!', severity: 'success' });
  };

  const handleBulkBlockClick = () => {
    setIsBulkBlockModalOpen(true);
  };

  const handleBulkBlockClose = () => {
    setIsBulkBlockModalOpen(false);
  };

  const handleBulkBlockConfirm = (block) => {
    setSchools(schools.map(school => {
      if (selectedSchools.includes(school.id)) {
        return { ...school, isBlocked: block };
      }
      return school;
    }));
    setSelectedSchools([]);
    setIsBulkBlockModalOpen(false);
    setSnackbar({ 
      open: true, 
      message: `Selected schools ${block ? 'blocked' : 'unblocked'} successfully!`, 
      severity: 'success' 
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              School Profile Management
            </Typography>
            <Button color="inherit" onClick={() => window.location = '/admin'} startIcon={<DashboardIcon />}>Dashboard</Button>
            <Button color="inherit" onClick={() => window.location = '/admin/schools'} startIcon={<SchoolIcon />}>Schools</Button>
            <Button color="inherit" onClick={() => window.location = '/admin/settings'} startIcon={<SettingsIcon />}>Settings</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom component="h1">
            School List
          </Typography>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Button 
                variant="contained" 
                color="error" 
                onClick={handleBulkDeleteClick}
                disabled={selectedSchools.length === 0}
                style={{ marginRight: '1rem' }}
              >
                Bulk Delete
              </Button>
              <Button 
                variant="contained" 
                color="warning" 
                onClick={handleBulkBlockClick}
                disabled={selectedSchools.length === 0}
              >
                Bulk Block/Unblock
              </Button>
            </div>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedSchools.length > 0 && selectedSchools.length < schools.length}
                        checked={selectedSchools.length === schools.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schools.map((school) => (
                    <TableRow key={school.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedSchools.includes(school.id)}
                          onChange={(event) => handleSelectSchool(event, school.id)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {school.name}
                      </TableCell>
                      <TableCell>{school.location}</TableCell>
                      <TableCell>{school.type}</TableCell>
                      <TableCell>
                        <Typography color={school.isBlocked ? 'error' : 'success'}>
                          {school.isBlocked ? 'Blocked' : 'Active'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEditClick(school)} color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDeleteClick(school)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={school.isBlocked ? "Unblock" : "Block"}>
                          <IconButton 
                            onClick={() => handleBlockClick(school)} 
                            color={school.isBlocked ? 'success' : 'warning'}
                          >
                            {school.isBlocked ? <UnblockIcon /> : <BlockIcon />}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>

        <Paper sx={{ marginTop: 'auto' }} component="footer" square variant="outlined">
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
              © 2023 School Profile Management System. All rights reserved.
            </Typography>
          </Container>
        </Paper>

        {/* Edit School Modal */}
        <Dialog open={isEditModalOpen} onClose={handleEditClose}>
          <DialogTitle>Edit School</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="School Name"
              type="text"
              fullWidth
              variant="outlined"
              value={editSchool?.name || ''}
              onChange={(e) => setEditSchool({ ...editSchool, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
              value={editSchool?.location || ''}
              onChange={(e) => setEditSchool({ ...editSchool, location: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Type"
              type="text"
              fullWidth
              variant="outlined"
              value={editSchool?.type || ''}
              onChange={(e) => setEditSchool({ ...editSchool, type: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog
          open={isDeleteModalOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {deleteSchool?.name}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Block/Unblock Confirmation Modal */}
        <Dialog
          open={isBlockModalOpen}
          onClose={handleBlockClose}
          aria-labelledby="block-dialog-title"
          aria-describedby="block-dialog-description"
        >
          <DialogTitle id="block-dialog-title">
            {blockSchool?.isBlocked ? "Confirm Unblock" : "Confirm Block"}
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to {blockSchool?.isBlocked ? "unblock" : "block"} {blockSchool?.name}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBlockClose}>Cancel</Button>
            <Button 
              onClick={handleBlockConfirm} 
              color={blockSchool?.isBlocked ? "success" : "warning"} 
              variant="contained" 
              autoFocus
            >
              {blockSchool?.isBlocked ? "Unblock" : "Block"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bulk Delete Confirmation Modal */}
        <Dialog
          open={isBulkDeleteModalOpen}
          onClose={handleBulkDeleteClose}
          aria-labelledby="bulk-delete-dialog-title"
          aria-describedby="bulk-delete-dialog-description"
        >
          <DialogTitle id="bulk-delete-dialog-title">
            Confirm Bulk Deletion
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {selectedSchools.length} selected schools? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBulkDeleteClose}>Cancel</Button>
            <Button onClick={handleBulkDeleteConfirm} color="error" variant="contained" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bulk Block/Unblock Confirmation Modal */}
        <Dialog
          open={isBulkBlockModalOpen}
          onClose={handleBulkBlockClose}
          aria-labelledby="bulk-block-dialog-title"
          aria-describedby="bulk-block-dialog-description"
        >
          <DialogTitle id="bulk-block-dialog-title">
            Confirm Bulk Block/Unblock
          </DialogTitle>
          <DialogContent>
            <Typography>
              Choose an action for the {selectedSchools.length} selected schools:
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBulkBlockClose}>Cancel</Button>
            <Button onClick={() => handleBulkBlockConfirm(true)} color="warning" variant="contained">
              Block
            </Button>
            <Button onClick={() => handleBulkBlockConfirm(false)} color="success" variant="contained">
              Unblock
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}