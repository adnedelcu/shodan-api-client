'use strict';

const utils = require('./utils');

const optionalParams = {
    host: ['minify', 'history'],
    search: ['facets', 'page', 'minify'],
    count: ['facets'],
    query: ['page', 'sort', 'order'],
    querySearch: ['page'],
    queryTags: ['size']
};

class ShodanClient {
    constructor(options) {
        this.key = options.key || '';
        this.baseURL = options.baseURL || 'https://api.shodan.io';
    }

    host(ip, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!ip) {
            callback(utils.createErrMandatory('ip'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/host/${ip}?`;
        path = utils.addOptionals(path, optionalParams.host, options);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    count(query, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!query) {
            callback(utils.createErrMandatory('query'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/host/count?`;
        path = utils.addParam(path, 'query', query);
        path = utils.addOptionals(path, optionalParams.search, options);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    search(query, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!query) {
            callback(utils.createErrMandatory('query'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/host/search?`;
        path = utils.addParam(path, 'query', query);
        path = utils.addOptionals(path, optionalParams.search, options);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    searchTokens(query, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!query) {
            callback(utils.createErrMandatory('query'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/host/search/tokens?`;
        path = utils.addParam(path, 'query', query);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    ports(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/ports?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    protocols(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/protocols?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    scan(ips, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!ips) {
            callback(utils.createErrMandatory('ips'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/scan?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, { ips }, callback);
    }

    scanProgress(id, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!id) {
            callback(utils.createErrMandatory('id'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/scan/${id}?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    scanInternet(port, protocol, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!port) {
            callback(utils.createErrMandatory('port'), null);
            return;
        }

        if (!protocol) {
            callback(utils.createErrMandatory('protocol'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/scan/internet?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, { port, protocol }, callback);
    }

    services(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/services?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    query(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/query?`;
        path = utils.addOptionals(path, optionalParams.query, options);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    querySearch(query, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!query) {
            callback(utils.createErrMandatory('query'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/query/search?`;
        path = utils.addParam(path, 'query', query);
        path = utils.addOptionals(path, optionalParams.querySearch, options);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    queryTags(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/shodan/query/tags?`;
        path = utils.addOptionals(path, optionalParams.queryTags, options);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    accountProfile(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/account/profile?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    dnsResolve(hostnames, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!hostnames) {
            callback(utils.createErrMandatory('hostnames'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/dns/resolve?`;
        path = utils.addParam(path, 'hostnames', hostnames);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    dnsReverse(ips, options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!ips) {
            callback(utils.createErrMandatory('ips'), null);
            return;
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/dns/reverse?`;
        path = utils.addParam(path, 'ips', ips);

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    myIp(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/tools/my-ip?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }

    apiInfo(options, callback) {
        if (typeof options == 'function') {
            callback = options;
            options = {};
        }

        if (!this.key) {
            callback(utils.createErrMandatory('key'), null);
            return;
        }

        let path = `/api-info?`;

        utils.apiRequest(this.baseURL, path, this.key, options.timeout, null, callback);
    }
}

module.exports = ShodanClient;
