export const findAvailability = (data, filters) => {
    if (data.centers.length === 0) {
        return false;
    }

    // Cost
    const centers = data.centers.filter(val => {
        if (filters.cost && val.fee_type != filters.cost) {
            return false;
        }
        return true;
    })

    for (let center of centers) {
        center.sessions = center.sessions.filter(val => {
            // Vaccine
            if (filters.vaccine && val.vaccine != filters.vaccine) {
                return false;
            }
            // Age
            if (filters.age) {
                switch (filters.age) {
                    case "45+":
                        if (val.allow_all_age !== false || val.min_age_limit !== 45) {
                            return false;
                        }
                        break;
                    case "18-45":
                        if (val.allow_all_age != false || val.min_age_limit != 18) {
                            return false;
                        }
                        break;
                    case "18+":
                        if (val.allow_all_age != true || val.min_age_limit != 18) {
                            return false;
                        }
                    default:
                }
            }
            return true;
        })
    }

    for (let center of centers) {
        for (let session of center.sessions) {
            if (session.available_capacity > 0) {
                return true;
            }
        }
    }

    return false;
}