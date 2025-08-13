export const validationError = {  
    error: {
      name: "ValidationError",
      errors: {
        copies: {
          message: "Copies must be a positive number",
          name: "ValidatorError",
          properties: {
            message: "Copies must be a positive number",
            type: "min",
            min: 0
          },
          kind: "min",
          path: "copies",
          value: -5
        }
      }
    }
  }