import { sql } from './neon-config.js';

/**
 * Guarda una nueva inscripción en la tabla inscripciones_programas_sociales de Neon DB.
 * @param {Object} datos - Objeto con { nombre_beneficiario, dni, programa }
 * @returns {Promise<string>} Código de seguimiento generado (ej. COD-12345678)
 */
export async function guardarInscripcion(datos) {
  // Genera un código de seguimiento único según la guía oficial
  const codigoSeguimiento = 'COD-' + Date.now().toString().slice(-8);

  try {
    await sql`
      INSERT INTO inscripciones_programas_sociales (codigo_seguimiento, nombre_beneficiario, dni, programa)
      VALUES (${codigoSeguimiento}, ${datos.nombre_beneficiario}, ${datos.dni}, ${datos.programa});
    `;
    
    return codigoSeguimiento;
  } catch (error) {
    console.error('Error al registrar inscripción en Neon DB:', error);
    throw new Error('No se pudo guardar la inscripción en la base de datos.');
  }
}