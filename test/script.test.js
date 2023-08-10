const request = require('supertest')
const app = require('../dist/server').app

describe('init tests', () => {
  it('check if server is running', async () => {
    const res = await request(app).get('/')

    expect(res.statusCode).toEqual(200)
  })
})
