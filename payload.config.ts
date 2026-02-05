import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import {
  lexicalEditor,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  ParagraphFeature,
  AlignFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Articles } from './collections/Articles'
import { Media } from './collections/Media'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'REPLACE_WITH_SECURE_SECRET',
  email: resendAdapter({
    defaultFromAddress: 'noreply@ieeecsusf.com',
    defaultFromName: 'IEEE CS USF',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  editor: lexicalEditor({
    features: [
      ParagraphFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      SubscriptFeature(),
      SuperscriptFeature(),
      InlineCodeFeature(),
      LinkFeature({
        enabledCollections: ['articles'],
      }),
      UnorderedListFeature(),
      OrderedListFeature(),
      BlockquoteFeature(),
      HorizontalRuleFeature(),
      AlignFeature(),
      FixedToolbarFeature(),
    ],
  }),
  collections: [Users, Articles, Media],
  admin: {
    user: Users.slug,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
