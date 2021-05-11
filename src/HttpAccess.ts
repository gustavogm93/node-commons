/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios'
import { Logger } from './Logger'

const httpLogger = new Logger('http-access')

interface Methods {
    get(url: string, logger?: RequestLogger, config?: CustomAxiosRequestConfig): Promise<AxiosResponse>,
    post<T = any>(url: string, logger?: RequestLogger, data?: any, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>>,
    put<T = any>(url: string, logger?: RequestLogger, data?: any, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>>,
    patch<T = any>(url: string, logger?: RequestLogger, data?: any, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>>,
    delete<T = any>(url: string, logger?: RequestLogger, config?: CustomAxiosRequestConfig): Promise<AxiosResponse<T>>,
}

interface RequestLogger {
    requestId: string
    businessProcess: string
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    url: string
    method: Method
}

export class HttpAccess implements Methods {

    private generateWithRequestIdConfig(config: CustomAxiosRequestConfig, logger: RequestLogger | undefined): AxiosRequestConfig {
        const requestId = logger ? { requestId: logger.requestId } : {}

        config.headers = { ...config.headers, requestId }

        return config
    }

    private async request(config: CustomAxiosRequestConfig, logger?: RequestLogger): Promise<AxiosResponse> {
        const { method, url } = config

        try {
            await httpLogger.trace(`Initializing ${method.toUpperCase()} request to ${url}`, logger)

            const customConfig = this.generateWithRequestIdConfig(config, logger)

            const res = await axios.request({ ...customConfig })

            await httpLogger.trace(`${method.toUpperCase()} request to ${url} successfully done`, logger)

            return res

        } catch (error) {
            await httpLogger.error(`${method.toUpperCase()} request to ${url} have failed`, logger)
            throw error
        }
    }

    get<T = any>(url: string, logger?: RequestLogger, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request({ url, method: 'get', ...config }, logger)
    }

    post<T = any>(url: string, logger?: RequestLogger, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request({ url, method: 'post', data, ...config }, logger)
    }

    put<T = any>(url: string, logger?: RequestLogger, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request({ url, method: 'put', data, ...config }, logger)
    }

    patch<T = any>(url: string, logger?: RequestLogger, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request({ url, method: 'patch', data, ...config }, logger)
    }

    delete<T = any>(url: string, logger?: RequestLogger, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.request({ url, method: 'delete', ...config }, logger)
    }
}
