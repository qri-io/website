
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.qri.cloud' : 'https://rosebud-api.qri.cloud'

let token
if (typeof window !== 'undefined') {
  token = localStorage.getItem('snippet-token')
}

// create
export const createSnippet = async (body) => {
  const res = await fetch(`${BASE_URL}/snippets/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  const data = await res.json()
  return data
}

// search
export const searchSnippets = async ({ q }) => {
  const res = await fetch(`${BASE_URL}/snippets/search?q=${q}`)
  const { data } = await res.json()
  return data.map(d => d.value)
}

// get all snippets (with pagination)
export const fetchSnippets = async () => {
  const res = await fetch(`${BASE_URL}/snippets/`)
  const { data } = await res.json()
  return data
}

// get one snippet by id
export const fetchSnippet = async (id) => {
  const res = await fetch(`https://rosebud-api.qri.cloud/snippets/${id}`)
  const { data } = await res.json()
  return data
}

// update a snippet by id
export const updateSnippet = async (id, body) => {
  const res = await fetch(`${BASE_URL}/snippets/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  const data = await res.json()

  return data
}

// delete a snippet by id
export const deleteSnippet = async (id) => {
  const rawResponse = await fetch(`${BASE_URL}/snippets/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await rawResponse.json()

  return data
}

export default {
  createSnippet,
  fetchSnippets,
  fetchSnippet,
  updateSnippet,
  deleteSnippet
}
