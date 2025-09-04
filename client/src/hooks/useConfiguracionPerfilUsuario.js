import { useState, useEffect, useRef } from "react";

const useConfiguracionPerfilUsuario = () => {
  // Estado para menús
  const [navActive, setNavActive] = useState(false);
  const [profileMenuActive, setProfileMenuActive] = useState(false);

  // Estado de usuario
  const [userData, setUserData] = useState({
    firstName: "Luis",
    lastName: "Angel",
    email: "luisangel@ejemplo.com",
    phone: "+52 123 456 7890",
    address: "Calle Ejemplo #123, Ciudad, País",
    dob: "01/01/1990",
    profileImage: "Pepe.jfif",
  });

  // Edición
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Refs
  const profileMenuRef = useRef(null);
  const fileInputRef = useRef(null);

  // Inyectar estilos de notificación
  useEffect(() => {
    if (!document.getElementById("notification-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "notification-styles";
      styleEl.textContent = `/* Tus estilos de notificación aquí */`;
      document.head.appendChild(styleEl);
    }
  }, []);

  // Inicializar datos del formulario
  useEffect(() => {
    if (isEditing) {
      const dobParts = userData.dob.split("/");
      const formattedDob =
        dobParts.length === 3
          ? `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`
          : "";

      setEditFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        dob: formattedDob,
      });
    }
  }, [isEditing, userData]);

  // Cerrar menú al hacer click fuera
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

  // Notificación
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

  // Eventos
  const toggleNav = () => setNavActive(!navActive);
  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setProfileMenuActive(!profileMenuActive);
  };

  const handleInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const dobDate = new Date(editFormData.dob);
    const formattedDob = `${String(dobDate.getDate()).padStart(2, "0")}/${String(
      dobDate.getMonth() + 1
    ).padStart(2, "0")}/${dobDate.getFullYear()}`;

    setUserData({ ...userData, ...editFormData, dob: formattedDob });
    setIsEditing(false);
    showNotification("Perfil actualizado con éxito", "success", "Datos guardados");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showNotification(
          "Por favor, selecciona un archivo de imagen válido",
          "error",
          "Error de formato"
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({ ...userData, profileImage: e.target.result });
        showNotification("Foto de perfil actualizada", "success", "Imagen cambiada");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      showNotification("Cerrando sesión...", "info");
      setTimeout(() => (window.location.href = "/"), 1000);
    }
  };

  return {
    navActive,
    profileMenuActive,
    userData,
    isEditing,
    editFormData,
    profileMenuRef,
    fileInputRef,
    setIsEditing,
    toggleNav,
    toggleProfileMenu,
    handleInputChange,
    saveChanges,
    handleProfilePictureChange,
    handleLogout,
    showNotification,
  };
};

export default useConfiguracionPerfilUsuario;
