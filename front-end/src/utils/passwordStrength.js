export function checkPasswordStrength(password) {
    const hasDigit = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password);
    const isLongEnough = password.length >= 6;
  
    const strength = {
      score: 0,
      message: '',
    };
  
    if (hasDigit) {
      strength.score++;
    }
    if (hasUpperCase) {
      strength.score++;
    }
    if (hasSpecialChar) {
      strength.score++;
    }
    if (isLongEnough) {
      strength.score++;
    }
  
    switch (strength.score) {
      case 0:
        strength.message = 'Very Weak (Please create a stronger password)';
        break;
      case 1:
        strength.message = 'Weak (Consider adding more complexity)';
        break;
      case 2:
        strength.message = 'Moderate';
        break;
      case 3:
        strength.message = 'Strong';
        break;
      case 4:
        strength.message = 'Very Strong';
        break;
      default:
        strength.message = 'Invalid password'; // Handle unexpected cases
    }
  
    return strength.message;
  }