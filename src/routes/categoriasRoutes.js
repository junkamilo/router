import express from 'express';

import CategoriasController from '../controllers/categoriaController.js';

const categoriasRouters = express();

categoriasRouters.get('/' , CategoriasController.getAllCategorias);

categoriasRouters.post('/' , CategoriasController.createCategoria);

export default categoriasRouters;