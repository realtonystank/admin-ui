export function greetUser() {
  const currTime = new Date()
    .toLocaleDateString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(", ")[1];
  const currHr = parseInt(currTime.split(":")[0], 10);
  const amPm = currTime.split(" ")[1];

  let greeting;
  if (amPm === "am") greeting = "Good morning";
  else if (currHr === 12 || currHr <= 5) greeting = "Good afternoon";
  else greeting = "Good evening";

  return greeting;
}
