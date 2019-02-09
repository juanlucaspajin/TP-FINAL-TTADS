function getEquiposFromAPI(){
    return fetch('http://localhost:3000/api/restaurantes').
        then(response => response.json())
}
function getRestByName(name) {
    return fetch('http://localhost:3000/api/restaurantes/nombre/'+name).
        then(response => response.json())
}

function getComidas() {
    return fetch('http://localhost:3000/api/comidas/').
        then(response => response.json())
}

function getRestaurantById(id) {
    return fetch('http://localhost:3000/api/restaurantes/'+id).
        then(response => response.json())
}

const app = new Vue({
    el: '#app',
    data: {
        restaurantes: [],
        flag: false,
        selectedComida: new Object(),
        restaurant: '',
        comidas: []
    },
    mounted:function(){
         this.getAllComidas();
    },
    methods: {
        getNombres(){
            var arr = getEquiposFromAPI().then(function(result){
                result.restaurantes.forEach(element => {
                    app.restaurantes.push(element.nombre)
                });
            });
        },

        getRestaurantByName(nombre) {
            var restaurant = getRestByName(nombre).then(function(result){
                result.restaurant.forEach(element => {
                    app.id = element._id
                });
            });
        },

        getAllComidas() {
            getComidas().then(function(result){
                result.comidas.forEach(element => {
                    app.comidas.push(element)
                });
            });
        },

        getRestById(id) {
            getRestaurantById(id).then(function(result){
                app.restaurant = result.restaurant
            });
        },

        selectOnClick(comida) {
            this.getRestById(comida.restaurantPrepara)
        }


    }
});