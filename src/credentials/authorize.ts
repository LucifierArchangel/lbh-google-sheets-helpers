import { loadSaveCredentials } from './loadSaveCredentials'
import { authenticate } from '@google-cloud/local-auth'
import { saveCredentials } from './saveCredentials'
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'

export async function authorize(
    credentialsPath: string,
    tokenPath: string,
    scopes: string[]
): Promise<JSONClient | OAuth2Client | null> {
    const client = await loadSaveCredentials(tokenPath)

    if (client) {
        return client
    }

    const newClient = await authenticate({
        scopes: scopes,
        keyfilePath: credentialsPath,
    })

    if (newClient.credentials) {
        await saveCredentials(credentialsPath, tokenPath, newClient)
    }

    return newClient
}
