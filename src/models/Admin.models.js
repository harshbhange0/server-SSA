import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    addedTest: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "test",
            required: true
        }
    ],
    refreshToken: { type: String}
}, {
    timestamps: true
})

const Admin = mongoose.model("Admin", AdminSchema)

export default Admin