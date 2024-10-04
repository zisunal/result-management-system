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

function CourseManagement() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics 101', semester: 'Fall 2023', credits: 3 },
    { id: 2, name: 'Introduction to Physics', semester: 'Spring 2024', credits: 4 },
    { id: 3, name: 'World Literature', semester: 'Fall 2023', credits: 3 },
  ]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newCourse, setNewCourse] = useState({ name: '', semester: '', credits: '' });
  const [editCourse, setEditCourse] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selected, setSelected] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (course) => {
    setEditCourse(course);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleConfirmOpen = (action, id = null) => {
    setConfirmAction({ action, id });
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => setConfirmOpen(false);

  const handleAddCourse = () => {
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
    setNewCourse({ name: '', semester: '', credits: '' });
    handleClose();
    showSnackbar('Course added successfully', 'success');
  };

  const handleEditCourse = () => {
    setCourses(courses.map(c => c.id === editCourse.id ? editCourse : c));
    handleEditClose();
    showSnackbar('Course updated successfully', 'success');
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    showSnackbar('Course deleted successfully', 'success');
  };

  const handleBulkDelete = () => {
    setCourses(courses.filter(c => !selected.includes(c.id)));
    setSelected([]);
    showSnackbar('Selected courses deleted successfully', 'success');
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(courses.map(c => c.id));
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
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SchoolNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Course Management
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add New Course
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
                    indeterminate={selected.length > 0 && selected.length < courses.length}
                    checked={courses.length > 0 && selected.length === courses.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Credits</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(course.id) !== -1}
                      onChange={() => handleSelect(course.id)}
                    />
                  </TableCell>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(course)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleConfirmOpen('delete', course.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Course Name"
              type="text"
              fullWidth
              variant="standard"
              value={newCourse.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="semester"
              label="Semester"
              type="text"
              fullWidth
              variant="standard"
              value={newCourse.semester}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="credits"
              label="Credits"
              type="number"
              fullWidth
              variant="standard"
              value={newCourse.credits}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddCourse}>Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Course Name"
              type="text"
              fullWidth
              variant="standard"
              value={editCourse?.name || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="semester"
              label="Semester"
              type="text"
              fullWidth
              variant="standard"
              value={editCourse?.semester || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="credits"
              label="Credits"
              type="number"
              fullWidth
              variant="standard"
              value={editCourse?.credits || ''}
              onChange={handleEditInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditCourse}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this course?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose}>Cancel</Button>
            <Button onClick={() => {
              handleDeleteCourse(confirmAction.id);
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

export default CourseManagement;