import { promises as fs } from 'fs'
import { google } from 'googleapis'
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'

export async function loadSaveCredentials(
    tokenPath: string
): Promise<JSONClient | OAuth2Client | null> {
    try {
        const content = await fs.readFile(tokenPath, { encoding: 'utf-8' })
        const credentials = JSON.parse(content)
        return google.auth.fromJSON(credentials)
    } catch (e) {
        return null
    }
}
