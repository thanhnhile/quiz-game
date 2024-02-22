import mongoose from "mongoose";

type Participant = {
    name: string;
    score: number
}

export interface Game extends Document {
    readonly code:string;
    readonly questions_list_id: mongoose.Types.ObjectId;
    readonly participants : []

}