
document.getElementById('assetForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    username: document.getElementById('username').value,
    department: document.getElementById('department').value,
    location: document.getElementById('location').value,
    assetcode: document.getElementById('assetcode').value,
    ipaddress: document.getElementById('ipaddress').value,
    macaddress: document.getElementById('macaddress').value,
    cpuconfig: document.getElementById('cpuconfig').value
  };

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Data submitted successfully and saved to Excel file.');
    } else {
      alert('Failed to submit data.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred.');
  }
});
