import React from 'react';

const CarritoDetalle = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
        {/* Detalle de cada artículo en el carrito */}
        <div className="mb-4">
          <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg" alt="Front of men's Basic Tee in sienna." className="w-20 h-20 rounded-md object-cover mr-4" />
          <div>
            <h3 className="text-lg font-semibold mb-1">Basic Tee</h3>
            <p className="text-gray-600 mb-1">Sienna</p>
            <p className="text-gray-600 mb-1">Large</p>
            <p className="text-gray-800 font-semibold">$32.00</p>
            <button type="button" className="text-red-600 hover:text-red-700">Remove</button>
          </div>
        </div>
        <div className="mb-4">
          <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg" alt="Front of men's Basic Tee in black." className="w-20 h-20 rounded-md object-cover mr-4" />
          <div>
            <h3 className="text-lg font-semibold mb-1">Basic Tee</h3>
            <p className="text-gray-600 mb-1">Black</p>
            <p className="text-gray-600 mb-1">Large</p>
            <p className="text-gray-800 font-semibold">$32.00</p>
            <button type="button" className="text-red-600 hover:text-red-700">Remove</button>
          </div>
        </div>
        <div className="mb-4">
          <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg" alt="Insulated bottle with white base and black snap lid." className="w-20 h-20 rounded-md object-cover mr-4" />
          <div>
            <h3 className="text-lg font-semibold mb-1">Nomad Tumbler</h3>
            <p className="text-gray-600 mb-1">White</p>
            <p className="text-gray-800 font-semibold">$35.00</p>
            <button type="button" className="text-red-600 hover:text-red-700">Remove</button>
          </div>
        </div>
        {/* Resumen del pedido */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold mb-2">Order summary</h3>
          <div className="flex justify-between mb-1">
            <span>Subtotal</span>
            <span>$99.00</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Shipping estimate</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Tax estimate</span>
            <span>$8.32</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order total</span>
            <span className="font-semibold">$112.32</span>
          </div>
          <button type="button" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CarritoDetalle;
