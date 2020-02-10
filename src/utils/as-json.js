// helper function to convert papaparse's array of arrays to array of objects
const asJson = (csv) => {
  const headers = csv.shift()

  return csv.map((row) => {
    const object = {}
    headers.forEach((header, i) => {
      object[header] = row[i]
    })
    return object
  })
}

export default asJson
