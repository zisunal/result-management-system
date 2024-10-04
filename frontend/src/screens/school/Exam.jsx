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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import SchoolNav from '../../components/SchoolNav';

function ExamManagement() {
  const [exams, setExams] = useState([
    { id: 1, name: 'Midterm Exam', subject: 'Mathematics', type: 'Midterm', totalMarks: 100 },
    { id: 2, name: 'Physics Final', subject: 'Physics', type: 'Final', totalMarks: 100 },
    { id: 3, name: 'English Essay', subject: 'English', type: 'Assignment', totalMarks: 50 },
  ]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newExam, setNewExam] = useState({ name: '', subject: '', type: '', totalMarks: '' });
  const [editExam, setEditExam] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selected, setSelected] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (exam) => {
    setEditExam(exam);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleConfirmOpen = (action, id = null) => {
    setConfirmAction({ action, id });
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => setConfirmOpen(false);

  const handleAddExam = () => {
    setExams([...exams, { ...newExam, id: exams.length + 1 }]);
    setNewExam({ name: '', subject: '', type: '', totalMarks: '' });
    handleClose();
    showSnackbar('Exam added successfully', 'success');
  };

  const handleEditExam = () => {
    setExams(exams.map(e => e.id === editExam.id ? editExam : e));
    handleEditClose();
    showSnackbar('Exam updated successfully', 'success');
  };

  const handleDeleteExam = (id) => {
    setExams(exams.filter(e => e.id !== id));
    showSnackbar('Exam deleted successfully', 'success');
  };

  const handleBulkDelete = () => {
    setExams(exams.filter(e => !selected.includes(e.id)));
    setSelected([]);
    showSnackbar('Selected exams deleted successfully', 'success');
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(exams.map(e => e.id));
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
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditExam({ ...editExam, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SchoolNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Exam Management
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add New Exam
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
                    indeterminate={selected.length > 0 && selected.length < exams.length}
                    checked={exams.length > 0 && selected.length === exams.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Total Marks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(exam.id) !== -1}
                      onChange={() => handleSelect(exam.id)}
                    />
                  </TableCell>
                  <TableCell>{exam.id}</TableCell>
                  <TableCell>{exam.name}</TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell>{exam.type}</TableCell>
                  <TableCell>{exam.totalMarks}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(exam)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleConfirmOpen('delete', exam.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Exam</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Exam Name"
              type="text"
              fullWidth
              variant="standard"
              value={newExam.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="subject"
              label="Subject"
              type="text"
              fullWidth
              variant="standard"
              value={newExam.subject}
              onChange={handleInputChange}
            />
            <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
              <InputLabel id="exam-type-label">Exam Type</InputLabel>
              <Select
                labelId="exam-type-label"
                name="type"
                value={newExam.type}
                onChange={handleInputChange}
                label="Exam Type"
              >
                <MenuItem value="Midterm">Midterm</MenuItem>
                <MenuItem value="Final">Final</MenuItem>
                <MenuItem value="Assignment">Assignment</MenuItem>
                <MenuItem value="Quiz">Quiz</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="totalMarks"
              label="Total Marks"
              type="number"
              fullWidth
              variant="standard"
              value={newExam.totalMarks}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddExam}>Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Exam</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Exam Name"
              type="text"
              fullWidth
              variant="standard"
              value={editExam?.name || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="subject"
              label="Subject"
              type="text"
              fullWidth
              variant="standard"
              value={editExam?.subject || ''}
              onChange={handleEditInputChange}
            />
            <FormControl fullWidth variant="standard" sx={{ mt: 1 }}>
              <InputLabel id="edit-exam-type-label">Exam Type</InputLabel>
              <Select
                labelId="edit-exam-type-label"
                name="type"
                value={editExam?.type || ''}
                onChange={handleEditInputChange}
                label="Exam Type"
              >
                <MenuItem value="Midterm">Midterm</MenuItem>
                <MenuItem value="Final">Final</MenuItem>
                <MenuItem value="Assignment">Assignment</MenuItem>
                <MenuItem value="Quiz">Quiz</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="totalMarks"
              label="Total Marks"
              type="number"
              fullWidth
              variant="standard"
              value={editExam?.totalMarks || ''}
              onChange={handleEditInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditExam}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this exam?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose}>Cancel</Button>
            <Button onClick={() => {
              handleDeleteExam(confirmAction.id);
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

export default ExamManagement;