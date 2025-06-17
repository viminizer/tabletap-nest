export function cleanPayload<T extends object>(dto: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(dto)) {
    if (
      value !== undefined &&
      value !== null &&
      (typeof value !== 'string' || value.trim() !== '')
    ) {
      result[key as keyof T] = value;
    }
  }
  return result;
}
