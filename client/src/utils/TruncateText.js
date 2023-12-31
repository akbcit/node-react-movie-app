// Function to truncate text to a specified length
const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
export default truncateText;