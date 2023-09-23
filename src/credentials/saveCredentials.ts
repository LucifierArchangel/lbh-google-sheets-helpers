import { promises as fs } from 'fs'
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'

export async function saveCredentials(
    credentialsPath: string,
    tokenPath: string,
    client: JSONClient | OAuth2Client
) {
    const content = await fs.readFile(credentialsPath, { encoding: 'utf-8' })
    const keys = JSON.parse(content)
    const key = keys.installed || keys.web
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    })

    await fs.writeFile(tokenPath, payload, { encoding: 'utf-8' })
}
