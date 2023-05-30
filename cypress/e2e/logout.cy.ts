import { testingUser1 } from './util/credentials'
import { login } from './util/login.util'
import { logout } from './util/logout.util'

describe('Logout', () => {

  it('must logout', () => {
    login(testingUser1.email, testingUser1.password)
    logout()
  })
  
})
