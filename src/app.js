const express = require('express');
const { ProductManager } = require('./ProductManager');

const app = express();
const PORT = 8080;
const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'NO SE PUDO OBTENER LOS PRODUCTOS' });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'NO EXISTE EL PRODUCTO' });
    }
  } catch (error) {
    res.status(500).json({ error: 'NO SE PUDO OBTENER LOS PRODUCTO' });
  }
});

app.listen(PORT, () => {
  console.log(`El servidor está conectado al puerto ` + PORT);
});
