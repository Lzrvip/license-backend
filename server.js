const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Load license keys from a JSON file (simulating a database)
let validKeys = JSON.parse(fs.readFileSync('./keys.json', 'utf8'));

// Validate License Key API
app.post('/validate-key', (req, res) => {
    const { licenseKey, deviceId } = req.body;

    // Find the stored license key data
    const keyData = validKeys.find(k => k.key === licenseKey);

    if (keyData) {
        // Check if the deviceId matches the one associated with the license key
        if (keyData.deviceId === deviceId) {
            return res.status(200).json({ valid: true, message: 'License Key is valid!' });
        } else {
            return res.status(400).json({ valid: false, message: 'License Key is already registered to another device.' });
        }
    } else {
        return res.status(400).json({ valid: false, message: 'Invalid License Key' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
