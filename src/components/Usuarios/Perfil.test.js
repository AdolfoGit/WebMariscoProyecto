import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Perfil from './Perfil';  // Ajusta la ruta según tu proyecto
import { MemoryRouter } from 'react-router-dom';  // Importa MemoryRouter

// Crea un mock del contexto de usuario
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

describe('Perfil Component - Camera functionality', () => {
  let mockGetUserMedia;

  beforeAll(() => {
    // Simula la API de getUserMedia del navegador
    mockGetUserMedia = jest.fn(() =>
      Promise.resolve({
        getTracks: () => [
          {
            stop: jest.fn(),
          },
        ],
      })
    );
    global.navigator.mediaDevices = {
      getUserMedia: mockGetUserMedia,
    };
  });

  test('debería inicializar la cámara al hacer clic en "Abrir la cámara"', async () => {
    const { getByText } = render(
      <MemoryRouter> {/* Envuelve el componente en MemoryRouter */}
        <Perfil />
      </MemoryRouter>
    );

    // Simula hacer clic en el botón para abrir la cámara
    const openCameraButton = getByText("Abrir la cámara");
    fireEvent.click(openCameraButton);

    // Verifica si `navigator.mediaDevices.getUserMedia` fue llamado
    await waitFor(() =>
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
        video: true,
      })
    );
  });

  test('debería tomar la foto cuando se hace clic en "Tomar foto"', async () => {
    const { getByText } = render(
      <MemoryRouter> {/* Envuelve el componente en MemoryRouter */}
        <Perfil />
      </MemoryRouter>
    );

    // Simula abrir la cámara primero
    const openCameraButton = getByText("Abrir la cámara");
    fireEvent.click(openCameraButton);

    // Verifica si `navigator.mediaDevices.getUserMedia` fue llamado
    await waitFor(() =>
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalled()
    );

    // Simula hacer clic en el botón para tomar la foto
    const takePhotoButton = getByText("Tomar foto");
    fireEvent.click(takePhotoButton);

    // Verifica que el botón de tomar foto sigue existiendo después del clic
    await waitFor(() => {
      expect(takePhotoButton).toBeInTheDocument();
    });
  });
});
