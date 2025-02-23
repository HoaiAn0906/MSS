import { SubmitHandler, useForm } from "react-hook-form";
import { TaxClass } from "../models/TaxClass";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  taxClassSchema,
  TaxClassFormData,
} from "../validations/TaxClassSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TaxClassFormProps {
  initialData?: TaxClass;
  onSubmit: SubmitHandler<TaxClassFormData>;
  formRef?: React.Ref<HTMLFormElement>;
}

const TaxClassForm: React.FC<TaxClassFormProps> = ({
  initialData,
  onSubmit,
  formRef,
}) => {
  const form = useForm<TaxClassFormData>({
    resolver: zodResolver(taxClassSchema),
    defaultValues: initialData || {
      id: null,
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default TaxClassForm;
