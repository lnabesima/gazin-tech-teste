export function calculateAge(date: Date): number {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();

  const isMonthEarlier = monthDiff < 0
  const isSameMonthButEarlierDay = (monthDiff === 0 && today.getDate() < date.getDate())

  if (isMonthEarlier || isSameMonthButEarlierDay) {
    age--
  }

  return age;
}
