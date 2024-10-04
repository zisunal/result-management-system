import React, {useState, useEffect} from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardActions,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  InputAdornment,
  ClickAwayListener
} from '@mui/material';
import { 
    Search as SearchIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Dashboard as DashboardIcon,
    School as SchoolIcon,
    Settings as SettingsIcon,
    Clear as ClearIcon
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
  },
});

export default function AdminHome() {
  const [open, setOpen] = React.useState(false);
  const [schools, setSchools] = React.useState([
    { id: 1, name: 'Springfield Elementary School', location: 'Springfield' },
    { id: 2, name: 'Riverdale High School', location: 'Riverdale' },
    { id: 3, name: 'Sunnydale High School', location: 'Sunnydale' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = schools.filter(school => 
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleClickAway = () => {
    setSearchResults([]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              RMS
            </Typography>
            <Button color="inherit" onClick={() => window.location = '/admin'} startIcon={<DashboardIcon />}>Dashboard</Button>
            <Button color="inherit" onClick={() => window.location = '/admin/schools'} startIcon={<SchoolIcon />}>Schools</Button>
            <Button color="inherit" onClick={() => window.location = '/admin/settings'} startIcon={<SettingsIcon />}>Settings</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h4" color="primary" gutterBottom>
                  Welcome to School Profile Management
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph>
                  Create and manage school profiles from one central location.
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ position: 'relative' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for schools..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                        <InputAdornment position="end">
                        <IconButton onClick={handleClearSearch} edge="end">
                            <ClearIcon />
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                />
                {searchResults.length > 0 && (
                    <Paper 
                    elevation={3} 
                    sx={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        right: 0, 
                        zIndex: 1,
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}
                    >
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <List>
                        {searchResults.map((school) => (
                            <ListItem key={school.id} button>
                            <ListItemText
                                primary={school.name}
                                secondary={school.location}
                            />
                            </ListItem>
                        ))}
                        </List>
                    </ClickAwayListener>
                    </Paper>
                )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Total Schools
                </Typography>
                <Typography component="p" variant="h4">
                  {schools.length}
                </Typography>
                <Typography color="textSecondary" sx={{ flex: 1 }}>
                  Managed in the system
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Manage Schools
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={handleClickOpen}>
                    Add New School
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" color="primary" gutterBottom>
                School Profiles
              </Typography>
              <Paper>
                <List>
                  {schools.map((school, index) => (
                    <React.Fragment key={school.id}>
                      <ListItem
                        secondaryAction={
                          <>
                            <IconButton edge="end" aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemIcon>
                          <SchoolIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={school.name} 
                          secondary={school.location} 
                        />
                      </ListItem>
                      {index < schools.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Paper sx={{ marginTop: 'auto' }} component="footer" square variant="outlined">
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
              © 2023 School Profile Management System. All rights reserved.
            </Typography>
          </Container>
        </Paper>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New School</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="School Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} variant="contained" color="primary">Add School</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}