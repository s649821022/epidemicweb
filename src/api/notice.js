import request from "@/utils/request";

export function getNoticeList(page = 1, size = 10) {
  return request.get("/api/v1/notices/", { page, size });
}

export function getNotice(params) {
  return request.get("/api/v1/notices/", params);
}

export function addNotice(data) {
  return request.post("/api/v1/notices/", data);
}

export function editNotice(notice_id, data) {
  return request.patch("/api/v1/notices/" + notice_id + "/", data);
}

export function deleteNotice(notice_id) {
  return request.delete("/api/v1/notices/" + notice_id + "/");
}
