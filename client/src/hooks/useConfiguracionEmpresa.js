import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authHeader } from "../helpers/authHeader";

const API_URL = "http://localhost:5000/api/empresa";

export default function useConfiguracionEmpresa(initial) {
  const [userData, setUserData] = useState(initial);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // 🔹 Notificaciones bonitas
  const showNotification = (mensaje, icon = "success") => {
    Swal.fire({
      icon,
      title: mensaje,
      showConfirmButton: false,
      timer: 1800,
      background: "#272727",
      color: "#c9c9c9",
    });
  };

  // 🔹 Cargar datos de la empresa al iniciar
  const cargarEmpresa = async () => {
    try {
      const response = await axios.get(API_URL, { headers: authHeader() });
      if (response.data?.empresa) {
        setUserData(response.data.empresa); // ✅ asigna directamente la empresa
      } else {
        console.warn("No se encontró información de la empresa.");
      }
    } catch (error) {
      console.error("Error al cargar empresa:", error);
      showNotification("Error al cargar datos de la empresa", "error");
    }
  };

  // 🔹 Detecta cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Manejar cambio de imagen (subida a Cloudinary)
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Crea un formData para Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fastrequest_uploads"); // 🔹 Ajusta según tu Cloudinary
      formData.append("folder", "logos_empresas");

      // Subida directa a Cloudinary
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dp9jbvpwl/image/upload",
        formData
      );

      const imageUrl = uploadRes.data.secure_url;
      setUserData((prev) => ({ ...prev, LogoEmpresa: imageUrl }));

      showNotification("Logo actualizado correctamente", "success");
    } catch (error) {
      console.error("Error al subir imagen a Cloudinary:", error);
      showNotification("No se pudo subir la imagen", "error");
    }
  };

  // 🔹 Guardar cambios (PUT al backend)
  const saveChanges = async (e) => {
    e.preventDefault();

    try {
      const { Id, NombreEmpresa, LogoEmpresa } = userData;

      if (!NombreEmpresa.trim()) {
        showNotification("El nombre no puede estar vacío", "warning");
        return;
      }

      const response = await axios.put(
        `${API_URL}/${Id}`,
        { NombreEmpresa, LogoEmpresa },
        { headers: { ...authHeader(), "Content-Type": "application/json" } }
      );

      if (response.data?.success) {
        setUserData(response.data.empresa);
        setIsEditing(false);
        showNotification("Datos actualizados correctamente", "success");
      } else {
        showNotification("No se pudo actualizar la empresa", "error");
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      showNotification("Error al guardar cambios", "error");
    }
  };

  return {
    userData,
    isEditing,
    fileInputRef,
    setIsEditing,
    handleInputChange,
    saveChanges,
    handleProfilePictureChange,
    showNotification,
    cargarEmpresa,
  };
}
