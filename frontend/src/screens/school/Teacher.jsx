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

function TeacherManagement() {
    const [teachers, setTeachers] = useState([
        { id: 1, name: 'Dr. Smith', email: 'smith@example.com', subject: 'Mathematics', status: 'Active' },
        { id: 2, name: 'Prof. Johnson', email: 'johnson@example.com', subject: 'Physics', status: 'Active' },
        { id: 3, name: 'Ms. Davis', email: 'davis@example.com', subject: 'English', status: 'Inactive' },
    ]);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
    const [editTeacher, setEditTeacher] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    const [selected, setSelected] = useState([]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = (teacher) => {
        setEditTeacher(teacher);
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);
    const handleConfirmOpen = (action, id = null) => {
        setConfirmAction({ action, id });
        setConfirmOpen(true);
    };
    const handleConfirmClose = () => setConfirmOpen(false);

    const handleAddTeacher = () => {
        setTeachers([...teachers, { ...newTeacher, id: teachers.length + 1, status: 'Active' }]);
        setNewTeacher({ name: '', email: '', subject: '' });
        handleClose();
        showSnackbar('Teacher added successfully', 'success');
    };

    const handleEditTeacher = () => {
        setTeachers(teachers.map(t => t.id === editTeacher.id ? editTeacher : t));
        handleEditClose();
        showSnackbar('Teacher updated successfully', 'success');
    };

    const handleDeleteTeacher = (id) => {
        setTeachers(teachers.filter(t => t.id !== id));
        showSnackbar('Teacher deleted successfully', 'success');
    };

    const handleToggleStatus = (id) => {
        setTeachers(teachers.map(t => t.id === id ? { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' } : t));
        showSnackbar('Teacher status updated successfully', 'success');
    };

    const handleBulkAction = (action) => {
        let updatedTeachers;
        switch (action) {
        case 'delete':
            updatedTeachers = teachers.filter(t => !selected.includes(t.id));
            break;
        case 'activate':
            updatedTeachers = teachers.map(t => selected.includes(t.id) ? { ...t, status: 'Active' } : t);
            break;
        case 'deactivate':
            updatedTeachers = teachers.map(t => selected.includes(t.id) ? { ...t, status: 'Inactive' } : t);
            break;
        default:
            return;
        }
        setTeachers(updatedTeachers);
        setSelected([]);
        showSnackbar(`Bulk ${action} completed successfully`, 'success');
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
        setSelected(teachers.map(t => t.id));
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
        setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
    };

    const handleEditInputChange = (e) => {
        setEditTeacher({ ...editTeacher, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <SchoolNav />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
                <Toolbar />
                <Typography variant="h4" gutterBottom>
                Teacher Management
                </Typography>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
                        Add New Teacher
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
                                indeterminate={selected.length > 0 && selected.length < teachers.length}
                                checked={teachers.length > 0 && selected.length === teachers.length}
                                onChange={handleSelectAll}
                            />
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher.id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                checked={selected.indexOf(teacher.id) !== -1}
                                onChange={() => handleSelect(teacher.id)}
                                />
                            </TableCell>
                            <TableCell>{teacher.id}</TableCell>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.subject}</TableCell>
                            <TableCell>{teacher.status}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEditOpen(teacher)} size="small">
                                <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleConfirmOpen('delete', teacher.id)} size="small">
                                <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => handleConfirmOpen('toggleStatus', teacher.id)} size="small">
                                {teacher.status === 'Active' ? <BlockIcon /> : <CheckCircleIcon />}
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Teacher</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newTeacher.name}
                        onChange={handleInputChange}
                        />
                        <TextField
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={newTeacher.email}
                        onChange={handleInputChange}
                        />
                        <TextField
                        margin="dense"
                        name="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newTeacher.subject}
                        onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleAddTeacher}>Add</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={editOpen} onClose={handleEditClose}>
                    <DialogTitle>Edit Teacher</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editTeacher?.name || ''}
                        onChange={handleEditInputChange}
                        />
                        <TextField
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={editTeacher?.email || ''}
                        onChange={handleEditInputChange}
                        />
                        <TextField
                        margin="dense"
                        name="subject"
                        label="Subject"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editTeacher?.subject || ''}
                        onChange={handleEditInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button onClick={handleEditTeacher}>Save</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogContent>
                        <Typography>
                        Are you sure you want to {confirmAction?.action === 'delete' ? 'delete' : 'change the status of'} this teacher?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmClose}>Cancel</Button>
                        <Button onClick={() => {
                        if (confirmAction?.action === 'delete') {
                            handleDeleteTeacher(confirmAction.id);
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

export default TeacherManagement;