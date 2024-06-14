const request=require('supertest');
const app=require('../server');

describe('Auth endpoints',() => {
    it('rew registeration',async()=> {
        const res=await request(app)
            .post('/api/register')
            .send({
                username:'test',
                email:'test@example.com',
                password: 'password'
            });
        expect(res.statusCode).toEqual(201);
    });

    it(' login  user',async()=>{
        const res=await request(app)
            .post('/api/login')
             .send({
                email: 'test@example.com',
                password:'password'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should give  profile', async () => {
        const res=await request(app)
            .post('/api/login')
            .send({
                email:'test@example.com',
              password:'password'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username','testuser');
    });
});
