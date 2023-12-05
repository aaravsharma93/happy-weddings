const regexForEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexForMobile = /^[3-9]$/;

const ValidateEmail = (email) => {
    return regexForEmail.test(email);
}

const ValidateMobileNumber = (mobile) => {
    return regexForMobile.test(mobile)
}


// --------------------------- Validation Function Export -----------------------------
export {
    ValidateEmail,
    ValidateMobileNumber
}