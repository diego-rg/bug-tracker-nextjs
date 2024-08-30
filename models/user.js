import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: [true, "An user with that name already exists."],
        required: [true, "You must provide a valid name to create a new user."],
    },
    email: {
        type: String,
        unique: [true, "An user with that email already exists."],
        required: [true, "You must provide a valid email to create a new user."],
    },
    image: {
        type: String,
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        unique: [true, "This user is already in the project."],
    }],
},
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;