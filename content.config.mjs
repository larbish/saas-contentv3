import { z } from 'zod'
import { defineCollection } from '@farnabaz/content-next'

export const collections = {
  docs: defineCollection({
    type: 'page', // required // Type page extends pageSchema
    source: 'docs/**/*.md', // remove unstorage to handle this
    schema: z.object({
      image: z.object({
        src: z.string(),
        alt: z.string()
      })
    })
  }),
  posts: defineCollection({
    type: 'page', // required // Type page extends pageSchema
    source: 'blog/**/*.md',
    schema: z.object({
      authors: z.array(z.string()),
      date: z.date(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      badge: z.object({
        label: z.string(),
        color: z.string()
      })
    })
  }),
  authors: defineCollection({
    type: 'data', // required // Type data has an empty schema by default
    source: 'authors/*',
    schema: z.object({ // schema is required with data type
      slug: z.string(),
      name: z.string(),
      // to: z.string(),
      avatar: z.object({
        src: z.string(),
        alt: z.string()
      })
    })
  }),
  pricing: defineCollection({
    type: 'page',
    source: 'pricing.yml',
    schema: z.object({
      hero: z.object({
        title: z.string(),
        description: z.string(),
        align: z.string()
      }),
      plans: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          price: z.object({
            month: z.string(),
            year: z.string()
          }),
          align: z.string(),
          button: z.object({
            label: z.string(),
            color: z.string()
          }),
          features: z.array(z.string())
        })
      ),
      logos: z.object({
        title: z.string(),
        icons: z.array(z.string())
      }),
      faq: z.object({
        title: z.string(),
        description: z.string(),
        items: z.array(
          z.object({
            label: z.string(),
            content: z.string(),
            defaultOpen: z.boolean()
          })
        )
      })
    })
  }),
  landing: defineCollection({
    type: 'page',
    source: 'index.yml',
    schema: z.object({
      hero: z.object({
        title: z.string(),
        description: z.string(),
        align: z.string(),
        headline: z.object({
          label: z.string(),
          to: z.string(),
          icon: z.string()
        }),
        links: z.array(
          z.object({
            label: z.string(),
            to: z.string(),
            size: z.string(),
            color: z.string(),
            icon: z.string(),
            trailing: z.boolean()
          })
        )
      }),
      sections: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          align: z.string(),
          features: z.array(
            z.object({
              name: z.string(),
              description: z.string(),
              icon: z.string()
            })
          ),
          links: z.array(
            z.object({
              label: z.string(),
              to: z.string(),
              color: z.string(),
              icon: z.string(),
              trailing: z.boolean(),
              size: z.string(),
              class: z.string()
            })
          )
        })
      ),
      features: z.object({
        title: z.string(),
        description: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string()
          })
        )
      }),
      testimonials: z.object({
        headline: z.string(),
        title: z.string(),
        description: z.string(),
        items: z.array(
          z.object({
            quote: z.string(),
            authors: z.object({
              name: z.string(),
              description: z.string(),
              avatar: z.object({
                src: z.string(),
                loading: z.string()
              })
            })
          })
        )
      })
    })
  }),
  blog: defineCollection({
    type: 'page',
    source: 'blog.yml'
  })
}
