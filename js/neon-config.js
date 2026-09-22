import { neon } from 'https://esm.sh/@neondatabase/serverless';

// Cadena de conexión a tu proyecto en Neon DB
const CONNECTION_STRING = 'postgresql://neondb_owner:npg_Q6XRJqO4PGnE@ep-cool-meadow-b514xa35-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require';

// Exporta la conexión para ser reutilizada en otros archivos JS
export const sql = neon(CONNECTION_STRING);