import React, { useState } from 'react';
import {
  Box,
  Typography,
  Toolbar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import SchoolNav from '../../components/SchoolNav';

function SubjectManagement() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Algebra', department: 'Mathematics', code: 'MATH101' },
    { id: 2, name: 'Classical Mechanics', department: 'Physics', code: 'PHYS201' },
    { id: 3, name: 'British Literature', department: 'English', code: 'ENGL301' },
  ]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newSubject, setNewSubject] = useState({ name: '', department: '', code: '' });
  const [editSubject, setEditSubject] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selected, setSelected] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (subject) => {
    setEditSubject(subject);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleConfirmOpen = (action, id = null) => {
    setConfirmAction({ action, id });
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => setConfirmOpen(false);

  const handleAddSubject = () => {
    setSubjects([...subjects, { ...newSubject, id: subjects.length + 1 }]);
    setNewSubject({ name: '', department: '', code: '' });
    handleClose();
    showSnackbar('Subject added successfully', 'success');
  };

  const handleEditSubject = () => {
    setSubjects(subjects.map(s => s.id === editSubject.id ? editSubject : s));
    handleEditClose();
    showSnackbar('Subject updated successfully', 'success');
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
    showSnackbar('Subject deleted successfully', 'success');
  };

  const handleBulkDelete = () => {
    setSubjects(subjects.filter(s => !selected.includes(s.id)));
    setSelected([]);
    showSnackbar('Selected subjects deleted successfully', 'success');
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(subjects.map(s => s.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleInputChange = (e) => {
    setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditSubject({ ...editSubject, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SchoolNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Subject Management
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add New Subject
          </Button>
          <Button variant="outlined" onClick={handleBulkDelete} disabled={selected.length === 0}>
            Bulk Delete
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < subjects.length}
                    checked={subjects.length > 0 && selected.length === subjects.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(subject.id) !== -1}
                      onChange={() => handleSelect(subject.id)}
                    />
                  </TableCell>
                  <TableCell>{subject.id}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.department}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(subject)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleConfirmOpen('delete', subject.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Subject Name"
              type="text"
              fullWidth
              variant="standard"
              value={newSubject.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="department"
              label="Department"
              type="text"
              fullWidth
              variant="standard"
              value={newSubject.department}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="code"
              label="Subject Code"
              type="text"
              fullWidth
              variant="standard"
              value={newSubject.code}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddSubject}>Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Subject Name"
              type="text"
              fullWidth
              variant="standard"
              value={editSubject?.name || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="department"
              label="Department"
              type="text"
              fullWidth
              variant="standard"
              value={editSubject?.department || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="code"
              label="Subject Code"
              type="text"
              fullWidth
              variant="standard"
              value={editSubject?.code || ''}
              onChange={handleEditInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSubject}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this subject?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose}>Cancel</Button>
            <Button onClick={() => {
              handleDeleteSubject(confirmAction.id);
              handleConfirmClose();
            }} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default SubjectManagement;