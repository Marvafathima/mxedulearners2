// utils/auth.js
export const getCurrentUserTokens = () => {
    const currentUser = localStorage.getItem('current_user');
    console.log("checking util auth function",currentUser)
    if (!currentUser) return null;
  
    const role = localStorage.getItem(`${currentUser}_role`);
    const rolePrefix = role === 'tutor' ? 'tutor_' : 'student_';
    console.log("checking util auth function",role,rolePrefix)
    return {
      accessToken: localStorage.getItem(`${currentUser}_access_token`),
      refreshToken: localStorage.getItem(`${currentUser}_refresh_token`),
      role: role
    };
  };