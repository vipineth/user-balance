interface Env {
  COINGECKO_API_KEY: string
}

function validateEnv(): Env {
  const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || process.env.COINGECKO_API_KEY

  const missingVars: string[] = []

  if (!COINGECKO_API_KEY || COINGECKO_API_KEY.trim() === '') {
    missingVars.push('COINGECKO_API_KEY')
  }

  if (missingVars.length > 0) {
    console.error('Environment variables:', process.env)
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  return {
    COINGECKO_API_KEY: COINGECKO_API_KEY!,
  }
}

export const envConfig = validateEnv()
