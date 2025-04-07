let mongoose = require("mongoose");
let server = require("./app");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe('Planets API Suite', () => {

    describe('Fetching Planet Details', () => {

        it('it should fetch a planet named Mercury', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 0 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(0);
                    res.body.should.have.property('name').eql('Mercury');
                    done();
                });
        });

        it('it should fetch a planet named Venus', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(1);
                    res.body.should.have.property('name').eql('Venus');
                    done();
                });
        });

        it('it should fetch a planet named Earth', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(2);
                    res.body.should.have.property('name').eql('Earth');
                    done();
                });
        });

        it('it should fetch a planet named Mars', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 3 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(3);
                    res.body.should.have.property('name').eql('Mars');
                    done();
                });
        });

        it('it should fetch a planet named Jupiter', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 4 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(4);
                    res.body.should.have.property('name').eql('Jupiter');
                    done();
                });
        });

        it('it should fetch a planet named Saturn', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 5 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(5);
                    res.body.should.have.property('name').eql('Saturn');
                    done();
                });
        });

        it('it should fetch a planet named Uranus', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 6 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(6);
                    res.body.should.have.property('name').eql('Uranus');
                    done();
                });
        });

        it('it should fetch a planet named Neptune', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 7 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(7);
                    res.body.should.have.property('name').eql('Neptune');
                    done();
                });
        });

        it('it should fetch a planet named Pluto', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 8 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(8);
                    res.body.should.have.property('name').eql('Pluto');
                    done();
                });
        });

        it('it should return 404 for non-existing planet ID', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 99 })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('error');
                    done();
                });
        });

    });

});

describe('Testing Other Endpoints', () => {

    describe('it should fetch OS Details', () => {
        it('it should fetch OS details', (done) => {
            chai.request(server)
                .get('/os')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('os');
                    res.body.should.have.property('env');
                    done();
                });
        });
    });

    describe('it should fetch Live Status', () => {
        it('it checks Liveness endpoint', (done) => {
            chai.request(server)
                .get('/live')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('live');
                    done();
                });
        });
    });

    describe('it should fetch Ready Status', () => {
        it('it checks Readiness endpoint', (done) => {
            chai.request(server)
                .get('/ready')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('ready');
                    done();
                });
        });
    });

});
