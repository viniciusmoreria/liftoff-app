export function addLeadingZeros(number?: number, targetLength = 2) {
  if (number === undefined) {
    return '00';
  }
  return String(number).padStart(targetLength, '0');
}
