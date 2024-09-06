import { Routes } from '@angular/router';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';

export const routes: Routes = [
    {path:'pas',component:PasswordStrengthComponent},
    { path: '', redirectTo: '/pas', pathMatch: 'full' } 
];
