
## Descripción de Carpetas

### client/
- **public/**: Contiene los archivos estáticos accesibles públicamente (como `index.html`, imágenes y fuentes).
- **src/**: Contiene todo el código fuente del frontend:
  - **assets/**: Archivos estáticos como imágenes, CSS y fuentes.
  - **components/**: Componentes reutilizables (por ejemplo, botones, formularios, etc.).
  - **pages/**: Páginas principales del sitio (Inicio, Pedidos, Reportes, etc.).
  - **services/**: Funciones para interactuar con la API del backend.
  - **App.js**: Componente principal de la aplicación.
  - **index.js**: Punto de entrada de la aplicación React.
- **.env**: Variables de entorno para el frontend (si se requiere configuración especial).
- **package.json**: Dependencias y scripts específicos para el frontend.

### server/
- **config/**: Archivos para la configuración general, como la conexión a bases de datos (MySQL y MongoDB) y variables de entorno.
- **controllers/**: Controladores que manejan las solicitudes HTTP y la interacción con los modelos.
- **models/**: Modelos que representan la estructura de los datos en la base de datos (tanto MySQL como MongoDB).
- **routes/**: Rutas de la API que exponen los servicios al frontend (por ejemplo, gestión de pedidos, usuarios, pagos, etc.).
- **services/**: Lógica de negocio y funciones auxiliares que son llamadas por los controladores.
- **utils/**: Funciones y utilidades comunes, como autenticación, validación y manejo de errores.
- **app.js**: Configuración y punto de entrada para la API, donde se inicializa Express.
- **.env**: Variables de entorno para el backend.
- **package.json**: Dependencias y scripts para el backend.

### Archivos principales
- **.gitignore**: Archivos y carpetas que deben ser ignorados por Git (como archivos de configuración locales o dependencias de Node).
- **README.md**: Este archivo, que contiene la documentación del proyecto.
- **docker-compose.yml**: Si decides usar Docker, este archivo define los contenedores para la aplicación.

## Cómo comenzar

1. Clona el repositorio:
   ```bash
   git clone <URL del repositorio>
