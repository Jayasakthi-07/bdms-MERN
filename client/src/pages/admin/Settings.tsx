import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Tab, Tabs, Box } from '@mui/material';
import { Person, Lock, Info } from '@mui/icons-material';
import { AdminProfileForm } from '@components/admin/AdminProfileForm';
import { AdminPasswordForm } from '@components/admin/AdminPasswordForm';
import { AdminAccountInfo } from '@components/admin/AdminAccountInfo';
import { motion } from 'framer-motion';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Settings() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography variant="h4" className="font-bold mb-6">
          Settings
        </Typography>

        <Card className="card">
          <CardContent>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                mb: 2,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  minHeight: 64,
                },
              }}
            >
              <Tab
                icon={<Person />}
                iconPosition="start"
                label="Profile"
                sx={{ gap: 1 }}
              />
              <Tab
                icon={<Lock />}
                iconPosition="start"
                label="Change Password"
                sx={{ gap: 1 }}
              />
              <Tab
                icon={<Info />}
                iconPosition="start"
                label="Account Information"
                sx={{ gap: 1 }}
              />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <AdminProfileForm />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <AdminPasswordForm />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <AdminAccountInfo />
            </TabPanel>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
