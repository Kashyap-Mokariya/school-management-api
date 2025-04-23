/**
 * Calculate the distance between two points on the Earth's surface using the Haversine formula
 * @param {number} lat1 - Latitude of point 1 in decimal degrees
 * @param {number} lon1 - Longitude of point 1 in decimal degrees
 * @param {number} lat2 - Latitude of point 2 in decimal degrees
 * @param {number} lon2 - Longitude of point 2 in decimal degrees
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    // Convert latitude and longitude from degrees to radians
    const radLat1: number = (Math.PI * lat1) / 180;
    const radLon1: number = (Math.PI * lon1) / 180;
    const radLat2: number = (Math.PI * lat2) / 180;
    const radLon2: number = (Math.PI * lon2) / 180;

    // Haversine formula
    const dLat: number = radLat2 - radLat1;
    const dLon: number = radLon2 - radLon1;

    const a: number =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Earth's radius in kilometers
    const earthRadius: number = 6371;
    const distance: number = earthRadius * c;

    return distance;
}