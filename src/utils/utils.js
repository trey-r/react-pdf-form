import axios from "axios";

const BASE_URL = "http://localhost:3500"

export const api = axios.create({ baseURL: BASE_URL });