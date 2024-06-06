
import platillo from '../home/img/cotel.jpg'
import platillo2 from '../home/img/hamburguesa.jpg'
import platillo3 from '../home/img/pescado.jpeg'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Carousel } from "@material-tailwind/react";

export function BookingCard() {
  return (
   <div>
      <h1 className="text-6xl font-bold tracking-tight text-black text-center mt-40">
        Mejores platillos del Restaurante
      </h1>
     <div className="flex pl-20 pr-20 m-20  sm:flex-row flex-col border-0">
      <Card sx={{ maxWidth: 350,border:'none', boxShadow: 'none',}}>
        <CardMedia>
          <Carousel className="rounded-t-[15px]">
            <img
              src={platillo}
              alt="image 1"
              className="h-80 w-full object-cover"
            />
            <img
              src={platillo}
              alt="image 2"
              className="h-80 w-full object-cover"
            />
            <img
              src={platillo}
              alt="image 3"
              className="h-80 w-full object-cover"
            />
          </Carousel>
        </CardMedia>
        <CardContent>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium ">
              Coctel de camarón
            </Typography>
            <Typography
              color="blue-gray"
              variant='h6'
              className="flex items-center gap-1.5 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-7 w-7 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              5.0
            </Typography>
          </div>

          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
 
      </Card>
      <Card sx={{ maxWidth: 350,border:'none', boxShadow: 'none',}}>
      <CardMedia>
          <Carousel className="rounded-t-[15px]">
            <img
              src={platillo2}
              alt="image 1"
              className="h-80 w-full object-cover"
            />
            <img
                src={platillo2}
              alt="image 2"
              className="h-80 w-full object-cover"
            />
            <img
               src={platillo2}
              alt="image 3"
              className="h-80 w-full object-cover"
            />
          </Carousel>
        </CardMedia>
        <CardContent>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              Hamburguesa de camarón
            </Typography>
            <Typography
              color="blue-gray"
              variant='h6'
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-7 w-7 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              5.0
            </Typography>
          </div>

          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
 
      </Card>
      <Card sx={{ maxWidth: 350,border:'none', boxShadow: 'none',}}>
        <CardMedia>
            <Carousel className="rounded-t-[15px]">
              <img
                src={platillo3}
                alt="image 1"
                className="h-80 w-full object-cover"
              />
              <img
                  src={platillo3}
                alt="image 2"
                className="h-80 w-full object-cover"
              />
              <img
                  src={platillo3}
                alt="image 3"
                className="h-80 w-full object-cover"
              />
            </Carousel>
          </CardMedia>
        <CardContent>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              Pescado frito
            </Typography>
            <Typography
              color="blue-gray"
              variant='h6'
              className="flex items-center gap-1.5 font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-7 w-7 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              5.0
            </Typography>
          </div>

          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
 
      </Card>
      
    </div>
   </div>
  );
}