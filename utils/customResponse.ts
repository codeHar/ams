export const customResponse = (
  message: string,
  payload: any = [],
  status: boolean = true
) => {
  return {
    status,
    message,
    payload,
  };
};
