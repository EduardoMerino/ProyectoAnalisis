function Pedido(){
  this.id,
  this.restaurante : "",
  this.client : "",
  this.platillos : [],
  this.repartidor : "",
  this.date : "",
  this.status : "",
  this.actualizarStatus = function(sts){
    this.status = sts;
  }
}

function Cliente(){
  this.id,
  this.direccion = "",
  this.hacerPedido = function(pedido){
    pedido.client = this.id;
  }
}
