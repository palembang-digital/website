import { AuthErrorCodes } from "firebase/auth"

const TranslateErrorCodes = (code, message) => {
  switch (typeof code === 'string' ? code : message) {
    case AuthErrorCodes.USER_DELETED:
      return {
        name: 'email',
        errors: ['Pengguna tidak ditemukan']
      }
    case AuthErrorCodes.INVALID_EMAIL:
      return {
        name: 'email',
        errors: ['Email Salah']
      }
    case AuthErrorCodes.EMAIL_EXISTS:
      return {
        name: 'email',
        errors: ['Email Telah Digunakan']
      }
    case AuthErrorCodes.INVALID_PASSWORD:
      return {
        name: 'password',
        errors: ['Password Salah']
      }
    case AuthErrorCodes.WEAK_PASSWORD:
      return {
        name: 'password',
        errors: ['Password Lemah']
      }
    case AuthErrorCodes.POPUP_BLOCKED:
    case AuthErrorCodes.EXPIRED_POPUP_REQUEST:
    case AuthErrorCodes.POPUP_CLOSED_BY_USER:
      return 'Social login error'
    case AuthErrorCodes.INTERNAL_ERROR:
    default:
      return 'Input Salah'
  }
}

export default TranslateErrorCodes;