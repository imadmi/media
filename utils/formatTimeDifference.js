export const formatTimeDifference = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hours ago`;
    } else if (diffInSeconds < 31536000) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} days ago`;
    } else {
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years} years ago`;
    }
};
