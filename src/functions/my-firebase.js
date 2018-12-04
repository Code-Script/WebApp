// Error occurred. Inspect error.code.
import firebase from 'firebase';

export function msgError(code, text) {
    var message = '';

    switch (code) {
        case "auth/wrong-password":
            message = 'La contraseña es incorrecta.';
            break;
        case "auth/weak-password":
            message = 'La contraseña debe tener al menos 6 caracteres.';
            break;
        case "auth/email-already-exists":
            message = 'Este correo ya existe.';
            break;
        case 'auth/invalid-email':
            message = 'El correo no es válido.';
            break;
        case 'auth/user-not-found':
            message = 'Este usuario no existe.';
            break;
        case 'auth/email-already-in-use':
            message = 'Este correo ya está registrado.';
            break;
        case 'auth/network-request-failed':
            // message = ' A network error (such as timeout, interrupted connection or unreachable host) has occurred.';
            message = 'Ha ocurrido un problema de red.';
            break;
        case 'auth/account-exists-with-different-credential':
            message = 'La dirección de correo electrónico está vinculada al proveedor de otro usuario.';
            break;
        default:
            message = `code: ${code} message: ${text}`;
            break;
    }
    return message;
}

export function writeUserData(user) {
    firebase.database().ref(`users/${user.uid}`).once('value').then((snapshot) => {
        // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        // let userDatabase = snapshot.val();
        if (snapshot.val()) {
            if (user.email != snapshot.val().email) {
                firebase.database().ref(`users/${user.uid}`).update({
                    displayName: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    refreshToken: user.refreshToken,
                    uid: user.uid,
                    range: 0,
                    creationTime: new Date().getTime()
                }).then(() => {
                    return true;
                }).catch(error => {
                    console.log(error);
                    return false;
                });
            }
        }
    });
}