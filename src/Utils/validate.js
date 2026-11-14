export const checkValidData = (email, password, username) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // At least 8 characters, including uppercase, lowercase, a number,
  // and a special character. Spaces are not allowed.
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]{8,}$/.test(
      password
    );

  // Pass a username for sign up; omit it for sign in.
  // Names must have at least 3 characters, using letters and spaces.
  const isUsernameValid =
    username === undefined || /^[A-Za-z][A-Za-z ]{2,}$/.test(username.trim());

  if (!isEmailValid) return "EmailID is not valid";
  if (!isPasswordValid) return "Password is not valid";
  if (!isUsernameValid) return "Username is not valid";

  return null;
};
