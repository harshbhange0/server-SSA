import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    givenTest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "test",
        }
    ],
    refreshToken: { type: String }
}, {
    timestamps: true
})

const User = mongoose.model("Student", UserSchema)

export default User