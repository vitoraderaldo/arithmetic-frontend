export interface Operation {
    id: number;
    name: string;
    cost: number;
    inputs: number;
}

export interface FindOperationsResponse {
    operations: Operation[];
}

export enum OperationId {
    ADDITION = 1,
    SUBTRACTION = 2,
    MULTIPLICATION = 3,
    DIVISION = 4,
    SQUARE_ROOT = 5,
    RANDOM_STRING = 6,
}
