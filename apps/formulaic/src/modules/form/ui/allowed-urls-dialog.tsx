"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { Input } from "../../../@/components/ui/input";
import { UrlBadges } from "../../../ui/url-badges";
import { Separator } from "../../../@/components/ui/separator";
import { UseAllowedUrlsValues } from "./form-creator";

export const AllowedUrlsDialog = ({
  urls,
  addUrl,
  deleteUrl,
  urlValue,
  setUrlValue,
}: UseAllowedUrlsValues) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center" variant="outline">
          Manage
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
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              type="text"
              name="domain"
              placeholder="https://example.com"
              className="w-3/5"
            />
            <Button type="button" size="icon" onClick={addUrl}>
              <PlusIcon />
            </Button>
          </div>
          <Separator orientation="horizontal" className="my-2" />
          <UrlBadges urls={urls} onDeleteClick={deleteUrl} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
