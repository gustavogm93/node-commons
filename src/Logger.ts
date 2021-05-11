import axios, { AxiosResponse } from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

interface Actions {
    trace(message: string, data?: any): void,
    warn(message: string, data?: any): void,
    error(message: string, data?: any): void,
}

interface Log {
    '@timestamp': string,
    level: string,
    message: string,
    data?: any,
    labels: {
        runtime: string
    },
    service: {
        name: string,
        serviceVersion: string
    }
}

enum ActionType {
    TRACE = 'trace',
    WARN = 'warn',
    ERROR = 'error'
}

const options = {
    headers: { 'Content-Type': 'application/json' }
}

export class Logger implements Actions {
    url: string
    serviceName: string
    serviceVersion: string

    constructor(serviceName: string, serviceVersion = 'V1') {
        const { LOGSTASH_URL } = process.env
        this.url = LOGSTASH_URL || ''
        this.serviceName = serviceName
        this.serviceVersion = serviceVersion
        if (!this.url) {
            console.warn('LOGSTASH_URL is missing in enviroment variables')
        }
    }

    private generateJson(level: ActionType, message: string, data?: any): Log {
        return {
            '@timestamp': new Date().toISOString(),
            level,
            message,
            data,
            labels: {
                runtime: `node ${process.version}`
            },
            service: {
                name: this.serviceName,
                serviceVersion: this.serviceVersion
            }
        }
    }

    private async submitLog(log: Log): Promise<AxiosResponse | void> {
        try {
            console.log(log)

            return await axios.post(this.url, log, options)
        } catch (error) {
            console.warn('Unable to connect to logstash')
        }
    }

    trace(message: string, data?: any): Promise<AxiosResponse | void> { return this.submitLog(this.generateJson(ActionType.TRACE, message, data)) }
    error(message: string, data?: any): Promise<AxiosResponse | void> { return this.submitLog(this.generateJson(ActionType.ERROR, message, data)) }
    warn(message: string, data?: any): Promise<AxiosResponse | void> { return this.submitLog(this.generateJson(ActionType.WARN, message, data)) }
}