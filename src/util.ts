export const secondsToMilliseconds = (seconds: number): number => seconds * 1000;
export const minutesToMilliseconds = (minutes: number): number => secondsToMilliseconds(minutes * 60);
export const hoursToMilliseconds = (hours: number): number => minutesToMilliseconds(hours * 60);
export const daysToMilliseconds = (days: number): number => hoursToMilliseconds(days * 24);
