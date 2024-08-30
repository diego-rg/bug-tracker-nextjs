import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, "You must provide a name for the project."],
        unique: [true, "A project with that name already exists."],
    },
    bugs: [{
        type: Schema.Types.ObjectId,
        ref: 'Bug',
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    developers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: [true, "The developer is already assigned to this project."],
    }]
},
    { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;