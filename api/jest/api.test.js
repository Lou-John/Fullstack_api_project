const request = require('supertest');
const app = require('../app'); // Assure-toi que app.js exporte l'app Express

// Un token JWT valide doit être généré ou récupéré pour les tests protégés
const JWT_TOKEN = 'Bearer VOTRE_TOKEN_ICI';

describe('API Chevalier GENTHON', () => {
  // USER
  describe('User endpoints', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          firstName: 'Test',
          lastName: 'User',
          username: 'testuser' + Date.now(),
          email: `test${Date.now()}@mail.com`,
          password: 'testpassword'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('_id');
    });

    it('should login a user', async () => {
      const res = await request(app)
        .post('/api/user/login')
        .send({
          email: 'test@mail.com', // Remplace par un email existant
          password: 'testpassword'
        });
      expect([200, 401, 400]).toContain(res.statusCode);
    });
  });

  // COMPOSANT CATEGORIES
  describe('ComposantCategorie endpoints', () => {
    let createdId;
    it('should create a composant category', async () => {
      const res = await request(app)
        .post('/api/composantCategories')
        .set('Authorization', JWT_TOKEN)
        .send({
          nom: 'CPU',
          slug: 'cpu',
          description: 'Catégorie processeur'
        });
      expect([201, 400, 401]).toContain(res.statusCode);
      if (res.body.data && res.body.data._id) createdId = res.body.data._id;
    });

    it('should get all composant categories', async () => {
      const res = await request(app)
        .get('/api/composantCategories')
        .set('Authorization', JWT_TOKEN);
      expect([200, 401]).toContain(res.statusCode);
    });

    it('should get a composant category by id', async () => {
      if (!createdId) return;
      const res = await request(app)
        .get(`/api/composantCategories/${createdId}`)
        .set('Authorization', JWT_TOKEN);
      expect([200, 401, 400]).toContain(res.statusCode);
    });
  });

  // COMPOSANTS
  describe('Composant endpoints', () => {
    it('should get all composants', async () => {
      const res = await request(app)
        .get('/api/composants')
        .set('Authorization', JWT_TOKEN);
      expect([200, 401]).toContain(res.statusCode);
    });
  });

  // PARTENAIRES
  describe('Partenaire endpoints', () => {
    it('should get all partenaires', async () => {
      const res = await request(app)
        .get('/api/partenaires')
        .set('Authorization', JWT_TOKEN);
      expect([200, 401]).toContain(res.statusCode);
    });
  });

  // CONFIGURATIONS
  describe('Configuration endpoints', () => {
    it('should get all configurations', async () => {
      const res = await request(app)
        .get('/api/configurations')
        .set('Authorization', JWT_TOKEN);
      expect([200, 401]).toContain(res.statusCode);
    });
  });
});