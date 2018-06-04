import bcrypt from 'bcrypt';

const saltRounds = 10;

export function securePassword(data) {
  const { password } = data;
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      const secureObject = data;
      secureObject.password = hash;
      delete secureObject.confirmPassword;
      resolve(secureObject);
    }));
}

export function testPassword(comparePassword, { password }) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(comparePassword, password, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    }));
}

export default securePassword;
