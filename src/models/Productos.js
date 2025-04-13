import connection from "../utils/db.js";
class Productos {
    constructor() {
        
    }
    //pedimos informacion al servidor
    async getAll(){
        try {
            const [rows] = await connection.query("SELECT * FROM productos");
            return rows;
        } catch (error) {
            throw new Error("Error al obtener los productos");
        }
    }
    //creamos o enviamos datos al servidor
    async create(nombre,descripcion){
        const [result] = await connection.query("insert into productos(nombre, descripcion) value(? , ?)" , [nombre , descripcion]);
         return{
             id: result.insertId, 
             nombre,
             descripcion
         }
     }
     //actualizamos datos al servidor
     async update(id,campos){
        let query = "UPDATE productos SET ";
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
                mensaje:"producto actualizado exitosamente"
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    /**
     * 
     * @param {integer} id //identificador del modelo
     * @returns {object} //Objeto del modelo
     */
    async delete(id){
    //eliminamos datos del servidor
        try {
        const datos = await this.getById(id);  
        //Elimino la categoria
        const [result] = await connection.query("delete from productos where id = ?" , [id]);
        //Valido que no tenga fallas al eliminar
        if(result.affectedRows === 0){
            return{
                error: true,
                mensaje:"Producto no encontrado",
                data: datos
            }
        }
        return{
            error:false,
            mensaje:"Producto eliminado exitosamente"
        }
        } catch (error) {
            console.log(error);
            
        }
        
        
    }
    /**
     * Comenatario largo que describa el método
     * 
     * @param {integer} id //Identificador del modelo 
     * @returns {Object} //OBjeto del modelo
     */
    async getById(id){
        try {
            const [rows] = await connection.query("select * from productos where id = ? ", [id]);
            if (rows.length === 0) {
                throw new Error("Producto no encontrado");
            }
            return rows;
        } catch (error) {
            throw new Error ("Error al obetener el producto");
        }
        
        
    }
}
export default Productos;