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
    async create(nombre,descripcion){
       const [result] = await connection.query("insert into categorias(nombre, descripcion) value(? , ?)" , [nombre , descripcion]);
        return{
            id: result.insertId, 
            nombre,
            descripcion
        }
    }

    async getByid(id){
        try {
            const [rows] = await connection.query("select * from categorias where id = ? ", [id]);
            if (rows.length === 0) {
                throw new Error("Categoria no encontrada");
            }
            return rows(0);
        } catch (error) {
            throw new Error ("Error al obetener la categoria");
        }
        
        
    }

    

     async delete(id){
        let datos = await this.getByid(id);
        console.log(datos);
        
    }
}
export default Categoria;