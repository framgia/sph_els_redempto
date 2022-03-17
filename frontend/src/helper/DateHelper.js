const DateHelper = {
    howLongSince : (timestamp) => {

        const then = new Date(timestamp);
        const now = new Date();
        const diffTime = Math.abs(now - then);
        const diffSeconds = Math.ceil(diffTime / (1000)); 
        const diffMinutes = Math.ceil(diffSeconds / (60)); 
        const diffHours = Math.ceil(diffMinutes / (60)); 
        const diffDays = Math.ceil(diffHours / (24)); 
        
        if (diffSeconds < 60) {
            return `${diffSeconds} seconds ago`
        }
        else if (diffMinutes < 60) {
            return `${diffMinutes} minutes ago`
        }
        else if (diffHours < 24) {
            return `${diffHours} hours ago`
        }
        else {
            return `${diffDays} days ago`
        }
    }
}

export default DateHelper;
