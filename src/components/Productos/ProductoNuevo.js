
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
    Button,
    TextField,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
  
import imageen from '../home/img/platillo.jpg';
import imageen2 from '../home/img/hamburguesa.jpg';
import imageen3 from '../home/img/cotel.jpg';
import imageen5 from '../home/img/pescado.jpeg';
import imageen6 from '../home/img/brocheta.jpg';
import imageen7 from '../home/img/bebida.jpg';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';

const productos = [
{
    id: 1,
    nombre: 'Producto 1',
    descripcion: 'Descripción del producto 1. Detalles adicionales sobre el producto.',
    precio: '$19.99',
    disponibles: 10,
    categoria: 'bebida',
    imagen: imageen,
},
{
    id: 2,
    nombre: 'Producto 2',
    descripcion: 'Descripción del producto 2. Detalles adicionales sobre el producto.',
    precio: '$29.99',
    disponibles: 5,
    categoria: 'bebida',
    imagen: imageen3,
},
{
    id: 3,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    categoria: 'platillo',
    imagen: imageen2,
},
{
    id: 4,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    categoria: 'platillo',
    imagen: imageen5,
},
{
    id: 5,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    categoria: 'platillo',
    imagen: imageen6,
},{
    id: 6,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    categoria: 'postres',
    imagen: imageen7,
},
{
    id: 7,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    categoria: 'postres',
    disponibles: 15,
    imagen: imageen2,
},
{
    id: 8,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    categoria: 'postres',
    imagen: imageen5,
},
{
    id: 9,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$00',
    disponibles: 15,
    imagen: imageen6,
},
{
    id: 10,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: imageen2,
},
{
    id: 11,
    nombre: 'bebida',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '30',
    disponibles: 15,
    imagen: imageen5,
},
{
    id: 12,
    nombre: 'bebida',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: 500,
    disponibles: 15,
    imagen: imageen6,
},


]

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
 
  {
    id: 'category',
    name: 'Categoria',
    options: [
      { value: 'platillo', label: 'Entradas', checked: false },
      { value: 'postres', label: 'Postres', checked: false },
      { value: 'Comida Rapida', label: 'Comida Rapida', },
      { value: 'Bebidas de sabor', label: 'Bebidas de sabor', checked: false },
      { value: 'Bebidas con alcohol', label: 'Bebidas con alcohol', checked: false },
    ],
  },
  {
    id: 'precio',
    name: 'Precio',
    options: [
      { value: 100, label: '$100 - $150', checked: false },
      { value: 200, label: '$100 - $200', checked: false },
      { value: 250, label: '$100 - $250', checked: false },
      { value: 300, label: '$100 - $300', checked: false },
      { value: 350, label: '$100 - $350', checked: false },
      { value: 1000, label: '$350 o mas', checked: false }, // Cambié el valor de '6' a '1000'
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductoNuevo() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate=useNavigate();
  const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
      // Clona el array del carrito y agrega el nuevo producto
      setCarrito([...carrito, producto]);
      setOpen(true);
      console.log(`Producto agregado al carrito: ${producto.nombre}`);
    };

 //funciones para las busquedas
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const handleSearchClick = () => {
    // Filtrar productos basados en la búsqueda
    const queryLowercase = searchQuery.trim().toLowerCase(); // Convertir la búsqueda a minúsculas

    if (queryLowercase === '') {
      // Si la búsqueda está vacía, mostrar todos los productos
      setShowAllProducts(true);
    } else {
      // Si hay una búsqueda, filtrar los productos que coincidan con el criterio
      const filtered = productos.filter(
        (producto) => producto.nombre.toLowerCase().includes(queryLowercase) // Convertir el nombre del producto a minúsculas
      );
      setFilteredProductos(filtered);
      setShowAllProducts(false);
    }
  };

  const handleCategoryChange = (sectionId, value) => {
    let updatedCategories = [...selectedCategories];
    let updatedPriceRange = selectedPriceRange; // Suponiendo que 'selectedPriceRange' es tu estado para el rango de precios
  
    // Actualizar el estado de las categorías seleccionadas
    const index = updatedCategories.indexOf(value);
    if (index !== -1) {
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(value);
    }
    setSelectedCategories(updatedCategories);
  
    // Obtener el rango de precios seleccionado
    if (sectionId === 'precio') {
      const selectedPriceOption = filters.find(filter => filter.id === 'precio').options.find(option => option.value === value);
      updatedPriceRange = selectedPriceOption.checked ? selectedPriceOption.value : [];
      setSelectedPriceRange(updatedPriceRange);
    }
  
    // Filtrar productos basados en las categorías seleccionadas y el rango de precios
    let filteredProducts = productos.filter((producto) => {
      const categoryMatch = updatedCategories.length === 0 || updatedCategories.includes(producto.categoria);
      const priceMatch = updatedPriceRange.length === 0 || updatedPriceRange.includes(producto.precio);
      return categoryMatch && priceMatch;
    });
  
    // Actualizar el estado de los productos filtrados
    setFilteredProductos(filteredProducts);
    setShowAllProducts(false);
  };
  
  const filterProductsByPrice = (products, priceRange) => {
    return products.filter((producto) => {
      return priceRange.includes(producto.precio);
    });
  };
  


  const eliminarDelCarrito = (productoAEliminar) => {
    // Filtra el array del carrito para mantener solo los productos que no coincidan con el producto a eliminar
    const nuevoCarrito = carrito.filter(producto => producto !== productoAEliminar);
    setCarrito(nuevoCarrito);
    console.log(`Producto eliminado del carrito: ${productoAEliminar.nombre}`);
  };
  
  const verDetalle = () => {
    // Clona el array del carrito y agrega el nuevo producto
    navigate('/detalleProduct')
  };

  return (
    <div className="bg-white">
      <div>
        {/* espácio de los filtros */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden " onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                   

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-9xl px-5 sm:px-6 lg:px-8">
               {/* espácio de los cabezerra */}
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-1">
            <div className='flex'>
              <div className="relative h-11 w-80 min-w-[200px]">
                <input placeholder="Standard"   
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="peer h-full w-80 border-none border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                <label
                  className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Producto a buscar
                </label>
              </div>
              <Button
                onClick={handleSearchClick}>
                Buscar
              </Button>
            </div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
             {/* espácio de los la cabezera */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only bg-black">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block max-w-[200px]" >
              <h3 className="sr-only bg-black">Categories</h3>
              <div className="overflow-y-auto max-h-[450px]"> {/* Establece la altura máxima para mostrar el scroll */}
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6" defaultOpen>
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6" defaultOpen>
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={selectedCategories.includes(option.value)}
                                  onChange={() => handleCategoryChange(section.id, option.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div>
            </form>

              {/* Product grid */}
              <div className="md:col-span-3"><Grid container spacing={3}>
            {(showAllProducts ? productos : filteredProductos).map((producto) => (
                <Grid item key={producto.id} xs={20} sm={6} md={4}>
                <Card>
                    <CardActionArea style={{ display: 'flex', flexDirection: 'column', background: 'transparent' }}>
                    <CardMedia
                        component="img"
                        alt={producto.nombre}                     
                        image={producto.imagen}
                        style={{ transition: 'transform 0.3s' ,height: '200px',}}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        onClick={()=>verDetalle()}
                        />
                        <CardContent style={{ flex: '1' }}>
                        <Typography variant="h6" component="div">
                        {producto.nombre}
                        <Button
                        size="small"
                        onClick={() => agregarAlCarrito(producto)}
                        style={{ marginLeft: '37%', margin: '10px', backgroundColor: 'orange', color: 'white' }}>
                        <LocalGroceryStoreOutlinedIcon /> Carrito
                        </Button>

                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {producto.descripcion}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Precio: {producto.precio}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Disponibles: {producto.disponibles}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
                </Grid>
            ))}
            </Grid>
            </div>
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Carrito de Compras</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Cerrar</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {carrito.map((productoCarrito) => (
                              <li  className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={productoCarrito.imagen}
                                   
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a>{productoCarrito.nombre}</a>
                                      </h3>
                                      <p className="ml-4">{productoCarrito.precio}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{productoCarrito.descripcion}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Categoria {productoCarrito.categoria}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => eliminarDelCarrito(productoCarrito)}
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Comprar
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continuar con la compra
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
