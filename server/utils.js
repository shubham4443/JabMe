export const findAvailability = (data) => {
    if (data.centers.length === 0) {
        return false;
    }

    for (let center of data.centers) {
        for (let session of center.sessions) {
            if (session.available_capacity > 0) {
                return true;
            }
        }
    }

    return false;
}