"use client";
import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "../../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { BadgeListForm } from "../../../ui/badge-list-form";
import { UseAllowedUrlsValues } from "./form-creator";
import { UrlBadge } from "./url-badge";

export const AllowedUrlsDialog = ({
  urls,
  addUrl,
  deleteUrl,
  urlValue,
  setUrlValue,
}: UseAllowedUrlsValues) => {
  const urlsWithoutHttps = urls.map((url) => url.replace(/https?:\/\//, ""));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center" variant="outline">
          Manage
          <GearIcon className="ml-2 w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit allowed URLs</DialogTitle>
          <DialogDescription>
            Add the URL of the website where you want to embed this form. This
            will prevent others from embedding your form on their website.
          </DialogDescription>
        </DialogHeader>
        <BadgeListForm
          inputPlaceholder="https://www.example.com"
          addBadge={addUrl}
          inputValue={urlValue}
          setInputValue={setUrlValue}
        >
          {urlsWithoutHttps.map((url) => (
            <UrlBadge onDeleteClick={(url) => deleteUrl(url)} url={url} />
          ))}
        </BadgeListForm>
      </DialogContent>
    </Dialog>
  );
};
