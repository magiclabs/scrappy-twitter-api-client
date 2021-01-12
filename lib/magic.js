const { Magic } = require('@magic-sdk/admin')

export const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_TEST_SECRET_KEY)
