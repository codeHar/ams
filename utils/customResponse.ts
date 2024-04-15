export const customResponse = ({
  message,
  payload = [],
  status = true,
}: {
  message?: string;
  payload?: any;
  status?: boolean;
}) => {
  return {
    status,
    message,
    payload,
  };
};
