const express = require('express');
const fs = require('fs');
const app = express();

// Use the environment's PORT, or default to 3000 for local development
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Load license keys from a JSON file
const validKeys = JSON.parse(fs.readFileSync('./keys.json', 'utf8'));

// Validate License Key API
app.post('/validate-key', (req, res) => {
    const { licenseKey } = req.body; // Extract licenseKey from the request body
    const keyData = validKeys.find(k => k.key === licenseKey);

    if (keyData && keyData.valid) {
        res.status(200).json({ valid: true, message: 'License Key is valid!' });
    } else {
        res.status(400).json({ valid: false, message: 'Invalid License Key' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
