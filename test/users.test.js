process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let User = require('../models/User')

const { expect } = require("chai")
const request = require("supertest")
const faker = require("faker")

let app = require('../index')

describe('Users', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
			done();
		});
    })

    //test user account creation
    describe('user account management', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/signup')
                .send({
                    email: faker.internet.email(),
                    password: 'sometestpassword'
                })
                .then(res => {
                    expect(res.statusCode).to.equal(201)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('user')
                    expect(res.headers['set-cookie'][0]).to.contain('jwt', 'Max-Age', 'HttpOnly')
                    done()
                })
                .catch(err => {
                done(err)
            })
        })

        //  if any of the required fields are missing, an account should not be created
        it('should not create an account without a user email', (done) => {
            request(app)
                .post('/signup')
                .send({
                password: 'sometestpassword'
                })
                .then(res => {
                    expect(res.statusCode).to.equal(400)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.contain('email and password are required')
                    done()
                })
                .catch(err => {
                done(err)
            })
        })

        it('should should login a user(with valid credentials)', (done) => {
            request(app)
                .post('/signup')
                .send({ email: 'test@mail.com', password: 'somerandompassword' })
                .then(res => {
                    request(app)
                        .post('/login')
                        .send({ email: 'test@mail.com', password: 'somerandompassword' })
                        .then(res => {
                            expect(res.statusCode).to.equal(200)
                            expect(res.body).to.be.an('object')
                            expect(res.body).to.have.property('user')
                            expect(res.headers['set-cookie'][0]).to.contain('jwt', 'Max-Age', 'HttpOnly')
                            done()
                        })
                    .catch(err => done(err))
                })
            .catch(err => done(err))
        })


    })
})