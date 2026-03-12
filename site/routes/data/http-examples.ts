export const exampleHttpClient = `import { HttpClient } from "cruzo";

const client = new HttpClient("https://api.example.com");

const users = await client.get("/users");

const filtered = await client.get("/users", {
  query: { page: 1, limit: 10 },
});

const created = await client.post("/users", {
  body: { name: "John", email: "john@example.com" },
});

await client.put("/users/123", { body: { name: "Jane" } });
await client.patch("/users/123", { body: { role: "admin" } });
await client.delete("/users/123");
`;

export const exampleInterceptors = `import { HttpClient } from "cruzo";

const client = new HttpClient("https://api.example.com", {
  params: async (method, url, options) => {
    options.headers = options.headers || {};
    options.headers["Authorization"] = "Bearer " + getToken();
  },
  success: async (method, url, options, data, response) => {
    console.log("Request succeeded:", method, url, response.status);
    console.log("Payload:", data);
  },
  error: async (method, url, options, status, data, response) => {
    if (status === 401) {
      console.log("Unauthorized, run refresh flow");
    }
    console.log("Request failed:", method, url, status, data, response.statusText);
  },
});
`;

export const exampleCache = `import { HttpClient } from "cruzo";

const client = new HttpClient("https://api.example.com", {}, false, 60_000);

const freshUsers = await client.get("/users");
const cachedUsers = await client.get("/users", { useCache: true });

await client.clearCache("GET", "/users");

const scopedClient = client.factory(new AbortController().signal);
await scopedClient.get("/projects");
`;
