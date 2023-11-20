import { Button } from "../@/components/ui/button";
import { Badge } from "../@/components/ui/badge";
import { Cross1Icon } from "@radix-ui/react-icons";

const UrlBadge = ({
  url,
  onDeleteClick,
}: {
  url: string;
  onDeleteClick?: (url: string) => void;
}) => {
  const text = url.replace(/https?:\/\//, "");
  return (
    <Badge className="px-2 py-2 flex items-center gap-1" variant={"secondary"}>
      <a target="_blank" rel="noopener noreferrer" href={url}>
        {text}
      </a>
      {onDeleteClick && (
        <Button
          className="pr-0 h-5 w-5"
          size="icon"
          variant={"ghost"}
          onClick={() => onDeleteClick(url)}
        >
          <Cross1Icon />
        </Button>
      )}
    </Badge>
  );
};
export const UrlBadges = ({
  urls,
  onDeleteClick,
}: {
  urls: string[];
  onDeleteClick?: (url: string) => void;
}) => {
  return (
    <ul className="m-0 flex gap-2 list-none flex-wrap w-80">
      {urls.map((url) => (
        <li className="m-0">
          <UrlBadge url={url} onDeleteClick={onDeleteClick} />
        </li>
      ))}
    </ul>
  );
};
