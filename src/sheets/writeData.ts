import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client'
import { google } from 'googleapis'
import { getColumnName } from '../common'

export async function writeData(
    auth: JSONClient | OAuth2Client,
    spreadsheetId: string,
    sheetName: string,
    startRange: string,
    data: Array<Array<any>>,
    offset: number = 0
) {
    if (data.length !== 0) {
        const sheet = google.sheets({ version: 'v4', auth: auth as any })

        const offsetColumnName = getColumnName(offset)
        const endRangeColumnName = getColumnName(
            data[0].length,
            offsetColumnName
        )

        const endRange = `${endRangeColumnName}${data.length}`
        const request = {
            spreadsheetId: spreadsheetId,
            range: `${sheetName}${startRange}:${endRange}`,
            resource: {
                values: data,
            },
            valueInputOption: 'USER_ENTERED',
        }

        try {
            await sheet.spreadsheets.values.update(request)

            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
