const request = require('supertest');
const app = require('../app');


describe ('GET /authors', () => {
    it('deberia devolver los autores con status 200', async () =>{
        const response = await request (app).get('/authors');
        expect(response.status).toBe(200);
    });
});

describe('GET /authors/:id', () => {
    it('debería devolver 404 si el autor no existe', async () => {
        const response = await request(app).get('/authors/99999');
        expect(response.status).toBe(404);
    });
});

describe('GET /authors/:id', () => {
    it('debería devolver 200 si el autor existe', async () => {
        const response = await request(app).get('/authors/1');
        expect(response.status).toBe(200);
    });
});

describe('POST /authors', () => {
            let createdId; 

    afterEach(async () => {
        if (createdId) {
            await request(app).delete(`/authors/${createdId}`);
        }
    });
    test('crea author con datos válidos', async () => {

    const response = await request(app)
    .post('/authors')
    .send({ nombre: 'generico', email: 'generico@example.com', bio: 'bio generica' });

    createdId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    });
});

describe('PUT /authors/:id',()=>{
    test ('modificar un autor ', async ()=>{
        const response = await request(app)
        .put('/authors/1')
        .send({nombre: 'actualizado', email: 'actualizado@example.com', bio: 'bio generica actualizada'})

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });
});

describe('DELETE /authors/:id', () => {
    test('borrar un autor', async () => {
        const createResponse = await request(app)
            .post('/authors')
            .send({ nombre: 'para borrar', email: 'paraborrar@example.com' });

        const idToDelete = createResponse.body.id;

        const response = await request(app).delete(`/authors/${idToDelete}`);

        expect(response.statusCode).toBe(200);
    });
});