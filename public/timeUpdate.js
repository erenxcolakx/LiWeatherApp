function updateTimeString() {
  // Get the current time string from the HTML content
  let timeString = $("#time").text();

  const [hours, minutes] = timeString.split(':').map(Number);

  // Create currentDate object
  const currentDate = new Date();

  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);

  // Increment time by one minute
  currentDate.setTime(currentDate.getTime() + 60000);

  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();

  // Update the time value in the HTML content
  $("#time").html(`${hour}:${minute < 10 ? '0' : ''}${minute}`);
}

// Update the time value by calling the updateTimeString function every second
setInterval(updateTimeString, 60000);
