import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true, "You must provide some content to create the comment."],
    },
    bug: {
        type: Schema.Types.ObjectId,
        ref: 'Bug',
        required: [true, "You must provide a bug for the comment."],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "You must provide a project for the comment."],
    },
},
    { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;