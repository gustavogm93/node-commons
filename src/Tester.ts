import * as supertest from 'supertest'
import { expect } from 'chai'
import { Suite } from 'mocha'

type ResponseType = 'body' | 'text'

export class Tester {
    url: string

    constructor(url: string) {
        this.url = url
    }

    checkStatus(
        method: string,
        endpoint: string,
        expectedStatus: number,
        headers?,
        data?): void {
        const { url } = this
        const description = `${method.toUpperCase()} ${endpoint}`
        const objetive = `it should return ${expectedStatus}`

        this.runTest('checkStatus', description, objetive, url, method, endpoint, expectedStatus, data, headers)
    }

    checkResponse(
        method: string,
        endpoint: string,
        expectedResponse,
        responseType: ResponseType,
        headers?,
        data?): void {
        const { url } = this
        const description = `${method.toUpperCase()} ${endpoint}`
        const objetive = 'it should return exactly the expected response you entered'

        this.runTest('checkResponse', description, objetive, url, method, endpoint, expectedResponse, data, headers, responseType)
    }

    checkResponseKeys(
        method: string,
        endpoint: string,
        expectedKeys: string[],
        headers?,
        data?): void {
        const { url } = this
        const description = `${method.toUpperCase()} ${endpoint}`
        const objetive = 'it should return any of the keys you entered'

        this.runTest('checkResponseKeys', description, objetive, url, method, endpoint, expectedKeys, data, headers)
    }

    private runTest = (
        testMethod: string,
        description: string,
        objetive: string,
        url: string,
        method: string,
        endpoint: string,
        toBeCompared,
        data,
        headers,
        responseType?: string): Suite => (
        describe(description, () => {
            it(objetive, (done) => {
                supertest.agent(url)
                    [method](endpoint)
                    .send(data)
                    .set(headers || [''])
                    .end((err, res) => {
                        if (err) { return done(err) }

                        if (testMethod === 'checkStatus') { expect(res.status).to.be.equal(toBeCompared) }
                        if (testMethod === 'checkResponse') { expect(res[responseType || '']).to.deep.equal(toBeCompared) }
                        if (testMethod === 'checkResponseKeys') { expect(res.body).to.have.any.keys(toBeCompared) }

                        return done()
                    })
            })
        })
    )
}