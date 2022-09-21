import request from "@/utils/request";

export function getAbnormalList(page = 1, size = 10) {
  return request.get("/api/v1/abnormal/", { page, size });
}

export function getAbnormal(params) {
  return request.get("/api/v1/abnormal/", params);
}

export function addAbnormal(data) {
  return request.post("/api/v1/abnormal/", data);
}

export function editAbnormal(abnormal_id, data) {
  return request.patch("/api/v1/abnormal/" + abnormal_id + "/", data);
}

export function deleteAbnormal(abnormal_id) {
  return request.delete("/api/v1/abnormal/" + abnormal_id + "/");
}
