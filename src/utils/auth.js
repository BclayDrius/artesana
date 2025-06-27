// src/utils/auth.js
export async function fetchCurrentUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await fetch('/api/accounts/me/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.error('Error al obtener usuario:', err);
  }

  return null;
}
