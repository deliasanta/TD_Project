import http from "@/http-common";

class JewelryDataService {
  getAll(): Promise<any> {
    return http.get("/tutorials");
  }

  get(id: any): Promise<any> {
    return http.get(`/tutorials/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/tutorials", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`);
  }

  findByName(name: string): Promise<any> {
    return http.get(`/tutorials?name=${name}`);
  }
}

export default new JewelryDataService();

