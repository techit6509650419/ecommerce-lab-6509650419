const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {
  describe('GET /products', () => {
    it('should return all products', async () => {
      const res  = await request(app).get('/products');

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);

    });  
});

  describe('GET /products/:id', () => {
    it('should return a product by ID', async () => {
      const productID = 1;
      const res = await request(app).get(`/products/${productID}`);

      expect(res.statusCode).toBe(200);

    });

    it('should return 404 if product not found', async () => {
      const nonproductID = 3;
      const res = await request(app).get(`/products/${nonproductID}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Product not found');

    });
  });

  describe('POST /product', () => {
    it('should add a new product', async () => {
      const newProduct = {
	      name : 'Iron',
	      price : 999,
	      stock : 10
      };

      const res = await request(app)
        .post('/products')
	      .send(newProduct);

     expect(res.statusCode).toBe(201);
     expect(res.body).toHaveProperty('name', 'Iron');
     expect(res.body).toHaveProperty('price', 999);
     expect(res.body).toHaveProperty('stock', 10);

    });
  });

  describe('PUT /products/:id', () => {
    it('should update an existing product', async () => {
        const productId = 1;
        
        const partialUpdate1 = { price: 1200 };
        const res = await request(app)
          .put(`/products/${productId}`)
          .send(partialUpdate1);
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'Laptop');
        expect(res.body).toHaveProperty('price', 1200);
        expect(res.body).toHaveProperty('stock', 5);
    
        const partialUpdate2 = { stock: 2 };
        const res1 = await request(app)
          .put(`/products/${productId}`)
          .send(partialUpdate2);

        expect(res1.statusCode).toBe(200);
        expect(res1.body).toHaveProperty('name', 'Laptop');
        expect(res1.body).toHaveProperty('price', 1200);
        expect(res1.body).toHaveProperty('stock', 2);
    });
    

    it('should return 404 if product not found', async () => {
      const res = await request(app)
	      .put('/products/999')
    	  .send({ name : 'Update name' });

      expect(res.statusCode).toBe(404);

    });
  });

  describe('DELETE /products/:id', () => {
    it('should delete a product', async () => {
      const res = await request(app).delete('/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Product deleted');

    });
    it('should return 404 if product not found', async () => {
      const res = await request(app).delete('/products/999');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Product not found');

    });
  });
});
