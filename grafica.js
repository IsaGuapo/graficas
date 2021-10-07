    /* Practicaremos cómo crear gráficas con las librerías vistas en clase

Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
En el eje X el nombre de la película
En el eje Y año de publicación

API ENDPOINT --> https://swapi.dev/api/films/ */

//creo variables 
let films;
let titleFilm=[]
let yearFilm=[]
const urlStarWars=(`https://swapi.dev/api/`)


// Funcion para traerme los datos con Fetch. Recoge la informacion
async function getFilm(){
    let films = await fetch(`${urlStarWars}/films/`)
        .then(res=>res.json()) //la pasa a Json
        .then(response => { //Nos traemos el Json
            console.log(response)
            for (let i=0; i<response.results.length; i++){ //creamos un bucle for  para pasar por todos los titulos
                titleFilm.push(response.results[i].title)//Tenemos que para el push para incluir titulo
                yearFilm.push(response.results[i].release_date.substring(0,4)) // año pelicula
                
            }  
            graphic (titleFilm,yearFilm) //
        }) 
        .catch(error=>console.log(error));
    }
 
        
  
getFilm()

const graphic=(titles,dates)=>{
    let  data = {
        labels: titles,
        series: 
        [dates]
      
    };
new Chartist.Line('#chart1', data);
}

/*Pediremos los personajes de Star Wars y pintaremos una gráfica de barras en la que podamos ver
En el eje X el nombre del personaje
En el eje Y el número de películas en las que ha participado.
API ENDPOINT --> https://swapi.dev/api/people/*/

  let people;
  let namePeople=[];
  let numfils=[];

  async function getPeople (){
      let people= await fetch (`${urlStarWars}/people/`)
        .then(res=>res.json()) //la pasa a Json
        .then(response => { 
            console.log(response)
            for (let i=0; i<response.results.length; i++){
                namePeople.push(response.results[i].name)
                numfils.push(response.results[i].films.length)
            }
            graphicsecond(namePeople, numfils)
        })
        .catch(error=>console.log(error));
    }   

getPeople()



const  graphicsecond =(character, filmCount)=> {
    let secondData={
        labels: character,
        series: [filmCount]
    
    }
    let options = {
        seriesBarDistance: 15
      };
      
      var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
          seriesBarDistance: 10,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value;
            }
          }
        }],
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      
      new Chartist.Bar('#chart2', secondData, options, responsiveOptions);
}
