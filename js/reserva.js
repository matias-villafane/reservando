const Reserva = function (horario, nroPersonas, precioIndividual, codigoDescuento) {
    this.horario = horario;
    this.nroPersonas = nroPersonas;
    this.precioIndividual = precioIndividual;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.obtenerPrecioBase = function () {
    let precioBase = this.nroPersonas * this.precioIndividual;

    return precioBase;
}

Reserva.prototype.obtenerPrecioTotal = function () {
    let precioBase = this.obtenerPrecioBase();
    let extras = this.calcularExtras();
    let descuentos = this.calcularDescuentos();
    //console.log(`Precio base ${precioBase}, Extras: ${extras}, Descuentos: ${descuentos}`)
    return precioBase + extras - descuentos;
}

Reserva.prototype.calcularDescuentos = function () {
    let precioBase = this.obtenerPrecioBase();
    let descuentos = 0;
    //calculo de descuentos por personas
    if (this.nroPersonas > 3) {
        if (this.nroPersonas > 6) {
            if (this.nroPersonas > 8) {
                descuentos += precioBase * 0.15;
            } else {
                descuentos += precioBase * 0.1;
            }
        } else {
            descuentos += precioBase * 0.05;
        }
    }

    // calculo de descuentos por codigo
    switch (this.codigoDescuento) {
        case 'DES15':
            descuentos += precioBase * 0.15;
            break;
        case 'DES200':
            descuentos += 200;
            break;
        case 'DES1':
            descuentos += this.precioIndividual;
            break;
        default:
            break;
    }
    return descuentos;
}

Reserva.prototype.calcularExtras = function () {
    let precioBase = this.obtenerPrecioBase();
    let extras = 0;
    //calculo extras
    //console.log(this.horario.toString());
    switch (this.horario.getHours()) {
        case 13:
            extras += precioBase * 0.05;
            //console.log(`Extra hora 13 ${extras}`);
            break;
        case 20:
            extras += precioBase * 0.05;
            //console.log(`Extra hora 20 ${extras}`);
            break;
        default:
            break;
    }
    //console.log(`Dia: ${this.horario.getDay()}`)
    switch (this.horario.getDay()) {
        case 0: //Domingo
            extras += precioBase * 0.1;
            break;
        case 5: //Viernes
            extras += precioBase * 0.1;
            break;
        case 6: //Sabado
            extras += precioBase * 0.1;
            break;
        default:
            break;
    }
    return extras;
}