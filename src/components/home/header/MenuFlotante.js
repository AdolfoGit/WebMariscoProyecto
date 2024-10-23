import React, { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const sortOptions = [
  { name: 'Mision/Vision', href: '/Nosotros', current: true },
]


export default function MenuFlotante() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <Popover className="relative inline-block text-left">
      {({ open }) => (
        <>
         <Popover.Button
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            className="group inline-flex justify-center items-center text-md font-medium text-black-900 hover:text-gray-900"
          >
            Conocenos
            <ChevronDownIcon
              className="-mr-1 ml-1 h-9 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            {menuOpen && ( // Agregar un triángulo si el menú está abierto
              <span
                className="absolute top-full right-1/2 -mt-2 -translate-x-1/2 w-0 h-0 border-t border-transparent border-solid border-gray-700"
              />
            )}
          </Popover.Button>
          
          <Transition
            show={menuOpen || open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="absolute z-10 right-0 mt-2 w-60 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    className={classNames(
                      option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                      'block px-4 py-2 text-md'
                    )}
                  >
                    {option.name}
                  </a>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

