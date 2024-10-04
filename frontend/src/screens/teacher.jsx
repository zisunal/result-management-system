import React, { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

function TeacherPanel() {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Mathematics',
      exams: [
        { 
          id: 1, 
          name: 'Midterm', 
          maxMarks: 50, 
          published: false,
          students: [
            { id: 1, name: 'John Doe', marks: null },
            { id: 2, name: 'Jane Smith', marks: null },
          ]
        },
        { 
          id: 2, 
          name: 'Final', 
          maxMarks: 100, 
          published: true,
          students: [
            { id: 1, name: 'John Doe', marks: 85 },
            { id: 2, name: 'Jane Smith', marks: 92 },
          ]
        },
      ],
    },
    {
      id: 2,
      name: 'Physics',
      exams: [
        { 
          id: 3, 
          name: 'Quiz 1', 
          maxMarks: 20, 
          published: false,
          students: [
            { id: 1, name: 'John Doe', marks: null },
            { id: 2, name: 'Jane Smith', marks: null },
          ]
        },
        { 
          id: 4, 
          name: 'Midterm', 
          maxMarks: 50, 
          published: false,
          students: [
            { id: 1, name: 'John Doe', marks: null },
            { id: 2, name: 'Jane Smith', marks: null },
          ]
        },
      ],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleClickOpen = (exam, student) => {
    setSelectedExam(exam);
    setSelectedStudent(student);
    setMarks(student.marks !== null ? student.marks.toString() : '');
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMarks('');
    setError('');
  };

  const validateMarks = () => {
    const marksNum = Number(marks);
    if (isNaN(marksNum)) {
      setError('Please enter a valid number');
      return false;
    }
    if (marksNum < 0) {
      setError('Marks cannot be negative');
      return false;
    }
    if (marksNum > selectedExam.maxMarks) {
      setError(`Marks cannot exceed the maximum of ${selectedExam.maxMarks}`);
      return false;
    }
    return true;
  };

  const handleSubmitMarks = () => {
    if (!validateMarks()) {
      return;
    }

    const updatedSubjects = subjects.map(subject => ({
      ...subject,
      exams: subject.exams.map(exam => {
        if (exam.id === selectedExam.id) {
          return {
            ...exam,
            students: exam.students.map(student => 
              student.id === selectedStudent.id ? { ...student, marks: Number(marks) } : student
            )
          };
        }
        return exam;
      })
    }));

    setSubjects(updatedSubjects);
    handleClose();
    showSnackbar('Marks submitted successfully', 'success');
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teacher Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Subjects and Exams
        </Typography>
        {subjects.map((subject) => (
          <Accordion key={subject.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{subject.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {subject.exams.map((exam) => (
                <Accordion key={exam.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{exam.name} (Max Marks: {exam.maxMarks})</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Marks</TableCell>
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {exam.students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.marks !== null ? student.marks : 'Not submitted'}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  onClick={() => handleClickOpen(exam, student)}
                                  disabled={exam.published}
                                >
                                  {student.marks !== null ? 'Edit Marks' : 'Submit Marks'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Submit Marks</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Subject: {subjects.find(s => s.exams.some(e => e.id === selectedExam?.id))?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Exam: {selectedExam?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Student: {selectedStudent?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Max Marks: {selectedExam?.maxMarks}
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Marks"
              type="number"
              fullWidth
              variant="standard"
              value={marks}
              onChange={(e) => {
                setMarks(e.target.value);
                setError('');
              }}
              inputProps={{ min: 0, max: selectedExam?.maxMarks }}
              error={!!error}
              helperText={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmitMarks}>Submit</Button>
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

export default TeacherPanel;