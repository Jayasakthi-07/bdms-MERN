import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { metricsApi } from '@api/metrics.api';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { motion } from 'framer-motion';

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6'];

export const DashboardCharts: React.FC = () => {
  const { data: bloodGroupData } = useQuery({
    queryKey: ['bloodGroupDistribution'],
    queryFn: metricsApi.getBloodGroupDistribution,
  });

  const { data: inventoryData } = useQuery({
    queryKey: ['inventoryByBloodGroup'],
    queryFn: metricsApi.getInventoryByBloodGroup,
  });

  const { data: monthlyData } = useQuery({
    queryKey: ['monthlyDonations'],
    queryFn: () => metricsApi.getMonthlyDonations(12),
  });

  const { data: statusData } = useQuery({
    queryKey: ['requestStatus'],
    queryFn: metricsApi.getRequestStatus,
  });

  const bloodGroupChartData = bloodGroupData?.data?.map((item: any) => ({
    name: item._id,
    value: item.count,
  })) || [];

  const inventoryChartData = inventoryData?.data?.map((item: any) => ({
    bloodGroup: item._id,
    units: item.totalUnits,
    threshold: item.avgThreshold,
  })) || [];

  const monthlyChartData = monthlyData?.data?.map((item: any) => ({
    month: `${item.month}/${item.year}`,
    donations: item.count,
  })) || [];

  const statusChartData = statusData?.data?.map((item: any) => ({
    name: item._id,
    value: item.count,
  })) || [];

  return (
    <Grid container spacing={3}>
      {/* Blood Group Distribution */}
      <Grid item xs={12} lg={6}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Donor Blood Group Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bloodGroupChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bloodGroupChartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      {/* Blood Inventory by Group */}
      <Grid item xs={12} lg={6}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Blood Inventory by Group
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bloodGroup" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="units" fill="#ef4444" name="Available Units" />
                  <Bar dataKey="threshold" fill="#f59e0b" name="Low Stock Threshold" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      {/* Monthly Donations Trend */}
      <Grid item xs={12} lg={8}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Monthly Donations (Last 12 Months)
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>

      {/* Request Status Breakdown */}
      <Grid item xs={12} lg={4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="card">
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Request Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusChartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
};
