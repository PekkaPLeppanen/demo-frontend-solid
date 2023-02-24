async function getErrorMessage (response: Response): Promise<string> {
  const data = await response.json().catch(() => undefined)

  let errorMessage = response.statusText

  if (Object.hasOwn(data, 'message')) {
    errorMessage = data.message as string
  }

  return errorMessage
}

async function parseResponse<TResponse> (
  response: Response
): Promise<TResponse> {
  if (!response.ok) {
    return await Promise.reject(await getErrorMessage(response))
  }

  return await response.json()
}

export async function getData<TResponse> (url: string): Promise<TResponse> {
  return await fetch(url).then(parseResponse<TResponse>)
}
