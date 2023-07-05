import { loadAbort } from './LoadAbort'
/**
 * @desc Solicitudes.
 */
class Requests {
  private headersArray: Headers

  /**
   * @desc Constructor de la utilidad.
   *
   * @return { void }
   */
  constructor() {
    // Conjunto de cabeceras
    this.headersArray = new Headers()

    // Cabeceras
    this.headersArray.append('Accept', 'application/json')
  }

  /**
   * @desc Realiza una solicitud de método GET
   *
   * @param { string } endpoint
   * @param { Object } data
   * @param { string } responseType
   * @param { string } token
   *
   * @return { Promise }
   */
  async get(
    endpoint: string,
    data: any,
    responseType: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData' = 'json',
  ): Promise<any> {
    try {

      // Indicamos el tipo de solicitud
      this.headersArray.append('Content-Type', 'application/json charset=utf-8')

      // Cabeceras.
      let headers = this.headersArray
      let method = 'GET'
      let params = new URLSearchParams(data).toString()

      // Armamos el requester
      let request = new Request(endpoint + (params ? '?' + params : ''), { method, headers })

      // Almacenamos las cabeceras de la respuesta.
      let responseHeader: Headers | null = null

      // Realizamos la solicitud
      let response = await fetch(request)

      // Almacenamos las cabeceras de la respuesta.
      responseHeader = response.headers

      if ([200, 400, 401, 403, 404].indexOf(response.status) > -1) {
        // Respuesta parseada
        let responseParsed = await response[responseType]()

        // Asignamos a la respuesta las cabeceras.
        responseParsed.headers = responseHeader

        // Parseamos la respuesta.
        return responseParsed
      }

      return Requests.mockResponse(response.status, response)
    } catch (error) {
      // Rechazamos la solicitud.
      return error
    }
  }

  /**
   * @desc Realiza una solicitud de método POST
   *
   * @param { string } endpoint
   * @param { Object } data
   * @param { string } responseType
   * @param { string } token
   * @param { string } contentType
   *
   * @return { Promise }
   */
  async post(
    endpoint: string,
    data: Object,
    responseType: 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData' = 'json',
    contentType: string = 'application/json'
  ): Promise<any> {
    try {
      // Indicamos la tipo de contenido.
      this.headersArray.append('Content-Type', contentType)

      const controller = loadAbort()
      // Cabeceras.
      let headers = this.headersArray
      let method = 'POST'
      let body = JSON.stringify(data)
      // Armamos el requester
      let request = new Request(endpoint, { method, headers, body, signal: controller.signal })

      // Realizamos la solicitud
      let response = await fetch(request)

      if ([200, 400, 401, 403, 404].indexOf(response.status) > -1) {
        // Respuesta parseada
        let responseParsed = await response[responseType]()

        // Parseamos la respuesta.
        return { call: responseParsed, controller }
      }

      return { call: Requests.mockResponse(response.status, response), controller }
    } catch (error) {
      // Rechazamos la solicitud.
      return error
    }
  }

  /**
   * @desc Retorna la interfaz de error.
   *
   * @param { number } code
   * @param { Object } exceptions
   *
   * @return { Object }
   */
  static mockResponse = (code: number, exceptions: Object): object => ({ code, exceptions })
}

export default Requests
