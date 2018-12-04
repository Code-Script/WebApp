import passwordHash from 'pbkdf2-password-hash';

// generates random salt
export function generatePassword(password) {
    passwordHash.hash(password)
        .then((hash) => {
            //> hash === 'sha512$65536$64$F8zraj9jMjo/GmV91lPNVX7MP8iaJX/NK6YG4u4NH+wUeBBfydb5kZl4Bc7nlChZAH78YaExx9l0WfPuEC39Ew==$UcjfxN4pmEv+iD8nUjyd4hEnlkkkuLYEtAy1V3Cr3s96AAeyBLbRUhVgJTwSRJZUj23xQ2cuOPTnH/YoAkNqOQ=='
            // console.log(hash);
            return hash;
        })
        .catch(err => {
            console.log(err); 
            return false;
        });
}

// const hash = 'sha512$65536$64$F8zraj9jMjo/GmV91lPNVX7MP8iaJX/NK6YG4u4NH+wUeBBfydb5kZl4Bc7nlChZAH78YaExx9l0WfPuEC39Ew==$UcjfxN4pmEv+iD8nUjyd4hEnlkkkuLYEtAy1V3Cr3s96AAeyBLbRUhVgJTwSRJZUj23xQ2cuOPTnH/YoAkNqOQ=='

export function validatePassword(password, hash) {
    passwordHash.compare(password, hash)
    .then((isValid) => {
        //> isValid === true
        // console.log(isValid);
        return isValid;
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}
