import Productos from "../models/Productos.js";
class ProductosController {

  //Obtener todos los productos de la base de datos y creamos tambien METODOS)
  static async getAllProductos(req, res) {
    const OBJCategoria = new Productos();
        const productos = await OBJCategoria.getAll();
        return res.json(productos);
  }
  //agregamos o creamos productos a la base de datos
  static async createProductos(req,res){
    const{nombre,descripcion} = req.body;
    const OBJCategoria = new Productos();
    const productos = await OBJCategoria.create(nombre,descripcion);
    return res.json(productos);
  }
  //actualizamos datos al servidor
  static async update(req,res){
    //Obtener el id y el nombre
    const{id} = req.params;
    const campos = req.body;
    const OBJCategoria = new Productos();
    const data = await OBJCategoria.update(id,campos);
    return res.json(data);
}
static async deleteProductos(req,res){
  const{ id } = req.params;
  const OBJCategoria = new Productos();
  const categoria = await OBJCategoria.delete(id);
  return res.json(categoria);
}

}
export default ProductosController;
