let moduloTareas = require('./tareas')
const process = require('process');

let comando = process.argv[2]

switch (comando) {
    case 'prueba' :
        console.log('ESTA ES UNA PRUEBA DE LO QUE HACE ARGV')    
    break
    case 'listar':
        let tareas = moduloTareas.leerJSON();
        console.log('---------------------------------------------')//diseño impreso
        console.log('------------LISTA TE TAREAS------------------')
        console.log('---------------------------------------------')
        for (let index = 0; index < tareas.length; index++) {
            
           console.log('Titulo de la tarea: ' + tareas[index].titulo + ', con estado: ' +  tareas[index].estado)
        }
        break;
    case 'agregar' :
        let titulo = process.argv[3];
        let estado = process.argv[4];
        moduloTareas.agregarTarea(titulo,estado)
        console.log('---------------------------------------------')
        console.log('------LA TAREA HA SIDO AGREGADA--------------')
        console.log('---------------------------------------------')
        break;
    case 'deshacer':
        moduloTareas.deshacer();
        console.log('---------------------------------------------')
        console.log('--------SE ELIMINÓ LA ÚLTIMA TAREA-----------')
        console.log('---------------------------------------------')
        break
    case 'filtrar'://caso que pasandole un parametro busca e imprime lo buscado a travez del filtro( en este caso filtra a travez de estado)
        let filtro = process.argv[3]//el filtro se debe aplicar en en la posicion 3 de la consola
        let tareasFiltradas = moduloTareas.filtrar(filtro);//guradado en una variable el resultado del metodo filtrar
        console.log('---------------------------------------------')
        console.log('----TAREAS FILTRADAS POR ' + filtro.toUpperCase() + '-----------')// .toUpperCase() devuelve el string como mayuscula
        console.log('---------------------------------------------')
        tareasFiltradas.forEach(function(tarea){//recorre el array devolviendo las tareas que cumplen con el filtro
            console.log('Titulo de la tarea: ' + tarea.titulo + ', con estado: ' +  tarea.estado)//lo impreme por consola en el fotmato deseado
        })
        break
    case 'buscar'://lo milsmo que filtrar pero filtrando a travez de otra propiedad(en este caso por titulo)
        let busqueda = process.argv[3]
        let resultadoDeLaBusqueda = moduloTareas.buscar(busqueda);
        if(resultadoDeLaBusqueda.length == 0){//condicion en la que si no encuentra resultado del filtro implime lo siguiente
            console.log('---------------------------------------------')
            console.log('-----NO HUBIERON RESULTADOS DE ' + busqueda.toUpperCase() +'--------')
            console.log('---------------------------------------------')
        }else{//condicion en la que implime lo que encuentra
            console.log('---------------------------------------------')
            console.log('-----RESULTADO DE LA BUSQUEDA: ' + busqueda.toUpperCase() +'--------')
            console.log('---------------------------------------------')
            resultadoDeLaBusqueda.forEach(function(tarea){
                console.log('Titulo de la tarea: ' + tarea.titulo + ', con estado: ' +  tarea.estado)
            })
        }
        break
    case undefined ://caso en el que por consola no se llegara a parar el parametro para que se cumpla alguna condicion del comando se imprima lo siguiente
        
        console.log(`Tenés que utilizar alguno de los siguientes comandos:
        - listar
        - prueba
        - deshacer
        - agregar
        - filtrar
        - buscar
        `)//   (``)(teclas: ALT GR + } (cerrar llave.Arriba del enter))Bastics o comilla invertida se usa para evitar concatenaciones y poder devolver algo en forma de lista
        break
    default://si no se cumple ninguna condicion se imprime lo siguiente
        console.log('---------------------------------------------')
        console.log('-----ESTE COMANDO NO ESTÁ DISPONIBLE---------')
        console.log('---------------------------------------------')
        break;
}
