async function fetchData() {
    const apiUrl = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22College%20of%20IT%22%20AND%20the_programs%20like%20%22Number%20of%20students%20enrolled%20in%20bachelor%20programs%22&limit=100";
    const container = document.getElementById('data-container');

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Full Response:", data);

      if (!data.results || !Array.isArray(data.results)) {
        console.error("No 'results' field found in the response:", data);
        throw new Error('Unexpected response structure. No matching records found.');
      }

      console.log("Results:", data.results);

      if (data.results.length === 0) {
        throw new Error('No matching records found in the response.');
      }

      const records = data.results.map(result => result);

      createTable(records);
    } catch (error) {
      container.innerHTML = `<p class="error">${error.message}</p>`;
      console.error('Error fetching data:', error);
    }
  }

  function createTable(records) {
    const container = document.getElementById('data-container');
    const table = document.createElement('table');
    table.classList.add('table');

    const headers = Object.keys(records[0]);
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header.replace(/_/g, ' ');
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    records.forEach(record => {
      const row = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = record[header] || 'N/A';
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.innerHTML = '';
    container.appendChild(table);
  }

  fetchData();