export const formatDate = (date: string) => {
    const now = Date.now();
    const timeDiff = now - (new Date(date)).getTime();
    if (timeDiff < 60 * 1000) { // Less than a minute
        return `${Math.floor(timeDiff / 1000)} seconds ago`;
    } else if (timeDiff < 60 * 60 * 1000) { // Less than an hour
        return `${Math.floor(timeDiff / (60 * 1000))} minutes ago`;
    } else if (timeDiff < 24 * 60 * 60 * 1000) { // Less than a day
        return `${Math.floor(timeDiff / (60 * 60 * 1000))} hours ago`;
    } else { // Days or more
        return `${Math.floor(timeDiff / (24 * 60 * 60 * 1000))} days ago`;
    }
}