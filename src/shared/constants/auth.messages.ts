export const AUTH_MESSAGES = {
    EMAIL: {
        INVALID: "Adresa de email nu este validă.",
        REQUIRED: "Email-ul este obligatoriu.",
        ALREADY_EXISTS: "Această adresă de email este deja înregistrată.",
    },
    PASSWORD: {
        MIN: "Parola trebuie să aibă cel puțin 4 caractere.",
        MAX: "Parola este prea lungă.",
        MISMATCH: "Parolele nu coincid.",
    },
    FIRST_NAME: {
        MIN: "Prenumele trebuie să aibă cel puțin 2 caractere.",
        MAX: "Prenumele este prea lung.",
    },
    LAST_NAME: {
        MIN: "Numele trebuie să aibă cel puțin 2 caractere.",
        MAX: "Numele este prea lung.",
    },
    SUCCESS: {
        REGISTERED: "Cont creat cu succes! Verifică e-mail-ul pentru codul de activare.",
    },
    GENERAL: {
        ERROR: "A apărut o eroare. Te rugăm să încerci din nou.",
    },
    VERIFICATION: {
        INVALID_CODE: "Codul de activare este incorect.",
        EXPIRED: "Codul a expirat. Te rugăm să soliciți unul nou.",
        SUCCESS: "Contul a fost activat cu succes!",
        ALREADY_VERIFIED: "Acest cont este deja verificat.",
        NOT_FOUND: "Utilizatorul nu a fost găsit sau codul lipsește.",
    },
}
