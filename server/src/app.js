// variables de app
const express = require("express");
const autenticarToken = require('./middlewares/verificarJWT');

const { sequelize } = require("./config/db.js");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');
const db = require("./config/db.js");

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log("Modelos sincronizados correctamente.");
  })
  .catch((error) => {
    console.error("Error al sincronizar los modelos:", error);
  });

// Funcion que se ejecuta para esperar la conexion a la base de datos con el fin de que la db este lista antes de iniciar el servidor  
async function esperarDB() {
  let intentos = 0;
  while (intentos < 10) {
    try {
      const conn = await sequelize.authenticate();
      console.log('✅ Conexión a la base de datos establecida.');
      conn.release();
      break;
    } catch (err) {
      intentos++;
      console.log(`🔁 Esperando conexión a DB... intento ${intentos}`);
      await new Promise(res => setTimeout(res, 3000)); // espera 3s
    }
  }
}


esperarDB().then(() => {
  // Sincronizar modelos aca(si aún lo deseas aquí)
  sequelize.sync()
    .then(() => {
      console.log("✅ Modelos sincronizados correctamente.");
    })
    .catch((error) => {
      console.error("❌ Error al sincronizar modelos:", error);
    });

  // Importación de rutas
  const usuarioRoutes = require("./routers/usuario.routes");
  const pedidoRoutes = require("./routers/hacerPedido.routes.js");
  const categoriaRoutes = require("./routers/categoria.routes.js");
  const validarEmailRoutes = require("./routers/validarEmail.routes");
  const recuperarCuenta = require("./routers/recuperarCuenta.routes");

  const clienteRouter = require('./routers/cliente.routes');
  const productoRoutes = require("./routers/producto.routes");
  const estadisticasRoutes = require('./routers/estadisticas.routes.js');
  const permisosRoutes = require('./routers/permiso.routes.js');
  const rolRoutes = require('./routers/rol.routes.js');
  const configuracionPerfil = require('./routers/configuracionPerfil.routes.js')
  const configuracion = require('./routers/configuracion.routes.js')

  // Rutas protegidas o públicas
  app.use("/api/usuarios", usuarioRoutes);
  app.use("/api/pedidos", pedidoRoutes);
  app.use("/api/categorias", categoriaRoutes);
  app.use("/api/validarEmail", validarEmailRoutes);
  app.use("/api/recuperarCuenta", recuperarCuenta);
  app.use("/api/cliente", clienteRouter);
  app.use("/api/productos", productoRoutes);
  app.use("/api/estadisticas", estadisticasRoutes);
  app.use("/api/permisos", permisosRoutes);
  app.use("/api/rol", rolRoutes);
  app.use('/api/perfil', configuracionPerfil)
  app.use('/api/configuracion', configuracion)

  

  const { crearPermisosIniciales } = require("./controllers/permiso.controller.js");
  crearPermisosIniciales();

  app.get("/", (req, res) => {
    res.send("API de registro de usuarios en funcionamiento.");
  });

  app.listen(PORT, () => {
    console.log("🚀 Servidor iniciado en el puerto " + PORT);
  });
});

