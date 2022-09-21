import request from "@/utils/request";

export function getVaccinateList(page = 1, size = 10) {
  return request.get("/api/v1/vaccinate/", { page, size });
}

export function getVaccinate(params) {
  return request.get("/api/v1/vaccinate/", params);
}

export function addVaccinate(data) {
  return request.post("/api/v1/vaccinate/", data);
}

export function editVaccinate(vaccinate_id, data) {
  return request.patch("/api/v1/vaccinate/" + vaccinate_id + "/", data);
}

export function deleteVaccinate(vaccinate_id) {
  return request.delete("/api/v1/vaccinate/" + vaccinate_id + "/");
}
