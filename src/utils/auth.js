// src/utils/auth.js

// 🔐 Obtener usuario autenticado actual
export async function fetchCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await fetch('http://localhost:8000/api/accounts/me/', {
      headers: {
        Authorization: `Token ${token}`, // ✅ Asegúrate de usar "Token", no "Bearer"
      },
    });

    if (response.ok) {
      return await response.json(); // Este objeto incluirá first_name, username, etc.
    }
  } catch (err) {
    console.error('Error al obtener usuario:', err);
  }

  return null;
}

// 🛒 Obtener o crear el carrito del usuario y guardar su ID en localStorage
export async function obtenerCarrito() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("Token no encontrado. El usuario no ha iniciado sesión.");
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/api/ordenes/carritos/mi-carrito/', {
      headers: {
        Authorization: `Token ${token}`, // ✅ Esto debe coincidir con tu backend (TokenAuthentication)
      },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('carritoId', data.id); // 💾 Guarda el ID del carrito
      console.log('🛒 Carrito ID guardado:', data.id);
    } else {
      console.error('❌ No se pudo obtener el carrito. Revisa el token o la sesión.');
    }
  } catch (error) {
    console.error('🚨 Error al obtener el carrito:', error);
  }
}
