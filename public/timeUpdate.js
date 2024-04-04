function updateTimeString() {
  // Get the current time string from the HTML content
  const timeString = $("#time").text();

  // Convert the time string in 'HH:mm' format to 'YYYY-MM-DDTHH:mm' format
  const dateTimeString = `1970-01-01T${timeString}`;
  const dateObject = new Date(dateTimeString);

  // Get hour and minute values
  let hour = dateObject.getHours();
  let minute = (dateObject.getMinutes()) % 60;

  // Check if it's past midnight (00:00)
  if (hour === 23 && minute === 59) {
    // If it's 23:59, set hour to 0 and minute to 0 (00:00)
    hour = 0;
    minute = 0;
  } else {
    // Otherwise, increment the minute
    if (minute === 59) {
      hour = (hour + 1) % 24;
      minute = 0;
    } else {
      minute++;
    }
  }

  // Update the time value in the HTML content
  $("#time").html(`${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`);
}

// Update the time value by calling the updateTimeString function every second
setInterval(updateTimeString, 60000);
