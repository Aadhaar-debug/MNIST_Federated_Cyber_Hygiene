const express = require('express');
const fetch = require('node-fetch');
const { ChromeStorage } = require('chrome-storage'); // Hypothetical Chrome storage library

const app = express();

app.use(express.json());

// Assuming you have a function to retrieve URLs from Chrome local storage
async function getUrlsFromChromeStorage() {
  // Use your preferred method to fetch data from Chrome local storage
  // Here's a hypothetical example using a 'ChromeStorage' library
  const chromeStorage = new ChromeStorage();
  const urls = await chromeStorage.get('url','RequestMethod','ETA');
  return urls;
}

app.post('/capture_data', async (req, res) => {
  try {
    // Retrieve URLs from Chrome local storage
    const urls = await getUrlsFromChromeStorage();

    if (urls && Array.isArray(urls)) {
      // Send the retrieved URLs to the API endpoint
      const response = await fetch('http://127.0.0.1:8000/data-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (response.ok) {
        console.log('Data sent successfully');
        res.status(200).send('Data sent successfully');
      } else {
        console.error('Error sending data:', response.statusText);
        res.status(500).send('Error sending data');
      }
    } else {
      res.status(400).send('Invalid data format');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
