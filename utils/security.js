async function isProxy(ip){
    const getData = await fetch(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1`);

    if(getData.ok){
        const result = await getData.json();
        if(result[ip]){
            return {'IsProxy' : await result[ip].proxy === 'no' ? false : true}
        }
        else{
            return {'isProxy' : false} // Error
        }
    }
    else{
        return {Result: 'Error while checking the ip'}
    }
}

module.exports = {isProxy : isProxy}