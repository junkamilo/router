import express from 'express';

import CategoriasController from '../controllers/categoriaController.js';
import validarDatos from '../middlewares/createCategoria.js';

const categoriasRouters = express();

categoriasRouters.get('/' , CategoriasController.getAllCategorias);

categoriasRouters.post('/' , validarDatos , CategoriasController.createCategoria);

categoriasRouters.delete('/:id' , CategoriasController.deleteCategoria)

export default categoriasRouters;