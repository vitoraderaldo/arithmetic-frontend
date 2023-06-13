import { init as initApm } from '@elastic/apm-rum'

const serviceName = 'react-app'
const serviceVersion = ''
const environment = process.env.REACT_APP_ENV
const serverUrl = `${process.env.REACT_APP_API_URL}/api/apm`
const active = process.env.REACT_APP_APM_ENABLED === 'true'
const originsAllowedToInjectHeaders = [
  process.env.REACT_APP_API_URL
] as string[]

export const startApm = () => {
  initApm({
    serviceName,
    serverUrl,
    active,
    serviceVersion,
    environment,
    logLevel: 'debug',
    distributedTracing:true,
    distributedTracingOrigins: originsAllowedToInjectHeaders,
  })
}
