export const traducirErrorAppwrite = (error: any): string => {
  const msg = (error?.message || "").toLowerCase();
  const code = error?.code || 0;

  // Autenticación
  if (msg.includes("invalid credentials")) return "Correo o contraseña incorrectos.";
  if (msg.includes("user not found")) return "El usuario no existe. Verifica tu correo.";
  if (msg.includes("missing authentication")) return "Tu sesión ha expirado. Vuelve a iniciar sesión.";
  if (msg.includes("unauthorized") || code === 401) return "No tienes permisos para realizar esta acción.";
  if (msg.includes("session already active")) return "Ya tienes una sesión activa. Cierra sesión primero.";
  if (msg.includes("creation of a session is prohibited")) return "Ya existe una sesión iniciada.";
  if (msg.includes("invalid token")) return "Token inválido o expirado. Intenta de nuevo.";
  if (msg.includes("invalid session")) return "La sesión no es válida. Inicia sesión nuevamente.";

  // Registro / Validación de usuario
  if (msg.includes("email already exists")) return "Este correo ya está registrado.";
  if (msg.includes("invalid email")) return "El formato del correo no es válido.";
  if (msg.includes("invalid phone")) return "El número de teléfono no es válido.";
  if (msg.includes("password")) {
  if (msg.includes("between 8 and 256")) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }
  if (msg.includes("short") || msg.includes("weak"))
    return "La contraseña es demasiado débil. Usa al menos 8 caracteres con letras y números.";
  if (msg.includes("invalid")) return "La contraseña no cumple los requisitos.";
}

// Registro / Validación de usuario


  // Red / Servidor
  if (msg.includes("network")) return "Error de conexión. Revisa tu conexión a internet.";
  if (msg.includes("timeout")) return "El servidor tardó demasiado en responder.";
  if (msg.includes("server error") || code >= 500) return "Error en el servidor. Intenta más tarde.";
  if (msg.includes("rate limit") || msg.includes("too many requests"))
    return "Demasiados intentos. Espera un momento e inténtalo de nuevo.";

  // Base de datos / Recursos
  if (msg.includes("document not found")) return "El recurso solicitado no existe.";
  if (msg.includes("collection not found")) return "La colección no fue encontrada.";
  if (msg.includes("permission denied")) return "No tienes permisos para acceder a este recurso.";

  // Campos y validaciones genéricas
  if (msg.includes("missing") || msg.includes("required"))
    return "Faltan campos obligatorios. Revisa tu información.";
  if (msg.includes("invalid")) return "Uno o más campos contienen datos inválidos.";

  // Código de error genérico (códigos)
  switch (code) {
    case 400:
      return "Solicitud incorrecta. Verifica los datos ingresados.";
    case 403:
      return "No tienes permiso para esta acción.";
    case 404:
      return "No se encontró el recurso solicitado.";
    case 409:
      return "Conflicto: ya existe un registro con esos datos.";
    case 429:
      return "Demasiadas solicitudes. Espera unos segundos.";
    case 500:
      return "Error interno del servidor.";
  }

  // Fallback genérico
  return "Ocurrió un error inesperado. Intenta nuevamente.";
};
