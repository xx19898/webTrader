export default function parseDateTimeToUnixFormat(dateAsString:string) {
    return new Date(dateAsString.replace(/-/g, '/')).getTime()/1000
}
