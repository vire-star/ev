// src/utils/validation.js
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone)
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateInput = (value, type) => {
  if (!value) return { isValid: false, error: 'This field is required' }
  
  if (type === 'phone') {
    return validatePhone(value)
      ? { isValid: true }
      : { isValid: false, error: 'Enter valid 10-digit phone number' }
  }
  
  if (type === 'email') {
    return validateEmail(value)
      ? { isValid: true }
      : { isValid: false, error: 'Enter valid email address' }
  }
  
  return { isValid: true }
}
