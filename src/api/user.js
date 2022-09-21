import request from "@/utils/request";

export function login(data) {
  return request.post("/api/v1/auth/login/", data);
}

export function getInfo() {
  return request.get("/api/v1/auth/userinfo/");
}

export function logout() {
  return request.post("/api/v1/auth/logout/");
}

export function getUserList(page = 1, size = 10) {
  return request.get("/api/v1/auth/", { page, size });
}

export function getUser(params) {
  return request.get("/api/v1/auth/", params);
}

export function addUser(data) {
  return request.post("/api/v1/auth/register/", data);
}

export function editUser(user_id, data) {
  return request.patch("/api/v1/auth/" + user_id + "/", data);
}

export function deleteUser(user_id) {
  return request.delete("/api/v1/auth/" + user_id + "/");
}

export function change_password(data) {
  return request.post("/api/v1/auth/change_password/", data);
}
