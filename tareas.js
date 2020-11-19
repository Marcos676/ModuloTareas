const fs = require('fs'); //requiero el modulo file system

let moduloTareas = {
    archivo : './tareas.json',
    leerJSON : function(){
        let tareasJson = fs.readFileSync(this.archivo,'utf-8');
        let listaDeTareas = JSON.parse(tareasJson)
        return listaDeTareas
    },
    agregarTarea : function(titulo,estado){
        let listaDeTareas = this.leerJSON();

        let nuevaTarea = {
            titulo : titulo,
            estado : estado
        }
        listaDeTareas.push(nuevaTarea)
        
        this.guardarJSON(listaDeTareas)

    },
    guardarJSON : function(info){
        let nuevoJSON = JSON.stringify(info)
        fs.writeFileSync(this.archivo,nuevoJSON,'utf-8');
        
    },
    deshacer : function(){
        let listaDeTareas = this.leerJSON();
        listaDeTareas.pop();
        
        this.guardarJSON(listaDeTareas);
    },
    filtrar : function(filtro){//filtra en la propiedad estado(devuelve en objeto en el que se encontro el filtro que se le asigna)
        let listaDeTareas = this.leerJSON()//llama al archivo JSON
        let tareasFiltradas = listaDeTareas.filter(function(tarea) {//funcion de filtro al valor de la propiedad
            return tarea.estado === filtro//Devuelve el las tareas que cumplen con el filtro
        })
        return tareasFiltradas//retorna las tareas filtradas
    },//FINAL DE filtrar
    buscar : function(busqueda){//filtra en la propiedad titulo
        let listaDeTareas = this.leerJSON();
        let resultadoDeLaBusqueda = listaDeTareas.filter(function(tarea) {
            return tarea.titulo.includes(busqueda)//realiza el filtro con el .includes(con esa condicion devuelve todos los que encontre)
        })
        return resultadoDeLaBusqueda//(devuelve los resultados)
    }
}

module.exports = moduloTareas