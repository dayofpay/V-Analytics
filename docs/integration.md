# Integration Instructions

To integrate V-Analytics with your website, follow these steps:

## Step 1: Include the Integration Code

Place the following JavaScript code within your website's HTML to start sending analytics data:

```html
<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        // API endpoint URL
        const siteKey = 'YOUR_SITE_KEY_HERE'; // Replace with your site's key
        const apiUrl = `http(s)://<HOST_URL>/analytics/sites/${siteKey}`;

        // Data to send to the API
        const data = {
            visitorData: event,
            siteData: window.location
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
                    error('API request failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
</script>

```
## STEP 2 - Replace 'YOUR_SITE_KEY_HERE'

**Replace 'YOUR_SITE_KEY_HERE' in the code with your actual site's key. This key is provided to you by V-Analytics.**

## Step 3: Include the Code in Your Website
**Add the provided code snippet to all the pages of your website where you want to track visitor analytics.**

## Step 4: Verify Integration

**Open your website in a browser and check your browser's console for the following messages:**

    "API request succeeded" (if the request is successful).
    "API request failed" (if there's an issue with the request).

If you see "API request succeeded," your integration is successful, and your website is now sending analytics data to V-Analytics.

If you encounter issues, please refer to the V-Analytics documentation or contact our support for assistance.**