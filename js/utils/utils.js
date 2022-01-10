export const $ = document.querySelector.bind(document)

export const getLocalDateStr = () => {
  return (
    new Date()
      .toLocaleDateString(
        'en-US',
        {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }
      )
  )
}

export const loadJson = async(path) => {
  const result = await fetch(path)
  return await result.json()
}
