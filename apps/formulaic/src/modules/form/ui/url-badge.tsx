import { BadgeList, BadgeListItem } from "../../../ui/badge-list";

export const UrlBadge = ({
  url,
  onDeleteClick,
}: {
  url: string;
  onDeleteClick?: (url: string) => void;
}) => {
  return (
    <BadgeListItem key={url} onDeleteClick={() => onDeleteClick?.(url)}>
      <a target="_blank" rel="noopener noreferrer" href={url}>
        {url}
      </a>
    </BadgeListItem>
  );
};
