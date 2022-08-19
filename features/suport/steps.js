const { handler, request } = require('pactum');
const pactum = require('pactum');
const { Given, When, Then, Before } = require('@cucumber/cucumber');

let spec = pactum.spec();

Before(() => {
    spec = pactum.spec();
});

Given(/^I log in a POST request to (.*)$/, async (endpoint) => {

    var token = await spec.post(endpoint)
        .withBody({
            "email": "gustavo@foo.com",
            "senha": "gustavo123"
        })
        .returns('token');

        handler.addDataFuncHandler('getAuthToken', () => {
            return token;
        });

});

Given(/^I make a (.*) request to (.*)$/, (method, endpoint) => {
    spec[method.toLowerCase()](endpoint)
});

Given('I set authentication', () => {
    spec.withHeaders('Authorization', `Bearer $F{getAuthToken}`);
});

Given(/I set body to/, (body) => {
    try {
        spec.withJson(JSON.parse(body));
    } catch (error) {
        spec.withBody(body);
    }
});

Given(/^I set path param (.*) to (.*)$/, (key, value) => {
    spec.withPathParams(key, value);
});

When('I receive a response', async function () {
    await spec.toss();
});

Then('I expect response should have a status {int}', (code) => {
    spec.response().should.have.status(code);   
});

Then(/^I expect response should have a json like$/, (json) => {
    spec.response().should.have.jsonLike(JSON.parse(json));
});

Then('I expect response time should be less than {int} ms', (ms) => {
    spec.response().should.have.responseTimeLessThan(ms)
});

Then(/^I store response at (.*) as (.*)$/, (path, name) => {
    spec.stores(name, path);
});
