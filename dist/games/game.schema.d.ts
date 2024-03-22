/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import * as mongoose from "mongoose";
import { Connection } from "mongoose";
export declare const GameSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    participants: mongoose.Types.DocumentArray<{
        score: number;
        name?: string;
    }>;
    questionList?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
    code?: string;
    startDatetime?: Date;
    endDatetime?: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    participants: mongoose.Types.DocumentArray<{
        score: number;
        name?: string;
    }>;
    questionList?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
    code?: string;
    startDatetime?: Date;
    endDatetime?: Date;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    participants: mongoose.Types.DocumentArray<{
        score: number;
        name?: string;
    }>;
    questionList?: {
        prototype?: mongoose.Types.ObjectId;
        cacheHexString?: unknown;
        generate?: {};
        createFromTime?: {};
        createFromHexString?: {};
        createFromBase64?: {};
        isValid?: {};
    };
    code?: string;
    startDatetime?: Date;
    endDatetime?: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const GameProviders: {
    provide: string;
    useFactory: (connection: Connection) => mongoose.Model<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        participants: mongoose.Types.DocumentArray<{
            score: number;
            name?: string;
        }>;
        questionList?: {
            prototype?: mongoose.Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        };
        code?: string;
        startDatetime?: Date;
        endDatetime?: Date;
    }, {}, {}, {}, mongoose.Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        participants: mongoose.Types.DocumentArray<{
            score: number;
            name?: string;
        }>;
        questionList?: {
            prototype?: mongoose.Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        };
        code?: string;
        startDatetime?: Date;
        endDatetime?: Date;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        participants: mongoose.Types.DocumentArray<{
            score: number;
            name?: string;
        }>;
        questionList?: {
            prototype?: mongoose.Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        };
        code?: string;
        startDatetime?: Date;
        endDatetime?: Date;
    } & {
        _id: mongoose.Types.ObjectId;
    }, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
        versionKey: false;
        timestamps: true;
    }, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        participants: mongoose.Types.DocumentArray<{
            score: number;
            name?: string;
        }>;
        questionList?: {
            prototype?: mongoose.Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        };
        code?: string;
        startDatetime?: Date;
        endDatetime?: Date;
    }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        participants: mongoose.Types.DocumentArray<{
            score: number;
            name?: string;
        }>;
        questionList?: {
            prototype?: mongoose.Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        };
        code?: string;
        startDatetime?: Date;
        endDatetime?: Date;
    }>> & mongoose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        participants: mongoose.Types.DocumentArray<{
            score: number;
            name?: string;
        }>;
        questionList?: {
            prototype?: mongoose.Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        };
        code?: string;
        startDatetime?: Date;
        endDatetime?: Date;
    }> & {
        _id: mongoose.Types.ObjectId;
    }>>;
    inject: string[];
}[];
