import request from "@/utils/request";

export function getInspectionList(page = 1, size = 10) {
  return request.get("/api/v1/inspection/", { page, size });
}

export function getInspection(params) {
  return request.get("/api/v1/inspection/", params);
}

export function addInspection(data) {
  return request.post("/api/v1/inspection/", data);
}

export function editInspection(inspection_id, data) {
  return request.patch("/api/v1/inspection/" + inspection_id + "/", data);
}

export function deleteInspection(inspection_id) {
  return request.delete("/api/v1/inspection/" + inspection_id + "/");
}
