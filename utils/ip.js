module.exports = {
  getIp: async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      return data.ip
    } catch (e) {
      return '127.0.0.1'
    }
  }
}
