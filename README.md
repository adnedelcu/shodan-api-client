# shodan-api-client
Node.JS Shodan REST API client library

[![Build Status](https://travis-ci.org/adnedelcu/shodan-api-client.svg?branch=master)](https://travis-ci.org/adnedelcu/shodan-api-client)

## Use

All methods of the API need a valid key, you can get one [here](https://developer.shodan.io/api/requirements)

```javascript
const ShodanClient = require('shodan-api-client');
const client = new ShodanClient({
    key: [YOUR_API_KEY]
});

const searchOpts = {
    facets: 'port:100,country:100',
    // minify: true
};

client.search('asterisk port:5061', searchOpts, function (err, response) {
    if (err) {
        console.log('Error: '+err);

        return;
    }

    console.log('Response: '+response);
});
```

## API

The content of the result is the same provided by the API. You can check them in the [API Documentation](https://developer.shodan.io/api);

### Methods

They support the requests documented here: https://developer.shodan.io/api

#### `host(ip, options, callback)`
Returns all services that have been found on the given host IP. Supported options:
- `ip` (string) - Host IP Address.
- `options`, an object with:
    - `history` (boolean, optional) - True if all historical banners should be returned (default: false)
    - `minify` (boolean, optional) - True to only return the list of ports and the general host information. no banners. (default: false)
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `search(query, options, callback)`
Search Shodan using the same query syntax as the website and use facets to get summary information for different properties. This method may use API query credits depending on usage, please check the [API Documentation](https://developer.shodan.io/api#shodan-host-search).
- `query` (string) - Shodan search query. The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the [API Documentation](https://developer.shodan.io/api#shodan-host-count).
- `options`, an object with:
    - `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the [API Documentation](https://developer.shodan.io/api#shodan-host-count) (default: false)
    - `page` (number, optional) - The page number to page through results 100 at a time (default: 1)
    - `minify` (boolean, optional) - True to only return the list of ports and the general host information. no banners. (default: false)
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `count(query, options, callback)`
This method behaves identical to "search" with the only differnece that this method does not return any host results, it only returns the total number of results that matched the query and any facet information that was requested. As a result, this method does not consume query credits.
- `query` (string) - Shodan search query. The provided string is used to search the database of banners in Shodan, with the additional option to provide filters inside the search query using a "filter:value" format. For example, the following search query would find Apache webservers located in Germany: "apache country:DE". To see which filters are supported please check the [API Documentation](https://developer.shodan.io/api#shodan-host-count).
- `options`, an object with:
    - `facets` (string, optional) - A comma-separated list of properties to get summary information on. Property names can also be in the format of "property:count", where "count" is the number of facets that will be returned for a property (i.e. "country:100" to get the top 100 countries for a search query). To see which filters are supported please check the [API Documentation](https://developer.shodan.io/api#shodan-host-count) (default: false)
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `searchTokens(query, options, callback)`
Search Shodan using the same query syntax as the website and use facets to get summary infromation for different properties. This method may use API query credits depending on usage, please check the [API Documentation](https://developer.shodan.io/api#shodan-host-search-tokens)
- `query` (string) - Same as for `search` method
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `ports(options, callback)`
This method returns a list of port numbers that the crawlers are looking for
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `protocols(options, callback)`
This method returns an object containing all the protocols that can be used when launching an Internet scan.
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `scan(ips, options, callback)`
Use this method to request Shodan to crawl a network. This method uses API scan credits, please check the [API Documentation](https://developer.shodan.io/api#shodan-scan)
- `ips` (string) - A comma-separated list of IPs or netblocks (in CIDR notation) that should get crawled.
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `scanProgress(id, options, callback)`
Use this method to retrieve progress for a Shodan scan request to crawl a network.
- `id` (string) - The id of the request obtained through the `scan` or `scanInternet` method
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `scanInternet(port, protocol, options, callback)`
Use this method to request Shodan to crawl the Internet for a specific port. Thei method is restricted to security researchers and companies with a Shodan Data license, please check the [API Documentation](https://developer.shodan.io/api#shodan-scan-internet)
- `port` (number) - The port that Shodan shoudl crawl the Internet for.
- `protocol` (string) - The name of the protocol that should be used to interrogate the port. Call `protocols` method for a list of supported protocols.
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `services(options, callback)`
This method returns an object containing all the services that the Shodan crawlers look at. It can also be used as a quick and practical way to resolve a port number to the name of a service.
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `query(options, callback)`
To obtain a list of search queries that uses have saved.
- `options`, an object with:
    - `page` (number, optional) - Page number to iterate over results; each page contains 10 items.(default: 1)
    - `sort` (string, optional) - Sort the list based on a property. Possible values are: "votes", "timestamp".(default: false)
    - `order` (string, optional) - Whether to sort the list in ascending or descending order. Possible values are: "asc", "desc".(default: "desc")
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `querySearch(query, options, callback)`
To search the directory of search queries that users have saved.
- `query` (string) - What to search for in the directory of saved search queries.
- `options`, an object with:
    - `page` (number, optional) - Page number to iterate over results; each page contains 10 items.(default: 1)
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `queryTags(options, callback)`
To obtain a list of popular tags for the saved search queries.
- `options`, an object with:
    - `size` (number, optional) - The number of tags to return.(default: 10)
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `accountProfile(options, callback)`
Returns information about the account linked to this API key.
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `dnsResolve(hostnames, options, callback)`
Looks up the IP address for the provided list of hostnames.
- `hostnames` (string) - A comma-separated list of hostnames; example: "google.com,bing.com"
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `dnsReverse(ips, options, callback)`
Looks up the hostnames that have been defined for the given ip list.
- `ips` (string) - A comma-separated list of ips; example: "74.125.227.230,204.79.197.200"
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `myIp(options, callback)`
Get your external IP address.
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

#### `apiInfo(options, callback)`
Information of the actual API version.
- `options`, an object with:
    - `timeout` (number, optional) - Connection timeout in ms.(default: 5000)
- `callback` (function) - Method to be executed when the request is finished. It has 2 parameters: `err` and `response`

## Implemented REST API Methods:

### Shodan Search Methods
- [X] shodan/host/{ip}
- [X] shodan/host/count
- [X] shodan/host/search
- [X] shodan/host/search/tokens
- [X] shodan/ports

### Shodan On-Demand Scanning
- [X] shodan/protocols
- [X] shodan/scan
- [X] shodan/scan/internet
- [X] shodan/scan/{id}

### Shodan Network Alerts
- [ ] shodan/alert
- [ ] shodan/alert/{id}/info
- [ ] shodan/alert/{id}
- [ ] shodan/alert/info

### Shodan Directory Methods
- [X] shodan/query
- [X] shodan/query/search
- [X] shodan/query/tags

### Account Methods
- [X] account/profile

### DNS Methods
- [X] dns/resolve
- [X] dns/reverse

### Utility Methods
- [ ] tools/httpheaders
- [X] tools/myip

### API Status Methods
- [X] api-info

### Experimental Methods
- [ ] labs/honeyscore/{ip}
