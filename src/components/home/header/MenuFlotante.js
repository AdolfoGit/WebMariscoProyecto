import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline';

const solutions = [
  { name: 'Entradas', description:'Platillos hechos del Mar', href: '#', icon: ChartPieIcon },
  { name: 'Postres', description: 'Platillos de postre', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Bedidas', description: "Diferentes bebidas", href: '#', icon: FingerPrintIcon },
];


export default function MenuFlotante() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Popover className="relative">
      <div
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        className="inline-flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-800 cursor-pointer"
      >
        <span>Menu</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </div>

      <Transition
        show={isMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
          className="absolute left-1/2 z-10 mt-2 flex w-screen max-w-max -translate-x-1/2 px-4"
        >
          <div className="w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm shadow-lg ring-1 ring-gray-900/5">
            <div className="pr-9">
              {solutions.map((item) => (
                <div key={item.name} className="relative flex  p-4 hover:bg-gray-50">
                  <div className="mt-1 mr-2 h-11 w-11 bg-gray-50 ">
                    <item.icon className=" text-gray-600 group-hover:text-indigo-600 " aria-hidden="true" />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900 mr-2">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
