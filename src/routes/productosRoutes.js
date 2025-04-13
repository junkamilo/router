import express from 'express';
import ProductosController from '../controllers/productosController.js';
import validarDatos from '../middlewares/createCategoria.js';
const productosRouters = express();

productosRouters.get('/' , ProductosController.getAllProductos);
productosRouters.post('/', validarDatos, ProductosController.createProductos);
productosRouters.put('/:id' , validarDatos , ProductosController.update);
productosRouters.patch('/:id' , validarDatos , ProductosController.update);
productosRouters.delete('/:id' , ProductosController.deleteProductos);
export default productosRouters;