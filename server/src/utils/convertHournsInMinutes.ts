// Convert hours in minutes
// 18:00 => ["10" "80"] => [10, 80]

export function convertHournsInMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);

  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
}
