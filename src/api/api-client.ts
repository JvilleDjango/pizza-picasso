export class ApiClientError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
  }
}

async function parseResponse<T>(response: Response, requestLabel: string): Promise<T> {
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null

    const fallbackMessage =
      response.status === 404
        ? `${requestLabel} is not available on the running API. Restart the Pizza Picasso dev server so it loads the latest routes.`
        : "We couldn't complete that request."

    throw new ApiClientError(
      response.status,
      body?.error?.message ?? fallbackMessage,
    )
  }

  return response.json() as Promise<T>
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(path, { signal })
  return parseResponse<T>(response, `GET ${path}`)
}

export async function apiPost<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseResponse<TResponse>(response, `POST ${path}`)
}

export async function apiPatch<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  const response = await fetch(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return parseResponse<TResponse>(response, `PATCH ${path}`)
}
