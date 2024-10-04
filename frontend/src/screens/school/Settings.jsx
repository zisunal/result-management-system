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
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import SchoolNav from '../../components/SchoolNav';

function Settings() {
  const [gradeRanges, setGradeRanges] = useState([
    { id: 1, grade: 'A', minMarks: 90, maxMarks: 100, points: 4.0 },
    { id: 2, grade: 'B', minMarks: 80, maxMarks: 89, points: 3.0 },
    { id: 3, grade: 'C', minMarks: 70, maxMarks: 79, points: 2.0 },
    { id: 4, grade: 'D', minMarks: 60, maxMarks: 69, points: 1.0 },
    { id: 5, grade: 'F', minMarks: 0, maxMarks: 59, points: 0.0 },
  ]);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newGradeRange, setNewGradeRange] = useState({ grade: '', minMarks: '', maxMarks: '', points: '' });
  const [editGradeRange, setEditGradeRange] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (gradeRange) => {
    setEditGradeRange(gradeRange);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);
  const handleConfirmOpen = (action, id = null) => {
    setConfirmAction({ action, id });
    setConfirmOpen(true);
  };
  const handleConfirmClose = () => setConfirmOpen(false);

  const handleAddGradeRange = () => {
    setGradeRanges([...gradeRanges, { ...newGradeRange, id: gradeRanges.length + 1 }]);
    setNewGradeRange({ grade: '', minMarks: '', maxMarks: '', points: '' });
    handleClose();
    showSnackbar('Grade range added successfully', 'success');
  };

  const handleEditGradeRange = () => {
    setGradeRanges(gradeRanges.map(gr => gr.id === editGradeRange.id ? editGradeRange : gr));
    handleEditClose();
    showSnackbar('Grade range updated successfully', 'success');
  };

  const handleDeleteGradeRange = (id) => {
    setGradeRanges(gradeRanges.filter(gr => gr.id !== id));
    showSnackbar('Grade range deleted successfully', 'success');
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
    setNewGradeRange({ ...newGradeRange, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditGradeRange({ ...editGradeRange, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SchoolNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, ml: { sm: `240px` } }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Grade Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{ mb: 2 }}
        >
          Add New Grade Range
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grade</TableCell>
                <TableCell>Min Marks</TableCell>
                <TableCell>Max Marks</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gradeRanges.map((gradeRange) => (
                <TableRow key={gradeRange.id}>
                  <TableCell>{gradeRange.grade}</TableCell>
                  <TableCell>{gradeRange.minMarks}</TableCell>
                  <TableCell>{gradeRange.maxMarks}</TableCell>
                  <TableCell>{gradeRange.points}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(gradeRange)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleConfirmOpen('delete', gradeRange.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Grade Range</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="grade"
              label="Grade"
              type="text"
              fullWidth
              variant="standard"
              value={newGradeRange.grade}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="minMarks"
              label="Minimum Marks"
              type="number"
              fullWidth
              variant="standard"
              value={newGradeRange.minMarks}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="maxMarks"
              label="Maximum Marks"
              type="number"
              fullWidth
              variant="standard"
              value={newGradeRange.maxMarks}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="points"
              label="Points"
              type="number"
              fullWidth
              variant="standard"
              value={newGradeRange.points}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddGradeRange}>Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Grade Range</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="grade"
              label="Grade"
              type="text"
              fullWidth
              variant="standard"
              value={editGradeRange?.grade || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="minMarks"
              label="Minimum Marks"
              type="number"
              fullWidth
              variant="standard"
              value={editGradeRange?.minMarks || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="maxMarks"
              label="Maximum Marks"
              type="number"
              fullWidth
              variant="standard"
              value={editGradeRange?.maxMarks || ''}
              onChange={handleEditInputChange}
            />
            <TextField
              margin="dense"
              name="points"
              label="Points"
              type="number"
              fullWidth
              variant="standard"
              value={editGradeRange?.points || ''}
              onChange={handleEditInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditGradeRange}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this grade range?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose}>Cancel</Button>
            <Button onClick={() => {
              handleDeleteGradeRange(confirmAction.id);
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

export default Settings;