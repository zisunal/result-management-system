import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Toolbar,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import SchoolNav from '../../components/SchoolNav';

function Dashboard() {
  const summaryItems = [
    { title: 'Total Students', value: 1234, icon: <PeopleIcon /> },
    { title: 'Total Teachers', value: 56, icon: <SchoolIcon /> },
    { title: 'Total Courses', value: 24, icon: <BookIcon /> },
    { title: 'Upcoming Exams', value: 5, icon: <AssignmentIcon /> },
  ];

  const recentActivities = [
    { text: 'New student registered', secondary: '2 hours ago' },
    { text: 'Exam results published for CS101', secondary: '5 hours ago' },
    { text: 'New course added: Advanced Mathematics', secondary: '1 day ago' },
    { text: 'Teacher profile updated', secondary: '2 days ago' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <SchoolNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: `240px` },
        }}
      >
        <Toolbar /> {/* This toolbar is for spacing below the AppBar */}
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {summaryItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 140,
                }}
              >
                {item.icon}
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography component="p" variant="h4">
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText primary={activity.text} secondary={activity.secondary} />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <List>
                <ListItem button>
                  <ListItemText primary="Add New Student" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Create New Exam" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Assign Teachers to Courses" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="View Exam Results" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;