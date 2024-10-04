import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  TextField,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Save as SaveIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon
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

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    language: 'en',
    dataRetentionPeriod: 30,
    autoApproveSchools: false,
    maxSchoolsPerPage: 10
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
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
          <Typography variant="h4" gutterBottom component="h1">
            Admin Settings
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Language Settings
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="language-select-label">Language</InputLabel>
                  <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={settings.language}
                    label="Language"
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Data Management
                </Typography>
                <TextField
                  fullWidth
                  label="Data Retention Period (days)"
                  type="number"
                  value={settings.dataRetentionPeriod}
                  onChange={(e) => handleSettingChange('dataRetentionPeriod', parseInt(e.target.value))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  School Approval
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoApproveSchools}
                      onChange={(e) => handleSettingChange('autoApproveSchools', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Auto-approve new schools"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Display Settings
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="schools-per-page-label">Schools per page</InputLabel>
                  <Select
                    labelId="schools-per-page-label"
                    id="schools-per-page-select"
                    value={settings.maxSchoolsPerPage}
                    label="Schools per page"
                    onChange={(e) => handleSettingChange('maxSchoolsPerPage', e.target.value)}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSettings}
                  >
                    Save Settings
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Paper sx={{ marginTop: 'auto' }} component="footer" square variant="outlined">
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
              © 2024 School Profile Management System. All rights reserved.
            </Typography>
          </Container>
        </Paper>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}