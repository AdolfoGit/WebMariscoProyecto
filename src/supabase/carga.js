import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Asegúrate de que la ruta sea correcta

const UploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const uploadImage = async (event) => {
    setUploading(true);

    let file = event.target.files[0];
    let filePath = `${Date.now()}_${file.name}`;

    try {
      const { data, error } = await supabase.storage
        .from('LCDM') // Asegúrate de que este sea el nombre correcto de tu bucket
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      console.log('Upload response data:', data); // Verifica la estructura del objeto data

      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from('LCDM')
        .getPublicUrl(filePath);

      if (publicUrlError) {
        throw publicUrlError;
      }

      console.log('Public URL response data:', publicUrlData); // Verifica la estructura del objeto publicUrlData

      setFileUrl(publicUrlData.publicUrl);
      console.log(fileUrl)
      alert('Imagen subida correctamente');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
      />
      {fileUrl && (
        <div>
          <p>URL de la imagen:</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
