/**
 * 
 * @param {object} user user info
 * to set the user info to the localstroagte 
 */
export function storeCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}
  
/**
 * 
 * 
 * to get the user info from the localstroagte 
 */
export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
}
  
/**
 * 
 * 
 * to clear the user info from the localstroagte 
 */
export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}
  