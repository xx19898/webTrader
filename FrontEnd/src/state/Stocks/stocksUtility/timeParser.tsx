export function parseDateTimeToUnixFormat(dateAsString:string) {
    const formattedDateAsString = dateAsString.replace(/-/g, '/')
    console.log(formattedDateAsString)
    return new Date(formattedDateAsString).getTime()/1000
}
