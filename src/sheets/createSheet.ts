import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'
import { checkSheetExist } from './checkSheetExist'
import { google } from 'googleapis'

export async function createSheet(
    auth: JSONClient | OAuth2Client,
    spreeadsheetId: string,
    sheetName: string
) {
    const sheetExist = await checkSheetExist(auth, spreeadsheetId, sheetName)

    if (!sheetExist) {
        const sheet = google.sheets({ version: 'v4', auth: auth as any })

        const request = {
            spreadsheetId: spreeadsheetId,
            resource: {
                requests: [
                    {
                        addSheet: {
                            properties: {
                                title: sheetName,
                            },
                        },
                    },
                ],
            },
        }

        try {
            await sheet.spreadsheets.batchUpdate(request)

            return true
        } catch (e) {
            return false
        }
    }
}
