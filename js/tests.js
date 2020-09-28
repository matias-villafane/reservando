let expect = chai.expect;
let assert = chai.assert;
let should = chai.should;

describe("Funcion reservarHorario()", function () {
    let restaurantHorarioValido = listado.buscarRestaurante(2);
    let restaurantHorarioInvalido = listado.buscarRestaurante(3);
    let restaurantHorarioInvalido2 = listado.buscarRestaurante(4);
    let restaurantHorarioVacio = listado.buscarRestaurante(3);
    before(function () {
        restaurantHorarioValido.reservarHorario('15:00');
        restaurantHorarioInvalido.reservarHorario('11:00');
        restaurantHorarioInvalido2.reservarHorario('15');
        restaurantHorarioVacio.reservarHorario();
    });
    it("Cuando se reserva un horario del restaurant, el horario correspondiente se elimina del arreglo", function () {
        expect(restaurantHorarioValido.horarios).to.not.include(["15:00"]);
        expect(restaurantHorarioValido.horarios).to.have.lengthOf(2);
    });
    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual", function () {
        expect(restaurantHorarioInvalido.horarios).to.eql(["11:30", "12:00", "22:30"]);
        //uso .to.eql() para evitar la validacion estricta comparando arrays
        expect(restaurantHorarioInvalido.horarios).to.have.lengthOf(3);
    });
    it("Cuando se intenta reservar un horario pero no se le pasa ningun parametro a la funcion, el arreglo se mantiene igual", function () {
        expect(restaurantHorarioVacio.horarios).to.eql(["11:30", "12:00", "22:30"]);
        expect(restaurantHorarioVacio.horarios).to.have.lengthOf(3);
    });
    it("Cuando se intenta reservar un horario con formato incorrecto, el arreglo se mantiene igual", function () {
        expect(restaurantHorarioInvalido2.horarios).to.eql(["12:00", "15:00", "17:30"]);
        expect(restaurantHorarioInvalido2.horarios).to.have.lengthOf(3);
    });
});


describe("Funcion obtenerPuntuacion()", function () {
    let restaurantPuntuacionOK = listado.buscarRestaurante(12);
    let restaurantPuntuacionInv = listado.buscarRestaurante(13);
    let restaurantSinPuntuacion = listado.buscarRestaurante(14);
    restaurantSinPuntuacion.calificaciones = [];
    let restaurantSinPuntuacion2 = listado.buscarRestaurante(15);
    restaurantSinPuntuacion2.calificaciones = null;
    it("Dado un restaurant con determinadas calificaciones, la puntuación se calcula correctamente. \n restaurant: " + restaurantPuntuacionOK.nombre, function () {
        expect(restaurantPuntuacionOK.obtenerPuntuacion()).to.equal(5);
        assert.typeOf(restaurantPuntuacionOK.obtenerPuntuacion(), 'number');
    });
    it("Dado un restaurant con determinadas calificaciones, la puntuación se calcula correctamente. \n restaurant: " + restaurantPuntuacionInv.nombre, function () {
        expect(restaurantPuntuacionInv.obtenerPuntuacion()).to.equal(7);
        assert.typeOf(restaurantPuntuacionInv.obtenerPuntuacion(), 'number');
    });
    it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.", function () {
        expect(restaurantSinPuntuacion.obtenerPuntuacion()).to.equal(0);
        expect(restaurantSinPuntuacion2.obtenerPuntuacion()).to.equal(0);
    });
});

