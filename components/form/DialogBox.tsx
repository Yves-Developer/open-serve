"use client";
import { categories } from "@/constant";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ComboboxBox, Detail } from "./comboBox";
import { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import { createComplaint } from "@/app/service/complaint";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DialogBox = ({ agencies }: { agencies: Detail[] }) => {
  /**
   * DialogBox component for reporting issues.
   * It allows users to select a category, describe the issue,
   * and choose an agency to report the issue to.
   * It uses a dialog to present the form and handles submission with validation.
   * @param {Detail[]} agencies - List of agencies to choose from.
   * @returns {JSX.Element} - The rendered DialogBox component.
   *
   */
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [agency, setAgency] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { data: success } = useSession();
  const router = useRouter();

  const userId = success?.user?.id;
  const handleSubmit = useCallback(() => {
    // Validate
    if (!category || !description || !agency || !userId) {
      toast("Please fill all fields.");
      return;
    }
    // Here, you can call your API to submit the issue.
    console.log({ category, description, agency });
    setOpen(false);
    startTransition(async () => {
      try {
        await createComplaint({
          userId,
          category,
          description,
          agencyId: agency,
        });
        toast.success("Issue submitted successfully.");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
        setOpen(true);
      }
    });

    setCategory("");
    setDescription("");
    setAgency("");
    setTimeout(() => {
      router.refresh();
    }, 1000);
  }, [category, description, agency, userId, startTransition, router]);
  if (!success) return null;
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Report Issue</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="mx-auto max-w-[450px]">
            Create Issue
          </DialogTitle>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <ComboboxBox
              Details={categories}
              setData={setCategory}
              type="Category"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your issue"
              className="resize-none h-24"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Agency</Label>
            <ComboboxBox Details={agencies} setData={setAgency} type="Agency" />
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Submit Issue"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogBox;
