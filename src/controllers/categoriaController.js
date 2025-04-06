import Categoria from "../models/Categoria.js";

class CategoriasController{
    //Obtener todos las categorias de la base de datos y creamos tambien METODOS)
   static async getAllCategorias(req, res){
        const OBJCategoria = new Categoria();
        const categorias = await OBJCategoria.getAll();
        return res.json(categorias);
    }

   static async createCategoria(req,res){
    const{nombre,descripcion} = req.body;
    const OBJCategoria = new Categoria();
    const categorias = await OBJCategoria.create(nombre,descripcion);
    }
}
export default CategoriasController;