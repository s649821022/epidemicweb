import request from "@/utils/request";

export function getReptile() {
  return request.post("/api/v1/reptile/init/");
}

export function getNews() {
  return request.get("/api/v1/reptile/getNews/");
}

export function getArea() {
  return request.get("/api/v1/reptile/getArea/");
}

export function getRiskNumber() {
  return request.get("/api/v1/reptile/getRiskNumber/");
}
