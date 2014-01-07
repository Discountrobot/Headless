## Headless
`Headless` is a project demonstrating how easily the verification scheme of [`eovendo.com`](http://eovendo.com) can be foiled. The project both includes a bot based upon [`phantomjs`](http://phantomjs.org/) utilizing multi-threading, dispatched by python. And a [`chrome extension`](chrome extension) for a more visualized demonstration.

#### Features
1. Minimal bandwidth usage: 
  (currently using less than 600kb pr. account)
2. Proxies: Taking advantage of the native proxy flag in [`phantomjs`](http://phantomjs.org/) the python dispatcher can take a list of proxy servers and will randomly assign a proxy to each Thread.
3. currently undetectable, given the data-model sent between the client and the server (more on this in the [verification scheme](#verification-scheme) section . 

#### Limitations
1. There are known memory leaks in [`phantomjs`](https://code.google.com/p/phantomjs/issues/detail?id=979), so if you're running the script on something small, say a raspberry pi, then remember to make a swap file to prevent hanging.

### Verification Scheme
The verification scheme for correctly watching a commercial on [`eovendo.com`](http://eovendo.com) is easily reverse engineered given the insight in the javaScript API, and the console output.

1. javaScript API: [`adplay.js`](headless/docs/adplay.js) 
2. structure of a  sample "GET" request: [`postback.json`](headless/docs/postback.json).

#### Time validation
Verification happens through validating the time and that it has changed correctly.
We can describe this scheme with a formula.  
`R` = requestTime = the time of the request  
`S` = startTime = the time stamp given when starting the commercial  
`E` = endTIme = the time stamp given when finishing the commercial  
`mediaDuration` = the runtime of the commercial

we describe the formula as `R < (S + mediaDuration) <= E` which can also be visualized as:

<p align="center">
  <img src="http://i.imgur.com/emNsPgG.png"/>
</p>

#### Possible pesudo server code
Below is a pseudo snippet of what could be the validating part of the server, written in javaScript syntax.

```javascript
if (
    // timestamp
    client.RequestTime === server.RequestTime && 
    client.StartTime > client.RequestTime && 
    client.EndTime >= client.SartTime + server.Campaign.MediaDuration  &&

    // values that needs to be set accordingly
    client.AdStatus.value === 'Completed' &&
    client.Campaign.IsViewed === true &&

    // other values that needs to be set (correct by default)
    client.id === server.id &&
    client.UserId === server.UserId &&
    client.Tag === server.Tag &&
    client.RequestIpAddress === server.RequestIpAddress &&
    client.Campaign.CampaignId === server.Campaign.CampaignId &&
) {
    return true;
}
```

### Installation
#### Chrome Extension
read more here: [`chrome extension`](chrome extension)
#### Phantomjs bot
read more here: [`headless.js`](headless)

### License
[MIT](LICENSE)
