var ShodanClient = require('./index');
var client = new ShodanClient({ key: 'SGuR0TGv7hvO7DOxOALtD7EJWsu79NJv' });

client.host('96.30.53.204', { minify: true}, function (err, response) {
    if (err) {
        console.error('Error: ' + JSON.stringify(err));

        return;
    }

    console.log('Response: ' + JSON.stringify(response));
});

client.host('5.104.159.52', function (err, response) {
    if (err) {
        console.error('Error: ' + JSON.stringify(err));

        return;
    }

    console.log('Response: ' + JSON.stringify(response));
});
