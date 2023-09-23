import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'
import { google } from 'googleapis'

export async function getSheets(
    auth: JSONClient | OAuth2Client,
    spreadsheetId: string
): Promise<Array<any> | undefined> {
    const sheet = google.sheets({ version: 'v4', auth: auth as any })

    const request = {
        spreadsheetId: spreadsheetId,
    }

    const response = await sheet.spreadsheets.get(request)
    const data = response.data
    return data.sheets
}
