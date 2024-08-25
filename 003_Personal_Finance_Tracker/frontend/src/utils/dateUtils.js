// Converts UTC date to local date and time in YYYY-MM-DD and HH:MM formats
export function formatDateAndTime(utcDate) {
    const date = new Date(utcDate);
    return {
      localDate: date.toISOString().split('T')[0], // YYYY-MM-DD
      localTime: date.toTimeString().slice(0, 5)   // HH:MM
    };
  }
  
// Converts local date and time to UTC format for storage
export function toUTCDateTime(localDate, localTime) {
    // Construct a Date object in local time
    const localDateTime = new Date(`${localDate}T${localTime}:00`);
    
    // Convert local date-time to UTC
    const utcDateTime = new Date(localDateTime.toISOString()); // toISOString() gives UTC time
    
    // Return the UTC date-time in ISO format
    return utcDateTime.toISOString();
}