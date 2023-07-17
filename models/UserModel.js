const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  pass: {
    type: String,
    require: true,
  },
  pin: {
    type: String,
    require: true,
  },
});

UserSchema.statics.login = async function (authObj) {
  if (authObj.pinLogin) {
    const { pin } = authObj;
    if (!pin) throw Error("PIN Cannot be Empty");

    const user = await this.findOne({ pin });
    if (!user) throw Error("Invalid PIN");

    return user;
  } else {
    const { email, pass } = authObj;
    if (!email || !pass) throw Error("Feilds Cannot be Empty");

    const user = await this.findOne({ email });
    if (!user) throw Error("Incorrect Email");

    let insertedPass = authObj.pass;
    const validPass = await bcrypt.compare(insertedPass, user.pass)
    
    if(!validPass) throw Error("Incorrect Password")

    return user;
  }
};

UserSchema.statics.signup = async function (authObj) {
  const { email, pass, pin } = authObj;
  if (!email || !pass || !pin) throw Error("Feilds cannot be empty");

  const existing = await this.find({ email });
  console.log(existing);
  if (existing && existing.length > 0) throw Error("User Already Exists");

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(pass, salt);
  const encryptedPIN = await bcrypt.hash(pin, salt);

  const user = await this.create({
    email,
    pass: encryptedPassword,
    pin: encryptedPIN,
  });
  console.log(user);

  return user;
};

module.exports = mongoose.model("user", UserSchema, "users");
