import { toast } from 'react-toastify';

export function toastify({ type, message }) {
    message = handleResponeMessage(message);
    if (type === 'error') { toast.error(message) } else if (type === 'info') { toast.info(message) } else if (type === 'success') { toast.success(message) } else if (type === 'warning') { toast.warning(message) } else { toast(message) }

    console.log("ba toast", message)
}

function handleResponeMessage(message) {
    if (message === "auth/too-many-requests") return "Cok Fazla Deneme Yapildi!";
    else if (message === "auth/email-alread-in-use") return "Bu kullanici zaten mevcut";
    else if (message === "auth/wrong-password" || message === "auth/user-not-found") return "Mail ve Sifrenizi Kontrol Ediniz";
    else return message;
    
}