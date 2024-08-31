import { Schema, model, models } from 'mongoose';

const BugSchema = new Schema({
    name: {
        type: String,
        required: [true, "You must provide a name for the bug."],
        unique: [true, "A bug with that name already exists."],
    },
    description: {
        type: String,
        required: [true, "You must provide a description for the bug."],
    },
    status: {
        type: String,
        enum: ["new", "assigned", "fixed"],
        default: "new",
        required: [true, "You must provide an initial status for the bug."],
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "You must provide a priority level for the bug."],
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "You must provide a severity level for the bug."],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    assignedTo: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
},
    { timestamps: true }
);

const Bug = models.Bug || model('Bug', BugSchema);

export default Bug;