import { ProductApiResponse, GenericErrorResponse, InternalServerErrorResponse } from '@/types/Response';
import axios from 'axios';
/**
 * @desc The itinerary associated with a file is obtained.
 *
 * @return { Promise }
 */
const getAllProducts = async (): Promise<ProductApiResponse> => {
  try {
    let response = await axios.get(`${process.env.API_GATEWAY}products`)
    console.log(response.data)
    return response.data as ProductApiResponse;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 500) {
        // Error interno del servidor
        return {
          success: false,
          message: 'Error interno del servidor',
          data: null,
          statusCode: 500,
        } as InternalServerErrorResponse ;
      }

      // Error de respuesta del servidor (statusCode y message)
      const { statusCode, message } = error.response.data;
      return {
        success: false,
        message: `Error (${statusCode}): ${message}`,
        data: null,
        statusCode,
      } as GenericErrorResponse;
    } else {
      // Error de conexión o solicitud
      return {
        success: false,
        message: 'Error al realizar la solicitud',
        data: null,
      } as GenericErrorResponse;
    }
  }
}
export default getAllProducts

