import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const inputSchema = z.object({
  name: z.string(),
  type: z.string().default("text").optional(),
  className: z.string().optional(),
  registerName: z.string().optional(),
  validation: z.unknown().optional(),
});

type inputType = z.infer<typeof inputSchema>;

export const Input = (props: inputType) => {
  const { name } = props;
  const { registerName, validation, ...data } = props;
  const { register } = useFormContext();

  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-800 capitalize"
      >
        {name}
      </label>

      <input
        {...data}
        {...register(registerName ?? name, validation ?? undefined)}
        className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40"
      />
      <ErrorMessage
        name={registerName ?? name}
        render={({ message }) => <p className="form__error">{message}</p>}
      />
    </div>
  );
};

export default Input;
