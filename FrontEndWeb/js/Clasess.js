function Pedido(){
  this.id = "";
  this.restaurante = "";
  this.client = "";
  this.total = 0.00;
  this.platillos = [];
  this.repartidor = "";
  this.date = "";
  this.status = "";
  this.actualizarStatus = function(sts){
    this.status = sts;
  }
}

function Platillo(){
  this.id = "";
  this.nombre = "";
  this.precio = "";
  this.foto = "";
}

function Cliente(){
  this.id = "";
  this.direccion = "";
  this.hacerPedido = function(pedido){
    pedido.client = this.id;
  }
}
