import { HttpClient } from "cruzo";
import type { HttpRequestOptions } from "cruzo";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";

const interceptors = {
  params: async (
    _method: HttpMethod,
    _url: string,
    options: HttpRequestOptions
  ) => {
    options.headers = options.headers ?? {};
  },
  success: async (
    _method: HttpMethod,
    _url: string,
    _options: HttpRequestOptions,
    _data: unknown,
    _response: Response
  ) => {
  },
  error: async (
    _method: HttpMethod,
    _url: string,
    _options: HttpRequestOptions,
    status: number,
    _data: unknown,
    _response: Response | null
  ) => {
    if (status === 401) {
    }
  },
};

const { host, protocol } = window.location;
const restApiUrl = `${protocol}//${host}/api/`;

export const restHttpClient = new HttpClient(
  restApiUrl,
  interceptors,
  true,
  0
);
