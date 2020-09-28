var Restaurant = function (id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function (horarioReservado) {
    //refactorizado
    this.horarios = this.horarios.filter(horario => horario !== horarioReservado);
}

Restaurant.prototype.calificar = function (nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function () {
    if (!this.calificaciones || this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }
}

function promedio(arreglo) {
    let prom = sumatoria(arreglo) / arreglo.length

    return Math.round(prom * 10) / 10
}

function sumatoria(arreglo) {
    let total = 0;
    arreglo.forEach(element => {
        total += isNaN(element) ? 0 : element
    });
    return total;
}
