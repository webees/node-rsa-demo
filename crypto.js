const crypto = require('crypto')
const sign = crypto.createSign('sha1WithRSAEncryption')
const verify = crypto.createVerify('sha1WithRSAEncryption')

// 发送方私钥
const PVK1 = `
-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCp9HXbtYzIAVn
Vcdm+3ooZvy/X4/NqssIHsLEo46HncUU0bJH6RZ948R4NenoiFjXI+Z83+U7bR7
hfqWJIzr6iQ5HISx0RK+mozdYYhDRiEIkbzhWk2MrbHJWRYvdo8VRqDDZrm4NG/
vB4DabH8iF6uGD5wgAFfxVFbxUCTY6HRRG0a3v97fRw5TtVNseA6Lh/JNQW782C
yrlnDKFUhdS2Hvt/0g4UYxhQjClG5FJwLNy7yIPokyBeT126QTo4sD4AT6dcbOn
wiNjOHqhEdUJbWghPRPDfvCFWK8iA+VWM6eglKyKqcbXFfQ4eOeL0PyZzZXE1k5
f8S+WpaiVdR3/pAgMBAAECggEAIJOdK7oG/CdWItWp2S4q5niBIS6ub9tH2dWCf
8XyOLy7eSr+aCyEPtho3EiHtJTxRk6iuEXvWZTLwHplPnNykwPEo9HSBoKWTSb3
TMe6irmErnG4MFrlt04pVS7VIaZwectRexrZ9PfU/A4R0+2TgURqQjVvb55GY4L
BUimvkjnXylqeLCvVDRNSXnM3WGq3kZVGKRr0N1wuSSt3VY5c4JeSWNAMfETKCB
FMOkuGe2++tSwQcTrSO3xY8eOnX6tlEHJb6M6IYBW3pLF1DuCT2i31fcaK+wVTk
aoslmDtVEVl9Nrw2fTAr3rNihbSEtpEGp9fd2N6aZkBgfs1SV5zSQKBgQD5IOBw
p/Qb4NGWSQ8SwKSrShQTsgKrDjLHgfyc2OLoai6MNEEeccUFcBhsyeQl8HkLmDY
TV3Y/vpPelLgnRzbpk7wD3YkVlke0KWJcOIXwByrti20gM+D6owSXsTUCHixG3Q
+007W1wj9+dRyyJTPn/lc7KmoiezOWX5QyC3WHWwKBgQCupIflK6DjLp3893/UJ
F2l1ttdLpLJzP08QBRzKRE0dZWl3LJfLtbX4flLMJWy0Sw2cbrWrfv/L6LzoLGF
UtQp/5ocpRyfMRZP64JtDbxRlGwVwdhezYQKJi1MmOBAQIGrq3TblNZGmbqV4N0
I1PzWQxjY2wxnGEcTwwj0FQ49CwKBgQCPFRrSmSPSfyTgs8U8d/gbiMhPJ4XwyI
7Rlw6G5uorohBp5fkgiyclIGRm1u15/MsIpbspEKqRods7kx7RME2RiZAKiEobY
9x61OnxHWWPng5BsDpUrHcifE4+8UAIn1u+t2g16wIKCi59arW4ezV8oM9o48th
UnEmhG6Q75Po0QKBgQCiJGN/I6h2BBvudyMZJMJFbFuyAcGK1mTugVf7K0+r8te
DbIm20VfqiwTXCD6UDJwN2D1tf48M939EzhbC/4m3jHXaznjqW7qpbLBk63HCFB
jdgmGOcyR5/8Pi77SUMs+xQLh3/ZGLbsLK0ECnKIetrhHtlEHJncKv2E4Bv2K+z
QKBgQDIcMLEXfLZEtPXHGYm72qP+Tqb84DwxV+NLUyC5cZD224upIuocwqGdSri
dbuMw6oNVDnr0yzFMwBdlUO8+iqUtEJG59uzL+QkbzaXy8RgNyHqi5bhOWXyE6c
HgV3HTDHitiUOX78FAEAOqA4iwFdnzca998TbL7KjpzVo8Zd77A==
-----END PRIVATE KEY-----
`

