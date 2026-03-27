const SHARED_MESSAGES = {
    EMAIL_INVALID: "Te rugăm să introduci o adresă de email validă.",
    PASSWORD_MIN: (min: number) => `Parola trebuie să aibă cel puțin ${min} caractere.`,
    PASSWORD_MAX: (max: number) => `Parola nu poate depăși ${max} caractere.`,
    REQUIRED: "Acest câmp este obligatoriu.",
};

export const LoginMessages = {
    email: SHARED_MESSAGES.EMAIL_INVALID,
    passwordMin: SHARED_MESSAGES.PASSWORD_MIN(4),
    passwordMax: SHARED_MESSAGES.PASSWORD_MAX(60),
};

export const RegisterMessages = {
    lastName: "Numele este prea scurt (minim 2 caractere).",
    firstName: "Prenumele este prea scurt (minim 2 caractere).",
    email: SHARED_MESSAGES.EMAIL_INVALID,
    passwordMin: SHARED_MESSAGES.PASSWORD_MIN(6),
    passwordMax: SHARED_MESSAGES.PASSWORD_MAX(60),
    confirmPassword: "Parolele nu coincid.",
};

export const VerifyMessages = {
    email: SHARED_MESSAGES.EMAIL_INVALID,
    codeLength: "Codul trebuie să aibă exact 6 cifre.",
    codeDigits: "Codul trebuie să conțină doar cifre.",
};