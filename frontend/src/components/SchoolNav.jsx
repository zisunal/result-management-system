import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Create as CreateIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/school-admin' },
  { text: 'Students', icon: <PeopleIcon />, path: '/school-admin/students' },
  { text: 'Teachers', icon: <SchoolIcon />, path: '/school-admin/teachers' },
  { text: 'Courses', icon: <BookIcon />, path: '/school-admin/courses' },
  { text: 'Subjects', icon: <BookIcon />, path: '/school-admin/subjects' },
  { text: 'Assignments', icon: <AssignmentIcon />, path: '/school-admin/assignments' },
  { text: 'Exams', icon: <CreateIcon />, path: '/school-admin/exams' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/school-admin/settings' },
];

function SchoolNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={RouterLink} to={item.path} onClick={isMobile ? handleDrawerToggle : undefined}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            School Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <nav aria-label="main navigation">
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </nav>
    </>
  );
}

export default SchoolNav;