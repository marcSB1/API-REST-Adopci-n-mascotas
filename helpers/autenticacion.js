import 'dotenv/config' // carga variables de entorno
import jsonwebtoken from 'jsonwebtoken';

// este método genera un token (pase de acceso) firmado (nadie puede modificarlo, si alguien lo cambia el servidor lo detecta), guarda el email en el token
// usa la clave secreta process.env.JWT_TOKEN_SECRET que está en .env para firmarlo
export function generarToken(email) {
    return jsonwebtoken.sign({ email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
}

// middleware
export function verificarToken(req, res, next) {

    const token = req.header('Authorization')?.replace('Bearer ', ''); // lee el header authorization, quita la palabra bearer, se queda solo con el token

    if (!token) {
        return res.status(401).json({ error: 'Token requerido' }); // si no hay token el usuario no está autenticado
    }

    try {
        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET); // comprueba que el token es auténtico, que no ha caducado, extrae los datos internos ({ email })
        req.emailConectado = dataToken.email; // guardo la el email que viene del token validado en req
        next(); // esto permite que se ejecute el controlador (usuariosController.profile)
    } catch (error) {
        res.status(401).json({ error: 'Token no válido' }); // si el token no es válido no se ejecuta el controlador (usuariosController.profile)
    }
}