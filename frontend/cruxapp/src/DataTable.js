import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const getTableRows = (metricsData) => {
    let newData = {};
    let metricsSelectMap = {};
    Object.keys(metricsData).map((website, index) => {
        const rows = Object.keys(metricsData[website]).map((metric, index) => {
            const v = metricsData[website][metric].percentiles.p75;
            const value = typeof v === 'string' ? parseFloat(v) : v;
            metricsSelectMap[metric] = true;
            return { metric, value: value }
        });
        newData[website] = rows;
    });

    return [newData, metricsSelectMap];
}

export default function DataTable({ metricsData }) {
    const [tableRows, defaultMetricSelectedMap] = getTableRows(metricsData);
    const [sort, setSort] = useState(false);
    const [metricSelectedMap, setMetricSelectedMap] = useState({});
    const [valuesGreaterThan, setValuesGreaterThan] = useState(0);

    useEffect(() => {
        setMetricSelectedMap(defaultMetricSelectedMap);
    }, [metricsData]);

    const toggleSelected = (key) => {
        setMetricSelectedMap({
            ...metricSelectedMap,
            [key]: !metricSelectedMap[key]
        })
    }

    const tables = Object.keys(tableRows).map((website, index) => {

        let rows = sort ? tableRows[website].sort((a, b) => a.value - b.value) : tableRows[website];

        return (
            <TableContainer component={Paper} key={`metrics-${website}`} sx={{ marginTop: 3, marginBottom: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Metrics for {website}</b></TableCell>
                            <TableCell align="right" sx={{ cursor: 'pointer' }} onClick={() => setSort(!sort)}><b>Value {sort ? "(sorted)" : "(click to sort)"}</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => metricSelectedMap[row.metric] && row.value >= valuesGreaterThan && (
                            <TableRow
                                key={row.metric}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.metric.replaceAll("_", " ")}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    });

    return (
        <div style={{ paddingTop: 15 }}>
            <Typography variant='caption'>
                Select Metrics to show
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {Object.keys(metricSelectedMap).map((item, index) => <Chip style={{ cursor: 'pointer' }} key={`metric-select-${item}`} label={item} color={metricSelectedMap[item] ? "success" : "default"} onClick={() => toggleSelected(item)} />)}
            </Stack>
            {Object.keys(tableRows).length !== 0 && (
                <TextField
                    style={{ marginTop: 15 }}
                    id="demo-helper-text-misaligned"
                    label="Values greater then"
                    type="number"
                    value={valuesGreaterThan}
                    onChange={e => setValuesGreaterThan(e.target.value)}
                />
            )}
            {tables}
        </div>

    )
}
