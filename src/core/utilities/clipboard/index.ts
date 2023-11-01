const COPY_TEXT_TYPE = 'text/plain'

export const copyToClipboard = async (value: string): Promise<void> => {
  const blob = new Blob([value], { type: COPY_TEXT_TYPE })
  const data = [new ClipboardItem({ [COPY_TEXT_TYPE]: blob })]

  return navigator.clipboard.write(data)
}
