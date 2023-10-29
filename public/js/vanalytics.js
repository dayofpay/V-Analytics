document.addEventListener('DOMContentLoaded',(event) => {
    // API endpoint URL
    const apiUrl = 'http://localhost:3000/analytics/sites/653ecd75a686b34b5e7869bd';

    // Data to send to the API
    const data = {
        visitorData: event,
        siteData : window.location
    };

    // Options for the fetch request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    // Make the API request
    fetch(apiUrl, options)
        .then(response => {
            if (response.ok) {
                console.log('API request succeeded');
            } else {
                console.error('API request failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})