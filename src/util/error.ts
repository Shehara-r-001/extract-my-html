type HandleErrorParams = {
  error: Error | any; // eslint-disable-line
  message: string;
};

const handleError = ({ error, message }: HandleErrorParams) => {
  if (error instanceof Error) {
    console.error(error);
    throw new Error(`${message}:: ${error.message}`);
  }

  throw new Error(message);
};

export { handleError };
