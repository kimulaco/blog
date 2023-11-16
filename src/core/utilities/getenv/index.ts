export const getenv = (key: string): string => {
  return process.env[key] ?? import.meta.env[key] ?? ''
}
