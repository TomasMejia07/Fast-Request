import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { authHeader } from "../helpers/authHeader";
import { validacionDeCampos } from "../helpers/validacionDeCampos";

const useConfiguracionPerfilUsuario = (initial) => {


  const [navActive, setNavActive] = useState(false);
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  const [userData, setUserData] = useState(initial);
  const [errores, setErrores] = useState({
    telefono: '',
    direccion: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const profileMenuRef = useRef(null);
  const fileInputRef = useRef(null);


  useEffect(() => {
    if (!document.getElementById("notification-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "notification-styles";
      styleEl.textContent = `/* Tus estilos de notificación aquí */`;
      document.head.appendChild(styleEl);
    }
  }, []);

const API_GET = async () => {
    try {

      const token = localStorage.getItem('token')

      if (!token) {
        showNotification("Usuario no autenticado", "error");
        return;
      }

      const decoded = jwtDecode(token);
      const usuarioId = decoded.id;

      const res = await axios.get(
        `http://localhost:5000/api/perfil/getUser/${usuarioId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const Perfil = res.data.usuario

      if (Perfil) {
        setUserData({
          usuarioId: Perfil.id || usuarioId,
          nombre: Perfil?.nombre,
          apellido: Perfil?.apellido,
          correo: Perfil?.correo,
          telefono: Perfil.Perfil?.telefono || "Por completar",
          direccion: Perfil.Perfil?.direccion || "Por completar",
          fechaNacimiento: Perfil.Perfil?.fechaNacimiento || null,
          Imagen_De_Perfil: Perfil.Perfil?.Imagen_De_Perfil || "https://res.cloudinary.com/dp9jbvpwl/image/upload/v1757260230/user_izbzpi.png",
        });
      }

    } catch (err) {

      console.error('❌ Error en API_GET:', err);
      if (err.response?.status === 404) {
        showNotification('Perfil no encontrado', 'error');
      } else {
        showNotification('Error al cargar los datos del perfil', 'error');
      }
    }
  }


  const API_PUT = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        showNotification("Usuario no autenticado", "error");
        return;
      }

      const decoded = jwtDecode(token);
      const usuarioId = decoded.id;

      const formData = new FormData()

      formData.append("telefono", userData.telefono || "")
      formData.append("direccion", userData.direccion || "")
      formData.append("fechaNacimiento", userData.fechaNacimiento || "")

      if (userData.Imagen_De_Perfil instanceof File) {
        formData.append("image", userData.Imagen_De_Perfil);
      } else {
        console.log('📤 No se envía imagen nueva');
      }

      const res = await axios.put(
        `http://localhost:5000/api/perfil/update-perfil/${usuarioId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Datos actualizados correctamente')

      if (res.data.perfil) {
        const perfil = res.data.perfil;


        const updatedUserData = {
          ...userData,
          telefono: perfil.telefono ?? userData.telefono,
          direccion: perfil.direccion ?? userData.direccion,
          fechaNacimiento: perfil.fechaNacimiento ?? userData.fechaNacimiento,
          Imagen_De_Perfil: perfil.Imagen_De_Perfil ?? userData.Imagen_De_Perfil,
        };


        setUserData(updatedUserData);


        window.dispatchEvent(new CustomEvent('userProfileUpdated', {
          detail: { updatedUserData: updatedUserData }
        }));
      }

      return res.data;

    } catch (err) {
      console.error('❌ Error en API_PUT:', err);
      console.log('error al registrar o actualizar los datos', err)
      showNotification('Error al actualizar el perfil', 'error');
      throw err;
    }
  }

  useEffect(() => {
    API_GET()
  }, [])

  const saveChanges = async (e) => {
    e.preventDefault();
    try {

      const telefonoError = validacionDeCampos('telefono', userData.telefono);
      const direccionError = validacionDeCampos('direccion', userData.direccion);

      const res = await API_PUT();

      setErrores({
        ...errores,
        telefono: telefonoError,
        direccion: direccionError,
      })

      if (telefonoError || direccionError) {
        showNotification("Por favor corrige los errores en el formulario", "error");
        return;
      }

      if (res && res.perfil) {
        await API_GET();
      }

      setIsEditing(false);
      showNotification("Perfil actualizado con éxito", "success");

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
        Imagen_De_Perfil: file,
      }));

      showNotification("Foto seleccionada, recuerda guardar los cambios", "success", "Imagen lista");
    }
  }


  const handleInputChange = ({ target }) => {

    const { name, value } = target

    setUserData({
      ...userData,
      [name]: value
    });

    setErrores({
      ...errores,
      [name]: validacionDeCampos(name, value)
    });
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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


  const toggleNav = () => setNavActive(!navActive);


  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setProfileMenuActive(!profileMenuActive);
  };



  //formateador de fechas


  const date = userData.fechaNacimiento ? new Date(userData.fechaNacimiento) : null;
  if (date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const fechaNacimiento = userData.fechaNacimiento
    ? new Date(userData.fechaNacimiento).toISOString().split('T')[0]
    : ''


  return {
    navActive,
    profileMenuActive,
    userData,
    isEditing,
    profileMenuRef,
    fileInputRef,
    setIsEditing,
    toggleNav,
    toggleProfileMenu,
    handleInputChange,
    saveChanges,
    showNotification,
    handleProfilePictureChange,
    date,
    fechaNacimiento,
    API_GET,
    errores
  };
};

export default useConfiguracionPerfilUsuario;
