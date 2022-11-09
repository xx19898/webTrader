export function parseDateTimeToUnixFormat(dateAsString:string) {
    const formattedDateAsString = dateAsString.replace(/-/g, '/')
    return new Date(formattedDateAsString).getTime()
}
