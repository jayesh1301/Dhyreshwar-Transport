import fetchFromApiServer from "@services/api";
import { getEmpId } from "@services/utils";

export function addEmployee(requestObject) {
  requestObject.createdBy = getEmpId();
  const url = `api/master/addEmployee`;
  return fetchFromApiServer("POST", url, requestObject);
}

export function fetchEmployee(id) {
  const url = `api/master/getEmployee/${id}`;
  return fetchFromApiServer("GET", url);
}

export function modifyEmployee(requestObject) {
  requestObject.updatedBy = getEmpId();
  const url = `api/master/updateEmployee/${requestObject._id}`;
  return fetchFromApiServer("PUT", url, requestObject);
}

export function fetchEmployees() {
  const url = `api/master/getEmployees`;
  return fetchFromApiServer("GET", url);
}

export function fetchEmployeesBySearch(data) {
  const url = `api/master/getEmployeesBySearch`;
  return fetchFromApiServer("POST", url, data);
}

export function fetchEmployeesByPage(data) {
  const url = `api/master/getEmployeesByPage`;
  return fetchFromApiServer("POST", url, data);
}

export function removeEmployee(id) {
  const url = `api/master/removeEmployee/${id}`;
  return fetchFromApiServer("DELETE", url, { id: id, updatedBy: getEmpId() });
}

export function fetchLastEmployee() {
  const url = `api/master/getLastEmployee`;
  return fetchFromApiServer("GET", url);
}
