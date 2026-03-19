export function formatOrderDate(dateString) {
    const date = new Date(dateString);
    
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    });
}