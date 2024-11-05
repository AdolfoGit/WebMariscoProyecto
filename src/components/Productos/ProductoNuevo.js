import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useUser } from "../../UserContext";
import Swal from "sweetalert2";

const filters = [
  {
    id: "category",
    name: "Categoria",
    options: [
      { value: 1, label: "Entradas" },
      { value: "postres", label: "Postres" },
      { value: "Comida Rapida", label: "Comida Rapida" },
      { value: "Bebidas de sabor", label: "Bebidas de sabor" },
      { value: "Bebidas con alcohol", label: "Bebidas con alcohol" },
    ],
  },
];

const precio = [
  {
    id: "precio",
    name: "Precio",
    options: [
      { value: 1, label: "$100 - $150" },
      { value: 2, label: "$100 - $200" },
      { value: 3, label: "$100 - $250" },
      { value: 4, label: "$100 - $300" },
      { value: 5, label: "$100 - $350" },
      { value: 6, label: "$350 o mas" },
    ],
  },
];

export default function ProductoNuevo() {
  const { user } = useUser();
  const [productData, setProductData] = useState(null);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  // Función para abrir o crear la base de datos
  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("productosDB", 1);

      request.onerror = (event) => {
        console.error("Error al abrir la base de datos:", event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        console.log("Base de datos abierta con éxito");
        resolve(event.target.result);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("productos")) {
          db.createObjectStore("productos", { keyPath: "idProducto" });
        }
      };
    });
  }

  // Función para guardar productos en IndexedDB
  async function guardarProductosEnIndexedDB(productos) {
    try {
      const db = await openDatabase(); // Asegúrate de que la base de datos está abierta
      const transaction = db.transaction(["productos"], "readwrite");
      const store = transaction.objectStore("productos");

      productos.forEach((producto) => {
        store.put(producto); // Guardar cada producto en el almacén
      });

      transaction.oncomplete = () => {
        console.log("Productos almacenados en IndexedDB");
      };

      transaction.onerror = (event) => {
        console.error(
          "Error al almacenar productos en IndexedDB:",
          event.target.error
        );
      };
    } catch (error) {
      console.error("Error en IndexedDB:", error);
    }
  }

  // Función para obtener productos de IndexedDB
  async function obtenerProductosDeIndexedDB() {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("productos", "readonly");
      const store = transaction.objectStore("productos");

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = (event) => {
          resolve(event.target.result); // Devuelve los productos almacenados
        };
        request.onerror = (event) => {
          console.error(
            "Error al obtener productos de IndexedDB:",
            event.target.error
          );
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error en IndexedDB:", error);
      return [];
    }
  }

  useEffect(() => {
    obtenterDatosProductos();
    obtenerProductoCarrito();
  }, []);

  const obtenterDatosProductos = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerProductos`,
        {
          method: "GET",
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const product1Data = await response.json();
        setProductData(product1Data);
        guardarProductosEnIndexedDB(product1Data);

        console.log(product1Data);
      } else {
        console.error("traxendo los datos de indexedDB");
        // Si hay un error, intentar obtener los productos desde IndexedDB
      }
    } catch (error) {
      console.error("Error al obtener wewwe del eww:", error);
      const productosGuardados = await obtenerProductosDeIndexedDB();
      if (productosGuardados.length > 0) {
        setProductData(productosGuardados);
      } else {
        console.error("No hay productos guardados en IndexedDB.");
      }
    }
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const agregarAlCarrito = async (producto) => {
    const data = new FormData();
    data.append("idUsuario", user.idUsuario);
    data.append("idProducto", producto.idProducto);

    fetch(apiurll + "/api/CasaDelMarisco/AgregarProductosCarrito", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result === "Exito") {
          obtenerProductoCarrito();

          setOpen(true);
        } else {
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al procesar la solicitud",
        });
      });
  };

  const obtenerProductoCarrito = async () => {
    try {
      const response = await fetch(
        apiurll +
          `/api/CasaDelMarisco/TraerCarritoPorUsuario?idUsuario=${user.idUsuario}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setCart(data);
    } catch (error) {
      console.error("Error al obtener la informacion:", error);
    }
  };
  const eliminarDelCarrito = (productoAEliminar) => {
    const data = new FormData();
    data.append("idUsuario", user.idUsuario);
    data.append("idProducto", productoAEliminar.idProducto);
    data.append("idCarritoProductos", productoAEliminar.idCarritoProductos);

    fetch(apiurll + "/api/CasaDelMarisco/QuitarProductosCarrito", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result === "Exito") {
          obtenerProductoCarrito();
          setOpen(true);
        } else {
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al procesar la solicitud",
        });
      });
  };

  //funciones para las busquedas
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearchClick = () => {
    // Filtrar productos basados en la búsqueda
    const queryLowercase = searchQuery.trim().toLowerCase(); // Convertir la búsqueda a minúsculas

    if (queryLowercase === "") {
      // Si la búsqueda está vacía, mostrar todos los productos
      setShowAllProducts(true);
    } else {
      setShowAllProducts(false);
      // Si hay una búsqueda, filtrar los productos que coincidan con el criterio
      const filtered = productData.filter(
        (producto) => producto.Nombre.toLowerCase().includes(queryLowercase) // Convertir el nombre del producto a minúsculas
      );
      setFilteredProductos(filtered);
    }
  };

  const handleCategoryChange = (value) => {
    let updatedCategories = [...selectedCategories];

    // Actualizar el estado de las categorías seleccionadas
    const index = updatedCategories.indexOf(value);
    if (index !== -1) {
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(value);
    }
    setSelectedCategories(updatedCategories);

    // Verificar si se han seleccionado categorías
    const hasSelectedCategories = updatedCategories.length > 0;

    // Filtrar productos basados en las categorías seleccionadas y el rango de precios
    let filteredProducts = [];
    if (hasSelectedCategories) {
      filteredProducts = productData.filter((producto) => {
        return updatedCategories.includes(producto.Categoria);
      });
    } else {
      // Mostrar todos los productos si no se ha seleccionado ninguna categoría
    }

    // Actualizar el estado de los productos filtrados
    setFilteredProductos(filteredProducts);

    // Actualizar el estado de visualización de todos los productos
    setShowAllProducts(!hasSelectedCategories);
  };

  const handlePrecioChange = (precioSeleccionado) => {
    // Definir los rangos de precio según la selección
    console.log(precioSeleccionado);

    let precioMinimo = 0;
    let precioMaximo = Number.MAX_VALUE;

    // Verificar si se ha seleccionado un rango de precio

    if (precioSeleccionado === 0) {
      setShowAllProducts(true);
    } else {
      switch (precioSeleccionado) {
        case 1:
          precioMinimo = 100;
          precioMaximo = 150;

          break;
        case 2:
          precioMinimo = 100;
          precioMaximo = 200;

          break;
        case 3:
          precioMinimo = 100;
          precioMaximo = 250;

          break;
        case 4:
          precioMinimo = 100;
          precioMaximo = 300;

          break;
        case 5:
          precioMinimo = 100;
          precioMaximo = 350;

          break;
        case 6:
          precioMinimo = 350;
          precioMaximo = Number.MAX_VALUE;

          break;
        default:
          return; // No hay cambios en los productos
      }

      // Filtrar productos por el rango de precio seleccionado
      const filteredProducts = productData.filter((producto) => {
        return (
          precioSeleccionado === null ||
          (producto.Precio >= precioMinimo && producto.Precio <= precioMaximo)
        );
      });

      // Actualizar el estado de los productos filtrados
      setFilteredProductos(filteredProducts);
      setShowAllProducts(false);
    }
  };

  const verDetalle = (idProducto) => {
    navigate("/detalleProduct", { state: { idProducto } }); // Pasar idProducto en el estado de navegación
  };

  return (
    <div className="mt-5">
      <div>
        {/* espácio de los filtros */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden "
            onClose={setMobileFiltersOpen}
          >
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
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
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
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      onChange={() =>
                                        handleCategoryChange(
                                          section.id,
                                          option.value
                                        )
                                      }
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

        <main className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
          {/* espácio de los cabezerra */}
          <div className="flex flex-col lg:flex-row items-baseline justify-between border-b border-gray-200 pb-6 pt-1">
            <div className="flex flex-wrap justify-between lg:justify-start pr-4 pl-4 lg:flex-row">
              <div className="relative h-11">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="search-input"
                  className="peer h-full w-40 border-none border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-md font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Producto a buscar
                </label>
              </div>
              <Button size="sm" onClick={handleSearchClick}>
                Buscar
              </Button>
            </div>
            <div className="flex items-center">
              <button
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
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

            <div className="grid grid-cols-1 <gap-x-8 gap-y-10 lg:grid-cols-4">
              {/*-------------------------------------web  Filters--------------------------------------- */}
              <form className="hidden lg:block max-w-[200px]">
                <h3 className="sr-only bg-black">Categories</h3>
                <div className="overflow-y-auto max-h-[450px]">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                      defaultOpen
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-md text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6" defaultOpen>
                            <div className="space-y-4">
                              {section.options.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    defaultValue={option.value}
                                    type="checkbox"
                                    onChange={() =>
                                      handleCategoryChange(
                                        section.id,
                                        option.value
                                      )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 text-md text-gray-600">
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
                  {/**incio */}
                  {precio.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                      defaultOpen
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-md text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6" defaultOpen>
                            <div className="space-y-4">
                              {section.options.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    defaultValue={option.value}
                                    type="checkbox"
                                    value={option.value}
                                    onChange={(event) =>
                                      handlePrecioChange(
                                        event.target.checked ? option.value : 0
                                      )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label className="ml-3 text-md text-gray-600">
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
                  {/**fin */}
                </div>
              </form>

              {/* Product grid */}
              <div className="md:col-span-3">
                <Grid container spacing={3}>
                  {(showAllProducts ? productData : filteredProductos) &&
                    (showAllProducts ? productData : filteredProductos).map(
                      (producto) => (
                        <Grid
                          item
                          key={producto.idProducto}
                          xs={20}
                          sm={6}
                          md={4}
                        >
                          <Card className="shadow-none">
                            <CardActionArea>
                              <CardMedia
                                className="rounded-[9px] objet-cover bg-gray-200"
                                component="img"
                                image={producto.Imagen}
                                style={{
                                  transition: "transform 0.3s",
                                  height: "200px",
                                  width: "100%",
                                  margin: "0 auto", // Esto asegura que la imagen esté centrada horizontalmente
                                  display: "block",
                                  objectFit: "contain",
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.transform =
                                    "scale(1.3)")
                                }
                                onMouseOut={(e) =>
                                  (e.currentTarget.style.transform = "scale(1)")
                                }
                                onClick={() => verDetalle(producto.idProducto)}
                              />
                              <CardContent m-0 p-0>
                                <div className="flex justify-between  items-center gap-4">
                                  <Typography
                                    variant="text"
                                    className="nombre-producto font-bold text-[17px] truncate"
                                  >
                                    {producto.Nombre}
                                  </Typography>
                                  <button
                                    className="agrega-car p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                    onClick={() => agregarAlCarrito(producto)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6 text-gray-600"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <Typography
                                  variant="text"
                                  className="text-md"
                                  color="text.secondary"
                                >
                                  Categoria - Platillos fueres
                                </Typography>
                                <div className="flex flex-wrap gap-4 mt-2">
                                  <Typography
                                    variant="text"
                                    color="black"
                                    className="font-bold text-xl"
                                  >
                                    {producto.Precio} $
                                  </Typography>
                                  <Typography
                                    variant="text"
                                    color="text.secondary"
                                    className="text-md"
                                  >
                                    Disponibles: {producto.Disponibilidad}
                                  </Typography>
                                </div>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      )
                    )}
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
                      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-6xl pl-10">
                        <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-500 sm:duration-700"
                          enterFrom="translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500 sm:duration-700"
                          leaveFrom="translate-x-0"
                          leaveTo="translate-x-full"
                        >
                          <Dialog.Panel  data-testid="carrito" className="pointer-events-auto w-screen max-w-[35rem]">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                <div className="flex items-start justify-between">
                                  <Dialog.Title className="font-medium text-gray-600 text-md">
                                    Platillos Seleccionados
                                  </Dialog.Title>
                                  <div className="ml-3 flex h-7 items-center">
                                    <button
                                      type="button"
                                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="absolute -inset-0.5" />
                                      <span className="sr-only">Cerrar</span>
                                      <XMarkIcon
                                        className="h-8 w-8"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>
                                <div className="mt-8">
                                  <div className=" carrito-item flow-root">
                                    <ul
                                      role="list"
                                      className="-my-6 divide-y divide-gray-200"
                                    >
                                      {cart !== null &&
                                        cart.map((productoCarrito) => (
                                          <li
                                            key={productoCarrito.id}
                                            className="flex py-6"
                                          >
                                            <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                              <img
                                                src={productoCarrito.Imagen}
                                                className="h-full w-full object-cover object-center"
                                                alt='jks'
                                              />
                                            </div>
                                            <div className="ml-4 w-80">
                                              <Typography
                                                variant="text"
                                                className="nombre-producto2 text-md font-bold"
                                              >
                                                {productoCarrito.Nombre}
                                              </Typography>
                                              <div className="flex flex-wrap gap-2 mt-2">
                                                <Typography
                                                  variant="text"
                                                  className="text-md text-black"
                                                >
                                                  Precio Unitario: $
                                                  {
                                                    productoCarrito.PrecioUnitario
                                                  }
                                                </Typography>
                                                <Typography
                                                  variant="text"
                                                  className="ml-4 text-md font-bold"
                                                >
                                                  ${productoCarrito.Precio}
                                                </Typography>
                                              </div>
                                              <div className="flex flex-wrap gap-2">
                                                <Typography
                                                  variant="text"
                                                  className="text-md text-gray-500"
                                                >
                                                  Cantidad:
                                                </Typography>
                                                <button
                                                  type="button"
                                                  className="text-md text-indigo-600 hover:text-indigo-500 p-1"
                                                  onClick={() =>
                                                    eliminarDelCarrito(
                                                      productoCarrito
                                                    )
                                                  }
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M20 12H4"
                                                    />
                                                  </svg>
                                                </button>
                                                <span className="mx-2 text-xl">
                                                  {productoCarrito.Cantidad}
                                                </span>
                                                <button
                                                  type="button"
                                                  className="text-md text-indigo-600 hover:text-indigo-500 p-1"
                                                  onClick={() =>
                                                    agregarAlCarrito(
                                                      productoCarrito
                                                    )
                                                  }
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                  </svg>
                                                </button>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="border-t border-gray-200 px-4 py-2 ">
                                <Typography
                                  variant="text"
                                  className="mt-0.5 text-md text-gray-500 leading-tight"
                                >
                                  Si desea encargar los paltillos a domicilio
                                  por favor presione el boton para comprar{" "}
                                </Typography>
                                <div className="mt-6">
                                  <button
                                    onClick={() => navigate("/detalleCarrito")}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-md font-medium text-white shadow-sm hover:bg-indigo-700"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-7 w-7 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                      />
                                    </svg>
                                    Comprar
                                  </button>
                                </div>
                                <div className="mt-6 flex justify-center text-center  text-gray-500">
                                  <p>
                                    <button
                                      type="button"
                                      className=" text-md font-bold"
                                      onClick={() => setOpen(false)}
                                    >
                                      Seguir agregando
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
  );
}
