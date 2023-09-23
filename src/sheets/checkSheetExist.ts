import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'
import { getSheets } from './getSheets'

export async function checkSheetExist(
    auth: JSONClient | OAuth2Client,
    spreadsheetId: string,
    sheetName: string
): Promise<boolean> {
    const sheets = await getSheets(auth, spreadsheetId)

    if (sheets) {
        for (let sheet of sheets) {
            if (sheet.properties.title === sheetName) {
                return true
            }
        }
    }

    return false
}
