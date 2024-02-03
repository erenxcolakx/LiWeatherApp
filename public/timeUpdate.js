function updateTimeString() {
  // Get the current time string from the HTML content
  const timeString = $("#time").text();

  // Convert the time string in 'HH:mm' format to 'YYYY-MM-DDTHH:mm' format
  const dateTimeString = `1970-01-01T${timeString}`;
  const dateObject = new Date(dateTimeString);

  // Get hour and minute values
  let hour = dateObject.getHours();
  let minute = (dateObject.getMinutes() + 1) % 60;
  if (minute === 0) {
    hour++;
  }
  // Update the time value in the HTML content
  $("#time").html(`${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}`);
  console.log(hour, minute);
}

// Update the time value by calling the updateTimeString function every second
setInterval(updateTimeString, 60000);

