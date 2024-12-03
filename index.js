const express = require("express");
const app = express();
const axios = require('axios');
const path = require("path");
const port = 8080;
const data = require("./task-data.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {
    const min = Math.floor(data.metrics.average_session_length_seconds/60);
    const sec = Math.floor(data.metrics.average_session_length_seconds%60);
    res.render("index.ejs", {data,min,sec});
});

app.get('/download', async (req, res) => {
    try {
        const apiSecret = data.api_secret;
        if (!apiSecret) {
            return res.status(400).json({ error: 'API secret is missing in the JSON file' });
        }

        let response;
        try {
            response = await axios.post('https://testd5-img.azurewebsites.net/api/imgdownload', {
            api: apiSecret
            });
        } catch (err) {
            console.error('Error with the POST request:', err.response ? err.response.data : err.message);
            return res.status(500).json({ error: 'Error occurred while contacting the image API' });
        }
    
        const base64Image = response.data.base64_string;
        if (!base64Image) {
            return res.status(400).json({ error: 'No Base64 string received in response' });
        }

        let imageBuffer;
        try {
            imageBuffer = Buffer.from(base64Image, 'base64');
        } catch (err) {
            console.error('Error converting Base64 to image buffer:', err);
            return res.status(500).json({ error: 'Error converting Base64 string to image' });
        }
    
        res.setHeader('Content-Type', 'image/jpg');
        res.setHeader('Content-Disposition', 'attachment; filename="downloaded_image.jpg"');
    
        res.end(imageBuffer);
  
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ error: 'An unexpected error occurred while processing the request' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});