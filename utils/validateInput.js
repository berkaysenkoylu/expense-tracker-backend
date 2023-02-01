const isFieldNotEmpty = (input) => {
    let isValid = true;
    
    Object.keys(input).forEach(inp => {
        isValid = isValid && input[inp].trim() !== "";
    });

    return isValid;
}

const isEmail = (email) => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(email);
}

const includesNonEnglish = (input) => {
    const pattern = /[^\x00-\x7F]+/;
    let count = 0; // Number of fields that include non english character

    Object.keys(input).forEach(field => {
        count = pattern.test(input[field]) ? ++count : count; 
    });

    return count > 0;
}

const isPasswordValid = (password) => {
    /*
        A valid password should include the following:
        - at least 8 characters, at most 16 characters long
        - at least 1 uppercase character
        - at least 1 numeric character
        - at least 1 non-alpha numeric character like: `! @ # $ % ^ &`
    */
    const regularExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    return regularExp.test(password);
}

module.exports = {
    isFieldNotEmpty,
    isEmail,
    includesNonEnglish,
    isPasswordValid
}