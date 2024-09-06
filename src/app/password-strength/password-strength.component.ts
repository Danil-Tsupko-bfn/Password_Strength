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
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isSimple = (hasLetter ? 1 : 0) + (hasDigit ? 1 : 0) + (hasSymbol ? 1 : 0) === 1;
    const isMedium = (hasLetter && hasDigit) || (hasLetter && hasSymbol) || (hasDigit && hasSymbol);
    const isStrong = hasLetter && hasDigit && hasSymbol;

    if (isStrong) {
      return ['green', 'green', 'green'];
    } else if (isMedium) {
      return ['yellow', 'yellow', 'gray'];
    } else {
      return ['red', 'gray', 'gray'];
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
