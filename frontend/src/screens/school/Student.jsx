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
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import SchoolNav from '../../components/SchoolNav';

function StudentManagement() {
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', grade: '10th', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: '11th', status: 'Active' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', grade: '9th', status: 'Inactive' },
    ]);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '' });
    const [editStudent, setEditStudent] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const [selected, setSelected] = useState([]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = (student) => {
        setEditStudent(student);
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);
    const handleConfirmOpen = (action, id = null) => {
        setConfirmAction({ action, id });
        setConfirmOpen(true);
    };
    const handleConfirmClose = () => setConfirmOpen(false);

    const handleAddStudent = () => {
        setStudents([...students, { ...newStudent, id: students.length + 1, status: 'Active' }]);
        setNewStudent({ name: '', email: '', grade: '' });
        handleClose();
        showSnackbar('Student added successfully', 'success');
    };

    const handleEditStudent = () => {
        setStudents(students.map(s => s.id === editStudent.id ? editStudent : s));
        handleEditClose();
        showSnackbar('Student updated successfully', 'success');
    };

    const handleDeleteStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
        showSnackbar('Student deleted successfully', 'success');
    };

    const handleToggleStatus = (id) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
        showSnackbar('Student status updated successfully', 'success');
    };

    const handleBulkAction = (action) => {
        let updatedStudents;
        switch (action) {
        case 'delete':
            updatedStudents = students.filter(s => !selected.includes(s.id));
            break;
        case 'activate':
            updatedStudents = students.map(s => selected.includes(s.id) ? { ...s, status: 'Active' } : s);
            break;
        case 'deactivate':
            updatedStudents = students.map(s => selected.includes(s.id) ? { ...s, status: 'Inactive' } : s);
            break;
        default:
            return;
        }
        setStudents(updatedStudents);
        setSelected([]);
        showSnackbar(`Bulk ${action} completed successfully`, 'success');
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
        setSelected(students.map(s => s.id));
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
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const handleEditInputChange = (e) => {
        setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <SchoolNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
            <Toolbar />
            <Typography variant="h4" gutterBottom>
            Student Management
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Add New Student
            </Button>
            <Box>
                <Button variant="outlined" onClick={() => handleBulkAction('delete')} disabled={selected.length === 0}>
                Bulk Delete
                </Button>
                <Button variant="outlined" onClick={() => handleBulkAction('activate')} disabled={selected.length === 0} sx={{ ml: 1 }}>
                Bulk Activate
                </Button>
                <Button variant="outlined" onClick={() => handleBulkAction('deactivate')} disabled={selected.length === 0} sx={{ ml: 1 }}>
                Bulk Deactivate
                </Button>
            </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={selected.length > 0 && selected.length < students.length}
                        checked={students.length > 0 && selected.length === students.length}
                        onChange={handleSelectAll}
                    />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {students.map((student) => (
                    <TableRow key={student.id}>
                    <TableCell padding="checkbox">
                        <Checkbox
                        checked={selected.indexOf(student.id) !== -1}
                        onChange={() => handleSelect(student.id)}
                        />
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.status}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => handleEditOpen(student)} size="small">
                        <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleConfirmOpen('delete', student.id)} size="small">
                        <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleConfirmOpen('toggleStatus', student.id)} size="small">
                        {student.status === 'Active' ? <BlockIcon /> : <CheckCircleIcon />}
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={newStudent.name}
                onChange={handleInputChange}
                />
                <TextField
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={newStudent.email}
                onChange={handleInputChange}
                />
                <TextField
                margin="dense"
                name="grade"
                label="Grade"
                type="text"
                fullWidth
                variant="standard"
                value={newStudent.grade}
                onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddStudent}>Add</Button>
            </DialogActions>
            </Dialog>

            <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={editStudent?.name || ''}
                onChange={handleEditInputChange}
                />
                <TextField
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={editStudent?.email || ''}
                onChange={handleEditInputChange}
                />
                <TextField
                margin="dense"
                name="grade"
                label="Grade"
                type="text"
                fullWidth
                variant="standard"
                value={editStudent?.grade || ''}
                onChange={handleEditInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleEditStudent}>Save</Button>
            </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
                <Typography>
                Are you sure you want to {confirmAction?.action === 'delete' ? 'delete' : 'change the status of'} this student?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmClose}>Cancel</Button>
                <Button onClick={() => {
                if (confirmAction?.action === 'delete') {
                    handleDeleteStudent(confirmAction.id);
                } else if (confirmAction?.action === 'toggleStatus') {
                    handleToggleStatus(confirmAction.id);
                }
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

export default StudentManagement;