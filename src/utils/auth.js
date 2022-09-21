import Cookies from "js-cookie";
const TokenKey = "JWT_TOKEN_KEY";
const UserKey = "USER_KEY";
const PasswordKey = "password";
const SuperUserKey = "SUPERUSER_KEY";

// cookie方式存储信息
export function getCookieToken() {
  return Cookies.get(TokenKey);
}

export function setCookieToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeCookieToken() {
  return Cookies.remove(TokenKey);
}

// 本地缓存信息方式
export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token); // 本地存储token方式
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

// 用户账号
export function getUser(user) {
  return localStorage.getItem(UserKey, user);
}

export function setUser(user) {
  return localStorage.setItem(UserKey, user);
}

export function removeUser(user) {
  return localStorage.removeItem(UserKey, user);
}

// 用户密码
export function getPassword() {
  return localStorage.getItem(PasswordKey);
}

export function setPassword(password) {
  return localStorage.setItem(PasswordKey, password);
}

export function removePassword() {
  return localStorage.removeItem(PasswordKey);
}

// 管理员用户
export function getSuperUser() {
  return localStorage.getItem(SuperUserKey);
}

export function setSuperUser(superUser) {
  return localStorage.setItem(SuperUserKey, superUser);
}

export function removeSuperUser() {
  return localStorage.removeItem(SuperUserKey);
}
