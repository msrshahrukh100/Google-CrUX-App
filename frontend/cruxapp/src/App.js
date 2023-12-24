import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import WebsiteInput from './WebsiteInput';
import Divider from '@mui/material/Divider';
import DataTable from './DataTable';

export default function App() {
  const [websiteCount, setWebsiteCount] = useState(1);
  const [metricsData, setMetricsData] = useState({});

  const handleMetricsData = (key, value) => {
    setMetricsData({
      ...metricsData,
      [key]: value
    })
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container maxWidth="lg" sx={{ paddingTop: 5 }}>

        {[...Array(websiteCount)].map((_, i) => <WebsiteInput handleMetricsData={handleMetricsData} key={`input-${i}`} />)}

        <Button variant="text" sx={{ marginTop: 5, marginBottom: 5 }} onClick={() => setWebsiteCount(websiteCount + 1)}>Add new Website</Button>

        <Divider />
        <DataTable metricsData={metricsData} />
      </Container>

    </React.Fragment>
  );
}
