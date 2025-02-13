import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }],
    pic: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;