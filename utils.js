'use strict';

const lodash = require('lodash');
const request = require('request');

module.exports.createErrMandatory = param => new Error(`Required parameter: ${param}`);

module.exports.addParam = (url, param, value) => `${url}${param}=${value}&`;

module.exports.addOptionals = (url, optionals, options) => {
    let finalUrl = url;

    lodash.each(options, (value, key) => {
        if (optionals.indexOf(key) !== -1) {
            finalUrl = this.addParam(finalUrl, key, value);
        }
    });

    return finalUrl;
};

module.exports.apiRequest = (baseUrl, path, key, timeout, payload, callback) => {
    const config = {
        uri: `${baseUrl}${path}key=${key}`,
        timeout: timeout || 5000,
        json: true
    };
    let method = 'get';

    if (!key) {
        callback(this.createErrMandatory('key'), null);
    }

    if (payload) {
        method = 'post';
        config.form = payload;
    }

    request[method](config, (err, response, body) => {
        if (typeof response != 'undefined' && response.statusCode == 404) {
            callback(body, null);
        } else {
            callback(err, body ? body: null);
        }
    });
};
