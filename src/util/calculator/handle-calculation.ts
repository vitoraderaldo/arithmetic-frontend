import { apiService } from "../../api/api.service";
import { CalculationInput, CalculationResponse } from "../../types/calculation.type";
import { OperationId } from "../../types/operations.type";

const convertToNumber = (inputs: CalculationInput[]): number[] => {
  return inputs.map((input) => parseInt(input?.value));
}

export const executeCalculation = (
  operationId: OperationId,
  inputs: CalculationInput[]
): () => Promise<CalculationResponse> => {

  switch (operationId) {
    case OperationId.ADDITION:
      return () => apiService.calculateAddition(convertToNumber(inputs))
    case OperationId.SUBTRACTION:
      return () => apiService.calculateSubtraction(convertToNumber(inputs))
    case OperationId.MULTIPLICATION:
      return () => apiService.calculateMultiplication(convertToNumber(inputs))
    case OperationId.DIVISION:
      return () => apiService.calculateDivision(convertToNumber(inputs))
    case OperationId.SQUARE_ROOT:
      return () => apiService.calculateSquareRoot(convertToNumber(inputs))
    case OperationId.RANDOM_STRING:
      return () => apiService.calculateRandomString(convertToNumber(inputs))
    default:
      throw new Error(`Operation ${operationId} not supported`);
  }

}
