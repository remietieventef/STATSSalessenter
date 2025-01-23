// File: api/statistics.js

import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Retrieve statistics from Edge Config
        const statistics = await get('statistics');
        res.status(200).json(statistics || {});
    } else if (req.method === 'POST') {
        // Save statistics to Edge Config
        const { staff, calls, callsReached, pq } = req.body;

        // Retrieve existing statistics
        const statistics = await get('statistics') || {};

        // Update statistics for the selected staff member
        statistics[staff] = { calls, callsReached, pq };

        // Save the updated statistics
        await set('statistics', statistics);

        res.status(200).json({ message: 'Statistics updated', statistics });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

// Frontend code

// Update statistics when the form is submitted
document.getElementById('stats-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedStaff = document.getElementById('staff-select').value;
    const calls = parseInt(document.getElementById('calls').value, 10);
    const callsReached = parseInt(document.getElementById('calls-reached').value, 10);
    const pq = parseInt(document.getElementById('pq').value, 10);

    fetch('/api/statistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staff: selectedStaff, calls, callsReached, pq })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Statistics updated:', data);
        updateTable(data.statistics);
    })
    .catch(error => console.error('Error:', error));
});

// Update the leaderboard table dynamically
function updateTable(statistics) {
    const rows = document.getElementById('leaderboard').querySelectorAll('tr');
    rows.forEach(row => {
        const staffName = row.cells[0].textContent;
        const stats = statistics[staffName];
        if (stats) {
            row.cells[1].querySelector('div').textContent = stats.calls;
            row.cells[1].querySelector('.progress-bar').style.width = `${(stats.calls / 300) * 100}%`;

            row.cells[2].querySelector('div').textContent = stats.callsReached;
            row.cells[2].querySelector('.progress-bar').style.width = `${(stats.callsReached / 60) * 100}%`;

            row.cells[3].querySelector('div').textContent = stats.pq;
            row.cells[3].querySelector('.progress-bar').style.width = `${(stats.pq / 8) * 100}%`;
        }
    });
}

// Fetch statistics on page load
window.addEventListener('load', function() {
    fetch('/api/statistics')
        .then(response => response.json())
        .then(data => {
            console.log('Loaded statistics:', data);
            updateTable(data);
        })
        .catch(error => console.error('Error loading statistics:', error));
});