describe("Funcion calificar()", function () {
    let restaurant = listado.buscarRestaurante(9); //[8, 8, 7, 7, 7, 7]
    let restaurant2 = listado.buscarRestaurante(5); //[8, 3, 9, 5, 6, 7]
    let restaurant3 = listado.buscarRestaurante(6); //[8, 3, 2, 1, 8, 7]
    it("Dada una calificacion, se agrega al arreglo correctamente. Calificamos con un 2", function () {
        assert.lengthOf(restaurant.calificaciones, 6, "El Arreglo tiene 6 elementos");
        restaurant.calificar(2);
    });
    it("Dada una calificacion, se agrega al arreglo correctamente. Calificamos con un 7", function () {
        assert.lengthOf(restaurant.calificaciones, 7, "Se agrego correctamente la calificacion, el arreglo tiene 7 elementos");
        expect(restaurant.calificaciones).to.eql([8, 8, 7, 7, 7, 7, 2]);
    });
    it("Dada una calificacion, se agrega al arreglo correctamente. Calificamops con un 10", function () {
        restaurant.calificar(10);
        assert.lengthOf(restaurant.calificaciones, 8, "Se agrego correctamente la calificacion, el arreglo tiene 8 elementos");
        expect(restaurant.calificaciones).to.eql([8, 8, 7, 7, 7, 7, 2, 10]);
    });
    it("Dada una calificacion fuera del rango [1 ... 10], el arreglo se mantiene sin cambios. Calificamos con 11", function () {
        restaurant2.calificar(11);
        expect(restaurant2.calificaciones).to.eql([8, 3, 9, 5, 6, 7]);
        assert.lengthOf(restaurant2.calificaciones, 6, "La calificacion 11 no se agrega");
    });
    it("Dada una calificacion fuera del rango [1 ... 10], el arreglo se mantiene sin cambios. Calificamos con -1", function () {
        restaurant2.calificar(-1);
        expect(restaurant2.calificaciones).to.eql([8, 3, 9, 5, 6, 7]);
        assert.lengthOf(restaurant2.calificaciones, 6, "La calificacion -1 no se agrega");
    });
    it("Dada una calificacion fuera del rango [1 ... 10], el arreglo se mantiene sin cambios. Calificamos con 10", function () {
        restaurant2.calificar(10);
        expect(restaurant2.calificaciones).to.eql([8, 3, 9, 5, 6, 7, 10]);
        assert.lengthOf(restaurant2.calificaciones, 7, "La calificacion 10 se agrega correctamente");
    });
    it("Dada una calificacion con tipo de dato String o null, el arreglo se mantiene sin cambios. Calificamos con '5'", function () {
        restaurant3.calificar('5');
        assert.lengthOf(restaurant3.calificaciones, 6, "La calificacion '5' no se agrega al arreglo");
    });
    it("Dada una calificacion con tipo de dato String o null, el arreglo se mantiene sin cambios. Calificamos con ''", function () {
        restaurant3.calificar('');
        assert.lengthOf(restaurant3.calificaciones, 6, "La calificacion '' no se agrega al arreglo");
    });
    it("Dada una calificacion con tipo de dato String o null, el arreglo se mantiene sin cambios. Calificamos con null", function () {
        restaurant3.calificar(null);
        assert.lengthOf(restaurant3.calificaciones, 6, "La calificacion null no se agrega al arreglo");
        expect(restaurant3.calificaciones).to.eql([8, 3, 2, 1, 8, 7]);
    });
});

describe("Funcion buscarRestaurante()", function () {
    let restaurant;
    let restaurant2;
    before(function () {
        restaurant = listado.buscarRestaurante(7);
        restaurant2 = listado.buscarRestaurante(32);
    })
    it("Dado un id correspondiente a un restaurant, devuelve el objeto restaurant con los atributos definidos", function () {
        expect(restaurant).to.have.own.property("id");
        expect(restaurant).to.have.own.property("nombre");
        expect(restaurant).to.have.own.property("rubro");
        expect(restaurant).to.have.own.property("ubicacion");
        expect(restaurant).to.have.own.property("horarios");
        expect(restaurant).to.have.own.property("imagen");
        expect(restaurant).to.have.own.property("calificaciones");
        expect(restaurant).to.be.a('Object');
        expect(restaurant.id).to.equal(7);
    });
    it("Dado un id de restaurant inexistente, devuelve el mensaje indicandolo", function () {
        expect(restaurant2).to.equal("No se ha encontrado ningún restaurant");
    });
});

describe("Funcion obtenerRestaurantes()", function () {
    let restaurants;
    before(function () {
        restaurants = listado.obtenerRestaurantes("Pasta", "Roma", null)
    });
    it("Dados los parametros de busqueda 'Pasta' y 'Roma' devuelve un array con dos restaurantes", function () {
        expect(Array.isArray(restaurants));
        assert.lengthOf(restaurants, 2);
        expect(restaurants[1]).to.be.a("Object");

    });
});

describe("Funcion obtenerPrecioBase()", function () {
    let reserva = new Reserva(new Date(2020, 4, 5, 13, 0), 4, 500, 'DES15');
    let reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    let reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");

    it("Dado un restaurant, la funcion calcula correctamente el precio base de la reserva", function () {
        expect(reserva.obtenerPrecioBase()).to.equal(2000);
        expect(reserva1.obtenerPrecioBase()).to.equal(2800);
        expect(reserva2.obtenerPrecioBase()).to.equal(300);
    });
});

describe("Funcion obtenerPrecioTotal()", function () {
    let reserva = new Reserva(new Date(2020, 4, 3, 13, 0), 4, 500, 'DES15');
    let reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    let reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");

    it("Dado un restaurant, la funcion calcula correctamente el precio base de la reserva", function () {
        expect(reserva.obtenerPrecioTotal()).to.equal(1900);
        expect(reserva1.obtenerPrecioTotal()).to.equal(2450);
        expect(reserva2.obtenerPrecioTotal()).to.equal(100);
    });
});
