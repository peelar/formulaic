import { Button } from "../@/components/ui/button";
import { Badge } from "../@/components/ui/badge";
import { Cross1Icon } from "@radix-ui/react-icons";

export const BadgeListItem = ({
  children,
  onDeleteClick,
}: {
  children: React.ReactNode;
  onDeleteClick?: () => void;
}) => {
  return (
    <Badge className="px-2 py-2 flex items-center gap-1" variant={"secondary"}>
      {children}
      {onDeleteClick && (
        <Button
          className="pr-0 h-5 w-5"
          size="icon"
          type="button"
          variant={"ghost"}
          onClick={() => onDeleteClick()}
        >
          <Cross1Icon />
        </Button>
      )}
    </Badge>
  );
};

export const BadgeList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="m-0 flex gap-2 list-none flex-wrap w-80">{children}</ul>
  );
};
