import React, {useEffect, useState} from 'react';
import { Button, Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  const loadCartFromLocalStorage = () => {
    const cartString = localStorage.getItem('cart');
    return cartString ? JSON.parse(cartString) : [];
  };

  useEffect(() => {
    const cartFromLocalStorage = loadCartFromLocalStorage();
    setCarrito(cartFromLocalStorage);
  }, []);

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  const eliminarDelCarrito = (productoAEliminar) => {
    // Filtra el carrito para mantener solo los productos que no coincidan con el producto a eliminar
    const nuevoCarrito = carrito.filter(producto => producto.id !== productoAEliminar.id);
  
    // Actualiza el estado del carrito en el componente
    setCarrito(nuevoCarrito);
  
    // Guarda el nuevo carrito en el almacenamiento local
    saveCartToLocalStorage(nuevoCarrito);
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
          Carrito de Compras
        </Typography>
      </Grid>
      {(carrito.map((producto) => (
          <Grid item xs={12} key={producto.nombre}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={producto.imagen}
                  alt={producto.nombre}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {producto.descripcion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: {producto.precio}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button onClick={()=> eliminarDelCarrito(producto)}>Eliminar</Button>
            </Card>
            
          </Grid>
        ))
      )}

      
    </Grid>
    
  );
};

export default Carrito;
