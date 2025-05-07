class HttpServer {
  private static async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: unknown,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    try {
      const res = await fetch(url, options);

      const contentType = res.headers.get("Content-Type") || "";
      const isJson = contentType.includes("application/json");
      const responseBody = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        const message = isJson
          ? (responseBody as any).message || "Request failed"
          : responseBody || "Request failed";
        throw new Error(message);
      }

      return responseBody as T;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  static get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.request("GET", url, undefined, headers);
  }

  static post<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request("POST", url, data, headers);
  }

  static put<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request("PUT", url, data, headers);
  }

  static delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.request("DELETE", url, undefined, headers);
  }
}

export default HttpServer;
