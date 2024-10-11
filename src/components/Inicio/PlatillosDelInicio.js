import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import platillo from '../home/img/foto2.png'
const noodles = [
  {
    title: 'Noodles three',
    description: 'White plate with dried shrimps',
    price: 12,
    rating: 8.1,
    image: platillo, // Reemplaza con la URL de tu imagen
  },
  {
    title: 'Noodles one',
    description: 'Noodles spicy boil with seafood and pork in hot pot',
    price: 20,
    rating: 9.2,
    image: platillo, // Reemplaza con la URL de tu imagen
  },
  {
    title: 'Noodles two',
    description: 'Noodles prawn spicy soup',
    price: 16,
    rating: 8.5,
    image: platillo, // Reemplaza con la URL de tu imagen
  },
];

const NoodleMenu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-yellow-200 p-4 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {noodles.map((noodle, index) => (
          <Card key={index} className="w-full max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full h-36">
              <img
                src={noodle.image}
                alt={noodle.title}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>
            <CardContent>
              <Box className="flex items-center mb-2">
                <StarIcon className="text-yellow-500" />
                <Typography variant="h6" component="div" className="ml-1">
                  {noodle.rating}
                </Typography>
              </Box>
              <Typography gutterBottom variant="h5" component="div">
                {noodle.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {noodle.description}
              </Typography>
              <Typography variant="h6" component="div" className="mt-2">
                {noodle.price}$
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NoodleMenu;
