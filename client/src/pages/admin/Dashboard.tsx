import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { metricsApi } from '@api/metrics.api';
import { DashboardCharts } from '@components/admin/DashboardCharts';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { People, Assignment, LocalHospital, Warning } from '@mui/icons-material';

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: metricsApi.getDashboardSummary,
  });

  if (isLoading) return <LoadingSpinner />;

  const summary = data?.data || {};

  const statsCards = [
    { title: 'Total Donors', value: summary.totalDonors, icon: <People />, color: 'primary' },
    { title: 'Pending Requests', value: summary.pendingRequests, icon: <Assignment />, color: 'warning' },
    { title: 'Total Units', value: summary.totalInventoryUnits, icon: <LocalHospital />, color: 'success' },
    { title: 'Low Stock Items', value: summary.lowStockCount, icon: <Warning />, color: 'error' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="stat-card">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="body2" color="textSecondary">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" className="font-bold mt-1">
                      {card.value}
                    </Typography>
                  </div>
                  <div className={`text-${card.color}-main`}>{card.icon}</div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <DashboardCharts />
    </Container>
  );
}
