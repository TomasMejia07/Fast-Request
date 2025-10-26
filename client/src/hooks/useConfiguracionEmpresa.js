import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const API_URL = "http://localhost:5000/api/empresa";

export default function useConfiguracionEmpresa(initial) {
  const [userData, setUserData] = useState(initial);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);



  // Función para mostrar notificaciones personalizadas
  const showNotification = (message, type = "info", title = null) => {
    const defaultTitles = {
      success: "Éxito",
      error: "Error",
      warning: "Advertencia",
      info: "Información",
    };

    const icons = {
      success: '<ion-icon name="checkmark-circle"></ion-icon>',
      error: '<ion-icon name="close-circle"></ion-icon>',
      warning: '<ion-icon name="warning"></ion-icon>',
      info: '<ion-icon name="information-circle"></ion-icon>',
    };

    const notificationTitle = title || defaultTitles[type];
    let container = document.querySelector(".notification-container");

    if (!container) {
      container = document.createElement("div");
      container.className = "notification-container";
      document.body.appendChild(container);
    }

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-icon">${icons[type]}</div>
      <div class="notification-content">
        <div class="notification-title">${notificationTitle}</div>
        <div class="notification-message">${message}</div>
      </div>
      <div class="notification-close">
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <div class="notification-progress">
        <div class="notification-progress-bar"></div>
      </div>
    `;
    container.appendChild(notification);

    const progressBar = notification.querySelector(
      ".notification-progress-bar"
    );
    progressBar.style.animation = "progress 3s linear forwards";

    setTimeout(() => {
      notification.style.transform = "translateY(0)";
      notification.style.opacity = "1";
    }, 10);

    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => closeNotification(notification));

    const timeout = setTimeout(
      () => closeNotification(notification),
      3000
    );

    notification.addEventListener("mouseenter", () => {
      progressBar.style.animationPlayState = "paused";
      clearTimeout(timeout);
    });

    notification.addEventListener("mouseleave", () => {
      progressBar.style.animationPlayState = "running";
      setTimeout(() => closeNotification(notification), 3000);
    });

    function closeNotification(element) {
      element.style.transform = "translateX(100%)";
      element.style.opacity = "0";
      setTimeout(() => element.remove(), 300);
    }
  };




  const cargarEmpresa = async () => {
    try {
      const response = await axios.get(`${API_URL}/viewEmpresa`, { headers: authHeader() });

      if (response.data) {
        setUserData(response.data);
      } else {
        console.warn("No se encontró información de la empresa.");
      }
    } catch (error) {
      console.error("Error al cargar empresa:", error);
      showNotification("Error al cargar datos de la empresa", "error", 'Error al cargar datos');
    }
  };



  //  Detecta cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };



  const handleProfileEdit = async () => {
    try {

      const token = localStorage.getItem('token')

      if (!token) {
        showNotification("Usuario no autenticado", "error");
        return;
      }
      const decoded = jwtDecode(token);
      const empresaId = decoded.id;

      const formData = new FormData()

      formData.append("NombreEmpresa", userData.NombreEmpresa || "")

      if (userData.LogoEmpresa instanceof File) {
        formData.append("image", userData.LogoEmpresa);
      } else {
        console.log('📤 No se envía imagen nueva');
      }

      Swal.fire({
        title: 'Subiendo imagen...',
        text: "Espera un poco, la imagen se esta subiendo🚀!",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const res = await axios.put(
        `${API_URL}/editData/${empresaId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Datos actualizados correctamente')

      if (res.data.empresa) {
        const empresa = res.data.empresa;

        const updatedUserData = {
          ...userData,
          NombreEmpresa: empresa.NombreEmpresa ?? userData.NombreEmpresa,
          LogoEmpresa: empresa.LogoEmpresa ?? userData.LogoEmpresa,
        };

        setUserData(updatedUserData);

        
        window.dispatchEvent(new CustomEvent('companyDatesUpdated', {
          detail: { companyDatesUpdated: updatedUserData }
        }));
      }

      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'Los datos de la empresa se actualizaron correctamente',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#1a1a1a',
        color: '#e0e0e0',
        iconColor: '#4CAF50'
      });

      return res.data.empresa;

    } catch (err) {
      console.error('❌ Error en la API para cambiar el logo de la empresa:', err);
      console.log('error al actualizar los datos de la empresa', err)
      showNotification('Error al actualizar los datos de la empresa', 'error');
      throw err;
    }
  };





  const saveChanges = async (e) => {
    e.preventDefault();
    try {

      const res = await handleProfileEdit();

      if (res && res.empresa) {
        await cargarEmpresa();
      }
      setIsEditing(false);
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      showNotification("Error al guardar los cambios", "error");
    }
  }


  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        showNotification("Selecciona un archivo de imagen válido", "error", "Error de formato");
        return;
      }

      setUserData(prev => ({
        ...prev,
        LogoEmpresa: file,
      }));

      showNotification("Foto seleccionada, recuerda guardar los cambios", "success", "Imagen lista");
    }
  }



  useEffect(() => {
    cargarEmpresa();
  }, [])

  return {
    userData,
    isEditing,
    fileInputRef,
    setIsEditing,
    handleInputChange,
    handleProfilePictureChange,
    showNotification,
    cargarEmpresa,
    saveChanges
  };
}
