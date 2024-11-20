import React from 'react';

const posts = [
  {
    id: 1,
    title: '¡Experiencia Inolvidable!',
    href: '#',
    description:
      'Visitamos La Casa del Marisco durante nuestras vacaciones y quedamos impresionados con la calidad de los platillos. ¡Las brochetas de camarón son espectaculares! Definitivamente regresaremos.',
    date: 'Nov 10, 2024',
    datetime: '2024-11-10',
    category: { title: 'Reseñas', href: '#' },
    author: {
      name: 'Laura González',
      role: 'Cliente Frecuente',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: '¡Un lugar espectacular!',
    href: '#',
    description:
      'Me encantó la experiencia en La Casa del Marisco. El personal fue muy amable y atento, y los mariscos frescos realmente destacan. ¡Recomiendo la sopa de mariscos, es deliciosa!',
    date: 'Nov 8, 2024',
    datetime: '2024-11-08',
    category: { title: 'Reseñas', href: '#' },
    author: {
      name: 'Carlos Martínez',
      role: 'Turista',
      href: '#',
      imageUrl:
          'https://st3.depositphotos.com/29384342/33897/i/450/depositphotos_338975414-stock-photo-portrait-happy-middle-aged-man.jpg',
    },
  },
  {
    id: 3,
    title: 'Un sabor que no olvidarás',
    href: '#',
    description:
      'Probé los tacos de pescado y fue una experiencia única. Los sabores frescos y bien balanceados hicieron que mi visita a La Casa del Marisco fuera memorable. ¡Recomendadísimo!',
    date: 'Nov 5, 2024',
    datetime: '2024-11-05',
    category: { title: 'Reseñas', href: '#' },
    author: {
      name: 'Ana Fernández',
      role: 'Cliente frecuente',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

export default function Example() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white py-5 sm:py-29 w-full h-full lg:h-screen ">
        <h3 className="text-4xl pr-4 pl-4 lg:text-5xl text-center font-bold tracking-tight text-gray-900 mt-10">
          Testiomonios de clientes
        </h3>
        <div className="pl-10 pr-10 lg:pl-[48x] lg:pr-[48px] max-w-full">
          <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-md">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-md font-semibold leading-7 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-md leading-8 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-md leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
