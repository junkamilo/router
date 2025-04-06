import connection from "../utils/db.js";

class Categoria{
    constructor(){
        
    }

     async getAll(){
        try {
            const [rows] = await connection.query("SELECT * FROM categorias");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener las categorias");
        }
    }
    //Metodo -> crear una categoria
    create(nombre,descripcion){
        connection.query("insert into categorias(nombre, descripcion) value(? , ?)" , [nombre , descripcion]);
    }
}
export default Categoria;