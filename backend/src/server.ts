import Fastify from 'fastify'
import cors from '@fastify/cors'
import { initializeDatabase } from './db'
import { ApplicationSettings, ensureDefaultApplicationSettings } from './models'
import { healthResponseSchema, pageSettingsSchema } from './validation'

const app = Fastify({
  logger: true
})

app.get('/health', async () => {
  return healthResponseSchema.parse({
    ok: true
  })
})

app.get('/api/application-settings', async () => {
  const settings = await ApplicationSettings.findByPk(1)

  if (!settings) {
    throw new Error('Application settings not initialized')
  }

  // parse and validate
  return pageSettingsSchema.parse(JSON.parse(settings.pageSettings))
})

app.put('/api/application-settings', async (request) => {
  const body = pageSettingsSchema.parse(request.body)

  const [settings] = await ApplicationSettings.findOrCreate({
    where: { id: 1 },
    defaults: {
      id: 1,
      pageSettings: JSON.stringify(body)
    }
  })

  settings.pageSettings = JSON.stringify(body)
  await settings.save()

  return pageSettingsSchema.parse(body)
})

const start = async () => {
  const port = Number(process.env.PORT || 3001)
  const host = process.env.HOST || '0.0.0.0'

  await app.register(cors, {
    origin: [
      'http://localhost:3000'
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  })

  await initializeDatabase()
  await ensureDefaultApplicationSettings()

  await app.listen({
    port,
    host
  })
}

void start()
