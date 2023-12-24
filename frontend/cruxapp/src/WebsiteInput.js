import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';


const WebsiteInput = ({ handleMetricsData }) => {
    const [websiteURL, setWebsiteURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetMetrics = () => {
        setLoading(true);
        axios.get(`http://localhost:8000/metrics?url=${encodeURIComponent(websiteURL)}`)
            .then(function (response) {
                console.log(response.data);
                if (response.data.success) {
                    handleMetricsData(websiteURL, response.data.response)
                } else {
                    setError(response.data.response);
                    setWebsiteURL("");
                }
                setLoading(false);
            })
            .catch(function (error) {
                setError(error.toString())
            });
    }


    return (
        <Grid container sx={{ paddingTop: 6 }}>
            <Grid item xs={8}>
                <TextField fullWidth
                    id="standard-basic"
                    label="Website URL"
                    variant="standard"
                    value={websiteURL}
                    onChange={e => setWebsiteURL(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" onClick={handleGetMetrics} disabled={loading}>
                    Get Metrics
                </Button>
                <Snackbar
                    open={error !== ""}
                    autoHideDuration={6000}
                    onClose={() => setError("")}
                    message={error}
                />
            </Grid>
        </Grid>
    )
}


export default WebsiteInput;