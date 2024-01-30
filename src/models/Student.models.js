import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
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

const Student = mongoose.model("Student", StudentSchema)

export default Student