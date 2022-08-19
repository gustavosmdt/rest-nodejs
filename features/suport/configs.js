const { request } = require('pactum');
const { Before } = require('@cucumber/cucumber');

Before(() => {
    request.setBaseUrl('http://localhost:3000');
});
