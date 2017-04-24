function Pedido() {
    this.id;
    this.restaurante = "";
    this.client = "";
    this.platillos = [];
    this.repartidor = "";
    this.date = "";
    this.status = "";
    this.total = "";
    this.actualizarStatus = function(sts) {
        this.status = sts;
    }
    this.setPlatillos = function(platillos) {
        this.platillos = platillos;
    }
    this.setTotal = function(total) {
        this.total = total;
    }
    this.setDate = function(date) {
        this.date = date;
    }
    this.setDate = function(restaurante) {
        this.restaurante = restaurante;
    }
}

function Cliente() {
    this.id;
    this.direccion = "";
    this.hacerPedido = function(order) {
        order.client = this.id;
    }
    this.cambiarDireccion = function(address) {
        this.address = address;
    }
    this.buscar = function(restaurant) {
        return new Restaurante();
    }
    this.pagar = function(pedido, cash) {
        // Lógica pendiente
    }
    this.calificar = function(restaurante, rating) {
        restaurante.rating = rating;
    }
    this.filtrar = function() {
        // Lógica pendiente
    }

    this.consultarPedido = function(pedido) {
        return new Pedido();
    }
}

function Restaurante() {
    this.id;
    this.menu = "";
    this.rating = "";
    this.address = "";
    this.photo = "";
    this.foodtype = "";
    this.phone = "";
    this.schedule = "";
    this.mostrar = function() {
        return this;
    }
}

function Usuario() {
    this.id;
    this.name = "";
    this.password = "";
    this.email = "";
    this.login = function(name, password) {
        this.name = name;
        this.password = password;
    }
    this.register = function(email) {
        this.email = email;
    }
}

function Vendedor() {
    this.id;
    this.restaurante = "";
    this.listaPedidos = [];
    this.crearPlatillo = function(name, description, photo) {
        pl = new Platillo();
        pl.setNombre(name);
        pl.setDescription(description);
        pl.setPhoto(photo);
    }
    this.anadirPlatillo = function(menu, platillo) {
        // Lógica pendiente
    }
    this.actualizarInfo = function(restaurante) {
        this.restaurante = restaurante;
    }
    this.asignarPedido = function(pedido, repartidor) {
        pe = new Pedido();
        pe.pedido = pedido;
        pe.repartidor = repartidor;
    }
    this.actualizarStatus = function(pedido) {
        this.pedido = pedido;
    }
}

function Repartidor() {
    this.id;
    this.nombre = "";
    this.vehiculo = "";
    this.historialPedidos = [];
    this.restaurante = "";
    this.telefono = "";
}

function Platillo() {
    this.id;
    this.name = "";
    this.description = "";
    this.photo = "";
    this.price = "";
    this.setNombre = function(name) {
        this.name = name;
    }
    this.getNombre = function() {
        return this.name;
    }
    this.setDescription = function(description) {
        this.description = description;
    }

    this.getDescription = function() {
        return this.description;
    }
    this.setPhoto = function(photo) {
        this.photo = photo;
    }

    this.getPhoto = function() {
        return this.photo;
    }
    this.setPrice = function(price) {
        this.price = price;
    }

    this.getPrice = function() {
        return this.price;
    }
}
}