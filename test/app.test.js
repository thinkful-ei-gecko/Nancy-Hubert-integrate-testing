const supertest = require('supertest')
const app = require('../playServer/app')
const expect = require('chai').expect;

describe('GET /apps', () => {
    it('should returen message from GET', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
           
    })
    it('should check if the keys are present', () => {
        return supertest(app)
            .get('/apps')
            .query({sort:'Rating'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1)

                let sorted = true;
                let i = 0;

                while(i < res.body.length - 1) {
                    const appAtI = res.body[i];
                    
                    if( !('Rating' in appAtI) && !('App' in appAtI)){
                        sorted = false;
                        break;
                    }
                    i++;
                }
               expect(sorted).to.be.true;
               })
    })
    
    it('should return fail', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'MISTAKE'})
            .expect(400, 'Must specify valid genre')
    })

    it('should return error message for invalid sort', () => {
        return supertest(app) 
            .get('/apps')
            .query({sort: 'WRONG'})
            .expect(400, 'Must sort on rating or app name')
    })

})