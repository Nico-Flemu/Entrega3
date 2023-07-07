const fs = require('fs');

class ProductManager { 
  constructor(path) { 
    this.path = path;
  }  
  
  /* Agregar producto */

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = { 
      id: products.length + 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }
  /* Buscar producto */
    getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  /* Buscar por id*/
  getProductById(id) { 
    const products = this.getProducts();
    return products.find((product) => product.id === id);
  }
  /* Actualizar */

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const updatedProduct = { ...products[index], ...updatedFields, id }; 
      products[index] = updatedProduct;
      this.saveProducts(products);
      return updatedProduct;
    }
    return null;
  }

/* Eliminar */
  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = products[index];
      products.splice(index, 1);
      this.saveProducts(products);
      return deletedProduct;
    }
    return null; 
  }
  /* Guardar */
  saveProducts(products) { 
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }
}
module.exports = {
  ProductManager
};