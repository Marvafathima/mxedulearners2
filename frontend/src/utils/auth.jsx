// utils/auth.js
export const getCurrentUserTokens = () => {
    const currentUser = localStorage.getItem('current_user');
    
    if (!currentUser) return null;
  
    const role = localStorage.getItem(`${currentUser}_role`);
    const rolePrefix = role === 'tutor' ? 'tutor_' : 'student_';
   
    return {
      accessToken: localStorage.getItem(`${currentUser}_access_token`),
      refreshToken: localStorage.getItem(`${currentUser}_refresh_token`),
      role: role
    };
  };

export const BASE_URL = 'http://127.0.0.1:8000/'; // Replace with your actual backend URL

 export function getFullImageUrl(relativePath) {
  if (!relativePath) return null;
  return `${BASE_URL}${relativePath}`;
}