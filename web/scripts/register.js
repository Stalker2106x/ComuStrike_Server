/* eslint-disable no-undef */
const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', () => {
  document.getElementById('acceptCOC').onchange = function () {
    document.getElementById('COCWarning').style.display = 'none'
  }
  document.getElementById('username').onchange = function () {
    document.getElementById('usernameWarning').style.display = 'none'
    document.getElementById('usernameTakenWarning').style.display = 'none'
  }
  document.getElementById('email').onchange = function () {
    document.getElementById('emailWarning').style.display = 'none'
  }
  document.getElementById('password').onchange = function () {
    document.getElementById('passwordWarning').style.display = 'none'
  }

  const acceptCOC = document.getElementById('acceptCOC').checked
  if (!acceptCOC) {
    document.getElementById('COCWarning').style.display = 'block'
  } else {
    const endpoint = window.location.href.startsWith('file://') ? 'http://localhost/v1/player' : '/v1/player'

    const username = document.getElementById('username').value
    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
      const warning = document.getElementById('usernameWarning')
      warning.innerText = 'Username must be composed of alphanumeric characters only'
      warning.style.display = 'block'
      return
    }
    if (username.length < 2 || username.length > 15) {
      const warning = document.getElementById('usernameWarning')
      warning.innerText = 'Username must be between 2 and 15 characters'
      warning.style.display = 'block'
      return
    }

    const email = document.getElementById('email').value
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      const warning = document.getElementById('emailWarning')
      warning.innerText = 'Please enter a valid email'
      warning.style.display = 'block'
      return
    }

    const password = document.getElementById('password').value
    if (password.length < 2 || password.length > 10) {
      const warning = document.getElementById('passwordWarning')
      warning.innerText = 'Password must be between 2 and 10 characters'
      warning.style.display = 'block'
      return
    }

    const req = new XMLHttpRequest()
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200) {
          document.getElementById('form').style.display = 'none'
          document.getElementById('success').style.display = 'block'
        } else {
          const warning1 = document.getElementById('usernameWarning')
          warning1.innerText = 'Username or email is already taken'
          warning1.style.display = 'block'
          const warning2 = document.getElementById('emailWarning')
          warning2.innerText = 'Email or username is already taken'
          warning2.style.display = 'block'
        }
      }
    }
    req.open('POST', endpoint)
    req.setRequestHeader('Access-Control-Allow-Origin', '*')
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({ LENUM: 0, LESOFT: 2, LENOM: username, LEVERSION: '100', LEMAIL: email, LEPASS: password }))
  }
})
