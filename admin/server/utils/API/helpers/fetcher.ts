export const fetchWrapper: HttpClient = {
  post: async (url: string, body: any, options: any = {}) => {
    const requestOptions = {
      method: 'POST' as 'POST',
      body: body,
      headers: { 'Content-Type': 'text/xml;charset=UTF-8' }
    }

    if (options) {
      if (options.headers) {
        requestOptions.headers = {
          ...requestOptions.headers,
          ...options.headers
        };
      }

      const otherOptions = { ...options };
      delete otherOptions.headers;

      Object.assign(requestOptions, otherOptions);
    }

    const response = await $fetch.raw(url, requestOptions)

    const cookies = (response.headers.get('set-cookie') || '').split(',')

    const data = response._data; // или response.json(), если ответ в формате JSON
    return {
      data,
      headers: response.headers, // теперь headers также возвращаются
      cookies
    };
  }
}
