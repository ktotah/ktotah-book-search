// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    try {
      return decode(this.getToken());
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error('Error checking if token is expired:', err);
      return false;
    }
  }

  // get token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // save token to localStorage and reload the page to reset state
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // clear token from localStorage and reload the page to reset state
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
