export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const dateObject = new Date(dateString);

    // Check for invalid dates to prevent "NaN.NaN.NaN"
    if (isNaN(dateObject.getTime())) return 'Invalid Date';

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${day}.${month}.${year}`;
};