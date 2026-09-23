const request = require('supertest');
const app = require('../app');


describe ('GET /posts', () => {
    it('deberia devolver los posts con status 200', async () =>{
        const response = await request (app).get('/posts');
        expect(response.status).toBe(200);
    });
});

describe('GET /posts/author/:authorId', () =>{
    it('debería devolver 200 si los posts existen', async () => {
        const response = await request(app).get('/posts/author/1');
        expect(response.status).toBe(200);
    });
});

describe('GET /posts/author/:authorId', () =>{
    it('debería devolver 200 si no tiene ningun post', async () => {
        const response = await request(app).get('/posts/author/10');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});

describe('GET /posts/:id', () => {
    it('debería devolver 404 si el post no existe', async () => {
        const response = await request(app).get('/posts/99999');
        expect(response.status).toBe(404);
    });
});

describe('GET /posts/:id', () => {
    it('debería devolver 200 si el post existe', async () => {
        const response = await request(app).get('/posts/1');
        expect(response.status).toBe(200);
    });
});

describe('POST /posts', () => {
            let createdId; 

    afterEach(async () => {
        if (createdId) {
            await request(app).delete(`/posts/${createdId}`);
        }
    });
    test('crea post con datos válidos', async () => {

    const response = await request(app)
    .post('/posts')
    .send({ titulo: 'generico', contenido: 'contenido cualquiera', published: true, author_id: 1 });

    createdId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    });
});

describe('PUT /posts/:id',()=>{
    test ('modificar un post ', async ()=>{
        const response = await request(app)
        .put('/posts/1')
        .send({titulo: 'actualizado', contenido: 'contenido generico', published: true})

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });
});

describe('DELETE /posts/:id', () => {
    test('borrar un post', async () => {
        const createResponse = await request(app)
            .post('/posts')
            .send({ titulo: 'para borrar', contenido: 'contenido para borrar', author_id: 1 });

        const idToDelete = createResponse.body.id;

        const response = await request(app).delete(`/posts/${idToDelete}`);

        expect(response.statusCode).toBe(204);
    });
});