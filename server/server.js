import express, { json } from 'express';
import cors from 'cors';
import { Pool } from 'pg'; // Tu cliente de PostgreSQL

const app = express();
app.use(cors()); // Permite peticiones desde el frontend (React)
app.use(json());

// Tus credenciales de PostgreSQL
const pool = new Pool({


user: "postgres",
host: "localhost",
database: "sistemabui",
password: "12345678",
port: 5432

});

// Endpoint / API para la consulta
app.get('/api/consulta/:cedula', async (req, res) => {
  const { cedula } = req.params;
  
  try {
    // 1. Usamos $1 como marcador de posición
    const query = 'SELECT * FROM datos WHERE cedula_cliente = $1';
    
    // 2. Pasamos la variable [cedula] dentro del arreglo para reemplazar $1 de forma segura
    const result = await pool.query(query, [cedula]);

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]); // Retorna los datos del usuario encontrado
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});