// 发送方公钥
const PBK1 = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqfR127WMyAFZ1XHZvt6KGb8
v1+PzarLCB7CxKOOh53FFNGyR+kWfePEeDXp6IhY1yPmfN/lO20e4X6liSM6+okORyE
sdESvpqM3WGIQ0YhCJG84VpNjK2xyVkWL3aPFUagw2a5uDRv7weA2mx/Iherhg+cIAB
X8VRW8VAk2Oh0URtGt7/e30cOU7VTbHgOi4fyTUFu/Ngsq5ZwyhVIXUth77f9IOFGMY
UIwpRuRScCzcu8iD6JMgXk9dukE6OLA+AE+nXGzp8IjYzh6oRHVCW1oIT0Tw37whViv
IgPlVjOnoJSsiqnG1xX0OHjni9D8mc2VxNZOX/EvlqWolXUd/6QIDAQAB
-----END PUBLIC KEY-----
`

// 接收方私钥
const PVK2 = `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDH1Yn5kXGYnIPf
gtMBhBqwUwBWG9EH/QKhMhmX01DuVMrR5Cnkc7fpW/Ns8nbipPLePVwbqWzImB43
HCRyjrm88PZUAAc/+UjBUHhao1/tz8s2eem67XrnpOlyKqnU1XImjUEYiGL7yCd6
rPNJjabAwuA4iNfwgaYohfPTCVjvJ9q15sNiNdSj0F3rscko/E0thkymHeBYiaua
kLzGMEgIGUNtLxzVXZ2jPOyrAPv5iiGY/XoC+Uwn0bfi1J/hS3DeXSbd40GtiAPO
KjfmGtlmgP3Lqk17Or9XI1+zQFkn7Hq2kindkK9N6q6Cgb8sJzT6rT0+bN+5c1Hm
11sdIWfrAgMBAAECggEBALCgd5GVEni3bn/yHBrs7sIGuvdhIsMSyG494A0oBBKD
87jNGJIKDfY/Bcu4C4iMDvaL+Yuhlrs+aQaA41419MmhmbfpRn8vETV8sMQ8Px/t
WEpQO1yzZry0MHpuZyntdzXICE9szUCKSwrNL0RF5avfE1wk5+h2T6zlqPtQ+cB3
QQUReI5foywVapIaHrWg+Ov8ysQlEb+Ns1cgDPTg9Jbe8z+pplhfOc0eNIJUecWA
YMKTEdhk24DTo/a6WxPsyBfPfHMnjxFCCUKdedgjcT1pEv9zUsRs6QzDt14aUkEH
JHolFG5TmHlahK06vFszTTSNcVxFVJn0B1Xuj/cBw7ECgYEA/dD2oC4cwQqo9/yE
iJ9oeiD4rpEjVK4Xf5AmJG1LOROw15IOmTU8gPSEq8yuv32e9bwgaupp6CbA+q5O
8OlxXzQw9ow0EO9RoE/aQ8HUrqZLHHya7d6q2Sf3tHupQ51aLdxI78melR07FbOT
38kb21j1gPM3Rjxlu8nsjz2z83cCgYEAyY2tuVUQ6VUA7/kSv+XP+G7lSW/Vh2TV
YmMgO79I17ryz5UH5dxMIUk5GWIEFSRy1oBrKNZKxCMUxB/WfT1O6Ox+EiGr7Ymb
hUgQoUmzdBVGOKt6UF2as9tyCxNO2fPaliyYcnIq+hMLegzZGCH3Hb1+0o0iqbF7
gDObY3PMRC0CgYEA4Zk5jLhP0Hl0JC9rcbAWge8KescAW0T+F+D9NgV7Bflthr4I
gb7iz1AHGFiuvf+fKZYUTlOa3MCNaINEITetEEzodEu7/41nxREU1ILVUoL2YhSS
9Hik7K1sqxv7H+EdhYO1xIQ1kx5PJQPfnNo5C2bvl7UWXTRTzG02+T6D0xMCgYBR
dvNlum1IcjQbyod6iq/BkUkZopsiy224A6rOm2Uc1RI5NtpnXOBkf80VZlmSFhZY
frVRXzP/DNLi5p9yJWqUmKnoODXen8T9XQBjwH9JByRH2X9ppjvWQHda5KX1UCvk
kQfZEi4uv63e2fyRVYElQydUgPkmr3bkfXdr/izszQKBgB0D0N5rS7BzxSAG0Epr
mDbobdQWVtiCRiRc2o0D5SbIB3VJxZkhaqXRBDW7X+OyFVADT/8VR0jyfYfYrWpL
PDHLDee4uoBFqGOpu9cwu1liYkR/ZvxSuEB3ZzMhUlIgWehIQn5qOPu8ccQN1Bwv
eYfjAfd9EXQE4+g38cPZPdAr
-----END PRIVATE KEY-----
`

// 接收方公钥
const PBK2 = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx9WJ+ZFxmJyD34LTAYQa
sFMAVhvRB/0CoTIZl9NQ7lTK0eQp5HO36VvzbPJ24qTy3j1cG6lsyJgeNxwkco65
vPD2VAAHP/lIwVB4WqNf7c/LNnnpuu1656Tpciqp1NVyJo1BGIhi+8gneqzzSY2m
wMLgOIjX8IGmKIXz0wlY7yfatebDYjXUo9Bd67HJKPxNLYZMph3gWImrmpC8xjBI
CBlDbS8c1V2dozzsqwD7+YohmP16AvlMJ9G34tSf4Utw3l0m3eNBrYgDzio35hrZ
ZoD9y6pNezq/VyNfs0BZJ+x6tpIp3ZCvTequgoG/LCc0+q09PmzfuXNR5tdbHSFn
6wIDAQAB
-----END PUBLIC KEY-----
`

