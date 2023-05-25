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
}
