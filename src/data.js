// src/data.js

const data = fetch('https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1710/data.json')
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.error('Error fetching the data:', error));

export default data;
