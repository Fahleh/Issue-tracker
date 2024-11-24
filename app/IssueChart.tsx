'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  statusCount: { open: number; inProgress: number; closed: number };
}

const IssueChart = ({ statusCount: { open, inProgress, closed } }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} >
        <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke='black' />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
