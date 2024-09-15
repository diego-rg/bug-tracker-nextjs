import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, "You must provide a name for the project."],
        maxlength: 25
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "You must provide an admin for the project."],
    },
    developers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
},
    { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;