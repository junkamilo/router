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
    static async update(req,res){
        //Obtener el id y el nombre
        const{id} = req.params;
        const campos = req.body;
        const OBJCategoria = new Categoria();
        const data = await OBJCategoria.update(id,campos);
        return res.json(data);
    }

    static async deleteCategoria(req,res){
        const{ id } = req.params;
        const OBJCategoria = new Categoria();
        const categoria = await OBJCategoria.delete(id);
        return res.json(categoria);
    }
}
export default CategoriasController;