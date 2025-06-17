export const logger = {
  buildInfo: (value: unknown) => {
    if (process.env.BUILD_ENV === 'development') {
      console.log('[buildInfo] ', value)
    }
  },
}
