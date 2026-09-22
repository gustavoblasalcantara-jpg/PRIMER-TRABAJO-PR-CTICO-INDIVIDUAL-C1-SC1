import { sql } from './neon-config.js';

/**
 * Registra un nuevo usuario en la tabla usuarios de Neon DB.
 */
export async function registrarUsuario(nombre, correo, contrasena) {
  try {
    const resultado = await sql`
      INSERT INTO usuarios (nombre, correo, contrasena)
      VALUES (${nombre}, ${correo}, ${contrasena})
      RETURNING id, nombre, correo;
    `;
    return resultado[0];
  } catch (error) {
    console.error('Error al registrar usuario en Neon DB:', error);
    if (error.message.includes('unique constraint') || error.message.includes('duplicate key')) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }
    throw new Error('No se pudo registrar el usuario en la base de datos.');
  }
}

/**
 * Verifica credenciales en Neon DB y guarda la sesión activa en sessionStorage.
 */
export async function iniciarSesion(correo, contrasena) {
  try {
    const usuarios = await sql`
      SELECT id, nombre, correo 
      FROM usuarios 
      WHERE correo = ${correo} AND contrasena = ${contrasena};
    `;

    if (usuarios.length > 0) {
      // Requisito oficial: Almacenar en sessionStorage la sesión activa
      sessionStorage.setItem('usuario', JSON.stringify(usuarios[0]));
      return usuarios[0];
    }
    return null;
  } catch (error) {
    console.error('Error al verificar credenciales en Neon DB:', error);
    throw new Error('Error al conectar con la base de datos para autenticación.');
  }
}

/**
 * Cierra la sesión activa y redirige a login.html.
 */
export function cerrarSesion() {
  sessionStorage.removeItem('usuario');
  window.location.href = 'login.html';
}

/**
 * Requisito oficial: Verifica que exista sessionStorage.getItem('usuario').
 * Si no existe, redirige automáticamente a login.html.
 */
export function verificarSesion() {
  const usuario = sessionStorage.getItem('usuario');
  if (!usuario) {
    window.location.href = 'login.html';
  }
}