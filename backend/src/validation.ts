import { z } from 'zod'

export function parseWithSchema<T>(schema: z.ZodType<T>, input: unknown): T {
  return schema.parse(input)
}

export const healthResponseSchema = z.object({
  ok: z.literal(true)
})

export const heroSettingsSchema = z.object({
  heroTitle: z.string().trim().min(1).max(80)
})

export const heroSettingsResponseSchema = heroSettingsSchema

export const heroSettingsUpdateSchema = heroSettingsSchema

export const pageComponentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hero'),
    title: z.string().trim().min(1).max(30),
    description: z.string().trim().min(1).max(100),
    bannerUrl: z.string().trim().url().max(250).optional().default('')
  }),
  z.object({
    type: z.literal('jobs'),
    title: z.string().trim().min(1).max(30),
    description: z.string().trim().min(1).max(100)
  })
])

export const pageSettingsSchema = z.object({
  // The app currently only persists the two required blocks.
  components: z.array(pageComponentSchema).min(2)
})
