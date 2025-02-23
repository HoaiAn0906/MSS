import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ProductOptionFormData } from "@/modules/catalog/validations/ProductOptionSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type DisplayTypeModalProps = {
  show: boolean;
  handleCloseModel: () => void;
  handleColorChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    optionValueKey: string
  ) => void;
  currentModelOption: ProductOptionFormData | null;
  productOptionValuePost: {
    productOptionId?: number;
    value: { [key: string]: string };
    displayType?: string;
    displayOrder?: number;
  }[];
  setDisplayType: (type: string) => void;
};

const DisplayTypeModal: React.FC<DisplayTypeModalProps> = ({
  show,
  handleCloseModel,
  handleColorChange,
  currentModelOption,
  productOptionValuePost,
  setDisplayType,
}) => {
  const getOption = () => {
    const option = productOptionValuePost.find(
      (t) => t.productOptionId === currentModelOption?.id
    );
    return option || null;
  };

  return (
    <Dialog open={show} onOpenChange={handleCloseModel}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Select Display Type
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <form>
            <fieldset className="mb-4">
              <legend className="text-sm font-semibold">Type:</legend>
              <RadioGroup
                value={getOption()?.displayType || ""}
                onValueChange={setDisplayType}
                className="flex space-x-4 mt-2"
              >
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="text" className="form-radio" />
                  <span>Text</span>
                </label>
                <label className="flex items-center space-x-2">
                  <RadioGroupItem value="color" className="form-radio" />
                  <span>Color</span>
                </label>
              </RadioGroup>
            </fieldset>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Options
              </label>
              <div className="space-y-2">
                {Object.entries(getOption()?.value || "").map(
                  ([key, value]) => (
                    <div key={key} className="flex items-center space-x-4">
                      <label className="w-20">{key}</label>
                      <Input
                        type="color"
                        value={value}
                        onChange={(event) =>
                          handleColorChange(
                            event as React.ChangeEvent<HTMLInputElement>,
                            key
                          )
                        }
                        className="w-10 h-10 p-0 border-none"
                      />
                      <Input
                        type="text"
                        value={value}
                        onChange={(event) =>
                          handleColorChange(
                            event as React.ChangeEvent<HTMLInputElement>,
                            key
                          )
                        }
                        placeholder="#000000"
                        className="form-input w-full"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </form>
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button onClick={handleCloseModel} variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisplayTypeModal;
