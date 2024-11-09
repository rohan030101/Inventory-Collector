
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Path to Excel file
const FILE_PATH = path.join(__dirname, 'data.xlsx');

// Initialize Excel file if it doesn't exist
if (!fs.existsSync(FILE_PATH)) {
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet([]);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Assets');
  xlsx.writeFile(workbook, FILE_PATH);
}

// Function to append data to Excel file
function appendDataToExcel(data) {
  // Read existing data
  const workbook = xlsx.readFile(FILE_PATH);
  const worksheet = workbook.Sheets['Assets'];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Append new data
  jsonData.push(data);
  const updatedWorksheet = xlsx.utils.json_to_sheet(jsonData);
  workbook.Sheets['Assets'] = updatedWorksheet;

  // Save the workbook
  xlsx.writeFile(workbook, FILE_PATH);
}

// Endpoint to handle form data
app.post('/submit', (req, res) => {
  const assetData = req.body;

  // Append data to Excel
  appendDataToExcel(assetData);

  res.sendStatus(200);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
