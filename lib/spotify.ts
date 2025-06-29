const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

const getAccessToken = async () => {
  if (!client_id || !client_secret) {
    console.warn("Spotify credentials not found in environment variables")
    console.log("Client ID:", client_id ? "Present" : "Missing")
    console.log("Client Secret:", client_secret ? "Present" : "Missing")
    throw new Error("CREDENTIALS_MISSING")
  }

  console.log("Attempting to get Spotify access token...")
  console.log("Client ID (first 10 chars):", client_id.substring(0, 10) + "...")

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
      },
      body: "grant_type=client_credentials",
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Spotify token error:", response.status, errorData)

      if (errorData.error === "invalid_client") {
        console.error("Invalid client credentials. Please check your Spotify Client ID and Secret.")
        throw new Error("INVALID_CREDENTIALS")
      }

      throw new Error(`SPOTIFY_API_ERROR: ${errorData.error}`)
    }

    const data = await response.json()
    console.log("Successfully got Spotify access token")
    return data
  } catch (error) {
    console.error("Access token request failed:", error)
    throw error
  }
}

export const searchArtist = async (artistName: string) => {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to search artist")
    }

    return response.json()
  } catch (error) {
    console.error("Error searching artist:", error)
    return { artists: { items: [] } }
  }
}

export const getArtistAlbums = async (artistId: string) => {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to get artist albums")
    }

    return response.json()
  } catch (error) {
    console.error("Error getting artist albums:", error)
    return { items: [] }
  }
}

export const getArtistTopTracks = async (artistId: string) => {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to get artist top tracks")
    }

    return response.json()
  } catch (error) {
    console.error("Error getting artist top tracks:", error)
    return { tracks: [] }
  }
}

export const getArtistById = async (artistId: string) => {
  try {
    const { access_token } = await getAccessToken()

    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get artist by ID: ${response.status}`)
    }

    const data = await response.json()
    console.log("Successfully got artist data:", data.name)
    return data
  } catch (error) {
    console.error("Error getting artist by ID:", error)
    return null
  }
}

// Check if Spotify credentials are available
export const hasSpotifyCredentials = () => {
  return !!(client_id && client_secret)
}

// Get credential status for debugging
export const getCredentialStatus = () => {
  console.log("Checking credential status...")
  console.log("Client ID:", client_id ? `${client_id.substring(0, 10)}...` : "Missing")
  console.log("Client Secret:", client_secret ? `${client_secret.substring(0, 10)}...` : "Missing")

  if (!client_id || !client_secret) {
    return "MISSING"
  }
  return "PRESENT"
}
