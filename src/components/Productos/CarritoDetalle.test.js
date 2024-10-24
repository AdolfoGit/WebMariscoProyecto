// CarritoDetalle.test.js
import { render, screen, waitFor } from '@testing-library/react';
import CarritoDetalle from './CarritoDetalle';
import React from 'react';

// Crea un mock del UserContext
jest.mock('../../UserContext', () => ({
  useUser: () => ({
    user: {
      idUsuario: 20,
      Nombre: 'Jafet Esaú',
      ApellidoPaterno: 'Guzmán',
      ApellidoMaterno: 'Martínez',
      Correo: '20211041@uthh.edu.mx',
      Telefono: '7711425326',
      Rol: 1,
      EstadoCuenta: 'Activo',
      Token: 'dbaf81e6115aafb1f92ac50281eced48598dcd15deef9d5248552da14b15aa8a',
      Icono: 'https://iebdlfthbbxohteapyua.supabase.co/storage/v1/object/public/LCDM/1729575737481_Sprite-0004.gif'
    }
  })
}));

test('debe obtener y mostrar las direcciones', async () => {
  render(<CarritoDetalle />);

  await waitFor(() => expect(screen.queryByText('Cargando...')).not.toBeInTheDocument(), { timeout: 90000 });

  // Busca el select que contiene las direcciones
  const selectElement = screen.getByRole('combobox');
  
  // Verifica que el select tenga la opción esperada
  expect(selectElement).toHaveTextContent(/calle Mexico, colonia Adolfo Lopez Mateos, numero interior 20/);
  
  
  
});
