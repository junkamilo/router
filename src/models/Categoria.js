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

    async getById(id){
        try {
            const [rows] = await connection.query("select * from categorias where id = ? ", [id]);
            if (rows.length === 0) {
                throw new Error("Categoria no encontrada");
            }
            return rows;
        } catch (error) {
            throw new Error ("Error al obetener la categoria");
        }
        
        
    }

    async estaRalacionadaConProductos(categoria_id){
        try {
            const [rows] = await connection.query("select * from productos where categoria_id = ? ", [categoria_id]);
            return rows;
        } catch (error) {
            throw new Error ("Error al obetener la categoria");
        }
    }
    
     async delete(id){
        try {
        const datos = await this.getById(id);
        const tieneProductos = await this.estaRalacionadaConProductos(datos.id);
        console.log(tieneProductos);
        
        if (tieneProductos.length > 0) {
            return {
                error: true,
                mensaje: "No puede eliminar la Categoria"

            }
        }
        //Elimino la categoria
        const [result] = await connection.query("delete from categorias where id = ?" , [id]);
        //Valido que no tenga fallas al eliminar
        if(result.affectedRows === 0){
            return{
                error: true,
                mensaje:"Categoria no encontrada"
            }
        }
        return{
            error:false,
            mensaje:"Categoria eliminada exitosamente"
        }
        } catch (error) {
            console.log(error);
            
        }
        
        
    }
    async update(id,campos){
        let query = "UPDATE categorias SET ";
        let params = [];
        //construimos dinamicamente la consulta de actualizar solo con los campos que llegan
        for(const [key,value] of Object.entries(campos)){
            query += `${key} = ?, `;
            params.push(value);
        }
        query = query.slice(0, -2);
        query += " where id = ?";
        params.push(id);
        console.log(query , params);
        
        try {
            const [result] = await connection.query(query, params);
            if (result.affectedRows === 0) {
                return{
                    error : true,
                    mensaje: "No puede actulizar la categoria"
                }
            }
            return{
                error:false,
                mensaje:"Categoria  exitosamente"
            }
        } catch (error) {
            console.log(error);
        }
        
    }

}
export default Categoria;