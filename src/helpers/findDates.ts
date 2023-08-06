/* eslint-disable prettier/prettier */
export const findDates = (noteContent: string): Array<string> => {
    // eslint-disable-next-line no-useless-escape
    const dateRegex = /(?:\b\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{4}\b)/g;
    const match = noteContent.match(dateRegex);

    if (match) {
        return match;
    } else {
        return [];
    }

};