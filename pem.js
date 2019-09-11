const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, './')
const { generateKeyPairSync } = require('crypto')
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
})

fs.writeFileSync(`${filePath}/pvk.pem`, privateKey)
fs.writeFileSync(`${filePath}/pbk.pem`, publicKey)