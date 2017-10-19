var ShodanClient = require('./index');
var client = new ShodanClient({ key: 'SGuR0TGv7hvO7DOxOALtD7EJWsu79NJv' });

client.host('96.30.53.204', function (err, response) {
    if (err) {
        console.error('Error: ' + err);

        return;
    }

    console.log('Response: ' + response);
});
