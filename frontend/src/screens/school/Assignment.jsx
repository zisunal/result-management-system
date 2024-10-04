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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import SchoolNav from '../../components/SchoolNav';

function CourseAssignment() {
    const [assignments, setAssignments] = useState([
        { id: 1, course: 'Mathematics 101', teacher: 'Dr. Smith', subject: 'Algebra' },
        { id: 2, course: 'Physics 201', teacher: 'Prof. Johnson', subject: 'Classical Mechanics' },
        { id: 3, course: 'English 301', teacher: 'Ms. Davis', subject: 'British Literature' },
    ]);

    const [courses] = useState([
        'Mathematics 101',
        'Physics 201',
        'English 301',
        'Chemistry 101',
        'Biology 201',
    ]);

    const [teachers] = useState([
        'Dr. Smith',
        'Prof. Johnson',
        'Ms. Davis',
        'Dr. Brown',
        'Prof. Wilson',
    ]);

    const [subjects] = useState([
        'Algebra',
        'Classical Mechanics',
        'British Literature',
        'Organic Chemistry',
        'Genetics',
    ]);

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [newAssignment, setNewAssignment] = useState({ course: '', teacher: '', subject: '' });
    const [editAssignment, setEditAssignment] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = (assignment) => {
        setEditAssignment(assignment);
        setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);
    const handleConfirmOpen = (action, id = null) => {
        setConfirmAction({ action, id });
        setConfirmOpen(true);
    };
    const handleConfirmClose = () => setConfirmOpen(false);

    const handleAddAssignment = () => {
        setAssignments([...assignments, { ...newAssignment, id: assignments.length + 1 }]);
        setNewAssignment({ course: '', teacher: '', subject: '' });
        handleClose();
        showSnackbar('Assignment added successfully', 'success');
    };

    const handleEditAssignment = () => {
        setAssignments(assignments.map(a => a.id === editAssignment.id ? editAssignment : a));
        handleEditClose();
        showSnackbar('Assignment updated successfully', 'success');
    };

    const handleDeleteAssignment = (id) => {
        setAssignments(assignments.filter(a => a.id !== id));
        showSnackbar('Assignment deleted successfully', 'success');
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
        setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
    };

    const handleEditInputChange = (e) => {
        setEditAssignment({ ...editAssignment, [e.target.name]: e.target.value });
    };

    return (
        <Box sx={{ display: 'flex' }}>
        <SchoolNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
            <Toolbar />
            <Typography variant="h4" gutterBottom>
            Course Assignment
            </Typography>
            <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            sx={{ mb: 2 }}
            >
            Add New Assignment
            </Button>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                    <TableCell>{assignment.id}</TableCell>
                    <TableCell>{assignment.course}</TableCell>
                    <TableCell>{assignment.teacher}</TableCell>
                    <TableCell>{assignment.subject}</TableCell>
                    <TableCell>
                        <IconButton style={{color:'blue'}} onClick={() => handleEditOpen(assignment)} size="small">
                        <EditIcon />
                        </IconButton>
                        <IconButton style={{color:'darkred'}} onClick={() => handleConfirmOpen('delete', assignment.id)} size="small">
                        <DeleteIcon />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Assignment</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                <InputLabel id="course-label">Course</InputLabel>
                <Select
                    labelId="course-label"
                    name="course"
                    value={newAssignment.course}
                    onChange={handleInputChange}
                    label="Course"
                >
                    {courses.map((course) => (
                    <MenuItem key={course} value={course}>{course}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                <InputLabel id="teacher-label">Teacher</InputLabel>
                <Select
                    labelId="teacher-label"
                    name="teacher"
                    value={newAssignment.teacher}
                    onChange={handleInputChange}
                    label="Teacher"
                >
                    {teachers.map((teacher) => (
                    <MenuItem key={teacher} value={teacher}>{teacher}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                    labelId="subject-label"
                    name="subject"
                    value={newAssignment.subject}
                    onChange={handleInputChange}
                    label="Subject"
                >
                    {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddAssignment} variant='contained' color="primary.light">Add</Button>
            </DialogActions>
            </Dialog>

            <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Assignment</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                <InputLabel id="edit-course-label">Course</InputLabel>
                <Select
                    labelId="edit-course-label"
                    name="course"
                    value={editAssignment?.course || ''}
                    onChange={handleEditInputChange}
                    label="Course"
                >
                    {courses.map((course) => (
                    <MenuItem key={course} value={course}>{course}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                <InputLabel id="edit-teacher-label">Teacher</InputLabel>
                <Select
                    labelId="edit-teacher-label"
                    name="teacher"
                    value={editAssignment?.teacher || ''}
                    onChange={handleEditInputChange}
                    label="Teacher"
                >
                    {teachers.map((teacher) => (
                    <MenuItem key={teacher} value={teacher}>{teacher}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                <InputLabel id="edit-subject-label">Subject</InputLabel>
                <Select
                    labelId="edit-subject-label"
                    name="subject"
                    value={editAssignment?.subject || ''}
                    onChange={handleEditInputChange}
                    label="Subject"
                >
                    {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleEditAssignment}>Save</Button>
            </DialogActions>
            </Dialog>

            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent>
                <Typography>
                Are you sure you want to delete this assignment?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirmClose}>Cancel</Button>
                <Button onClick={() => {
                handleDeleteAssignment(confirmAction.id);
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

export default CourseAssignment;