const data1 = `
{
  "command": "address",
  "options": {
    "pass": "test",
    "coin": "nem",
    "path": "0'"
  }
}
`

let data = {
  "command": "sign",
  "options": {
    "pass": "test",
    "coin": "nem",
    "path": "0'",
    "recipient": "NDTDBMRCS4AXG4TXW5LTY3RGPGORY4EA6FJWHGP4",
    "timeStamp": 74649215,
    "amount": 2000000,
    "fee": 2000000,
    "mosaicId": [],
    "type": 257,
    "deadline": 74735615,
    "message": {
      "payload": "ac",
      "type": 1
    },
    "version": 1744830465
  },
  "remark": "123456789"
}

strBody = JSON.stringify(data);

const MSG_LEN = 117 * 2 + 11; // 最大加密

let arrData = []
arrData.push(Date.now() + 60 * 60 * 24 * 365 * 1000); // 过期时间
for (let i = 0; i < Math.ceil(strBody.length / MSG_LEN); i++) {
  let tmpStr = strBody.slice(i * MSG_LEN, (i + 1) * MSG_LEN); // 数据分段
  tmpStr = crypto.publicEncrypt({
    key: PBK2,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, Buffer.from(tmpStr)).toString('base64') // 公钥2加密
  arrData.push(tmpStr);
}

const strData = arrData.join('.')
console.log('\n> data: ' + strData) // data

sign.update(Buffer.from(strData)) // 签名
const signature = sign.sign(PVK1, 'base64') // 私钥1签名
console.log('\n> sign: ' + signature) // sign

verify.update(Buffer.from(strData)) // 验签
const verified = verify.verify(PBK1, signature, 'base64') // 公钥1验签
console.log('\n< verified: ' + verified) // 验签结果

let _strData = ''
for (let i = 1; i < arrData.length; i++) {
  _strData += crypto.privateDecrypt({
    key: PVK2,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, Buffer.from(arrData[i], 'base64')).toString(); // 私钥1解密
}
console.log('\n< decrypt:' + _strData)

