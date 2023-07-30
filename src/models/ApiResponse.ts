import { HttpStatusCode } from "axios";

interface ApiResponse<T> {
  data: T | null,
  statusCode: HttpStatusCode,
  message: string,
}

export default ApiResponse;