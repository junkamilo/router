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
    return res.json(categorias);
    }

    static deleteCategoria(req,res){
        const{ id } = req.params;
        const OBJCategoria = new Categoria();
        const categoria = OBJCategoria.delete(id);
    }
}
export default CategoriasController;