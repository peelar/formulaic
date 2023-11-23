import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";
import { BadgeList, BadgeListItem } from "./badge-list";
import { PropsWithChildren } from "react";

type BadgeListFormProps = PropsWithChildren<{
  addBadge: () => void;
  inputValue: string;
  inputPlaceholder: string;
  setInputValue: (value: string) => void;
}>;

export const BadgeListForm = (props: BadgeListFormProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={props.inputValue}
          onChange={(e) => props.setInputValue(e.target.value)}
          type="text"
          name="domain"
          placeholder={props.inputPlaceholder}
          className="w-3/5"
        />
        <Button
          disabled={props.inputValue.length === 0}
          type="button"
          size="icon"
          onClick={props.addBadge}
        >
          <PlusIcon />
        </Button>
      </div>
      <BadgeList>{props.children}</BadgeList>
    </div>
  );
};
