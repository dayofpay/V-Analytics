async function fetchIPData(ip) {
    try {
      const response = await fetch('http://ip-api.com/json/' + ip);
      if (response.ok) {
        const ipData = await response.json();
        return ipData
      } else {
        console.error('Failed to fetch IP data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  module.exports = {fetchIPData : fetchIPData};
  