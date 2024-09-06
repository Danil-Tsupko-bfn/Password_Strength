import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent {
  passwordControl = new FormControl('');

  /**replaceable for password visibility control*/
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getStrengthClass(): string[] {
    const password = this.passwordControl.value || '';

    if (password.length === 0) {
      return ['gray', 'gray', 'gray'];
    }

    if (password.length < 8) {
      return ['red', 'red', 'red'];
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[!@#$%^-_=&*(),.?":;{}|<>]/.test(password);

    if (hasLetter && hasDigit && hasSymbol) {
      return ['green', 'green', 'green'];
    } else if ((hasLetter && hasDigit) || (hasLetter && hasSymbol) || (hasDigit && hasSymbol)) {
      return ['yellow', 'yellow', 'gray'];
    } else if (hasLetter || hasDigit) {
      return ['red', 'gray', 'gray'];
    } else {
      return ['gray', 'gray', 'gray'];
    }
  }

  getStrengthContainerClass(): string {
    const classes = this.getStrengthClass();
    if (classes.includes('red')) {
      return 'weak';
    } else if (classes.includes('yellow')) {
      return 'medium';
    } else if (classes.includes('green')) {
      return 'strong';
    }
    return 'neutral';
  }
}
