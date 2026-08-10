export const getMapUrl = (longitude: number, latitude: number, zoom: number) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - zoom}
    %2C${latitude - zoom}%2C${longitude + zoom}%2C${latitude + zoom}
    &layer=mapnik&marker=${latitude}%2C${longitude}`;
}
