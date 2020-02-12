const test = require('tape');
const request = require('supertest');
const app = require('../src/app');
const dbConnection = require('../src/database/db_connection')
const bodyParser = require('body-parser');

test('All routes should return the expected results', t => {
    request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});

test('game route should return the expected result', t => {
    request(app)
        .get('/game')
        .expect(200)
        .expect('Content-Type', "text/html; charset=utf-8")
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});



test('Should be able to get a user by their name', t => {
    const names = ['aysam', 'najwan', 'yousef', 'mario', 'rabeea', 'ivan', 'lina', 'mina', 'shireen', 'fatima', 'mahmood', 'francis'];
    names.forEach((name, index) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8")
            .end((err, res) => {
                let queryResult = '';
                dbConnection.query('SELECT name FROM usernames', (err, res) => {
                    queryResult = res.rows
                    t.same(queryResult[index].name, name, `Name is ${name} as expected`);
                    if (names.length - 1 === index) {
                        t.end();
                    }
                })
            });
    });
});


test.onFinish(() => process.exit(0));