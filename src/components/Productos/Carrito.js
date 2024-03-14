import React from 'react';
import { useUser } from '../../UserContext';
import { Button, Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

const Carrito = () => {
  const { cart, removeFromCart } = useUser();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
          Carrito de Compras
        </Typography>
      </Grid>
      {cart.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            El carrito está vacío.
          </Typography>
        </Grid>
      ) : (
        cart.map((producto) => (
          <Grid item xs={12} key={producto.id}>
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
              <Button onClick={() => handleRemoveFromCart(producto.id)}>Eliminar</Button>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Carrito;
