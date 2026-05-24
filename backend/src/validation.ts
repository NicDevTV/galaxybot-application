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
    bannerUrl: z.string().trim().max(250).url().or(z.literal('')).default('')
  }),
  z.object({
    type: z.literal('jobs'),
    title: z.string().trim().min(1).max(30),
    description: z.string().trim().min(1).max(100)
  }),
  z.object({
    type: z.literal('socials'),
    title: z.string().trim().min(1).max(30),
    description: z.string().trim().min(1).max(100),
    socials: z.array(z.object({
      platform: z.enum(['youtube', 'instagram', 'tiktok', 'discord', 'email']),
      handle: z.string().trim().min(1).max(60),
      visible: z.boolean()
    })).min(1).max(12).superRefine((socials, ctx) => {
      const seen = new Set<string>()
      for (const [index, social] of socials.entries()) {
        if (seen.has(social.platform)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [index, 'platform'],
            message: 'Platform darf nur einmal vorkommen.'
          })
        }
        seen.add(social.platform)
      }
    })
  }),
  z.object({
    type: z.literal('images'),
    title: z.string().trim().min(1).max(30),
    description: z.string().trim().min(1).max(100),
    images: z.array(z.object({
      imageUrl: z.string().trim().url().max(100)
    })).min(1).max(10),
    carousel: z.object({
      itemsPerPage: z.number().int().min(1).max(3).default(3),
      showArrows: z.boolean().default(true),
      showDots: z.boolean().default(true),
      autoplay: z.boolean().default(false)
    }).default({
      itemsPerPage: 3,
      showArrows: true,
      showDots: true,
      autoplay: false
    })
  })
])

export const pageSettingsSchema = z.object({
  // The app currently only persists the two required blocks.
  components: z.array(pageComponentSchema).min(2)
}).superRefine((page, ctx) => {
  const seenTypes = new Set<string>()
  for (const [index, component] of page.components.entries()) {
    if (seenTypes.has(component.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['components', index, 'type'],
        message: 'Component-Typ darf nur einmal vorkommen.'
      })
    }
    seenTypes.add(component.type)
  }
})
