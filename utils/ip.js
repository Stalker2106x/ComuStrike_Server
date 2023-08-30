module.exports = {
    getIp: async () => {
    const res = await fetch("https://ipecho.io/json")
    const data = await res.json()
    return data.ip
  }
}