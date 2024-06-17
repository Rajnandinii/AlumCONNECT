function getTimeAgo(createdAt) {
    const now = new Date();
    const diff = now - new Date(createdAt);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 7) {
      return `${Math.floor(days / 7)} weeks`;
    } else if (days > 0) {
      return `${days} days `;
    } else if (hours > 0) {
      return `${hours} hrs`;
    } else if (minutes > 0) {
      return `${minutes} min`;
    } else {
      return `${seconds}s`;
    }
  }
  
  export {getTimeAgo};