import figma from "@figma/code-connect"
import { Button } from "./button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

figma.connect(
  DialogContent,
  "https://www.figma.com/design/ejRYKClcVaPpz3q4h2XNZa/Obra-shadcn-ui-kit-community-edition--1.6.0---Community-?node-id=151-12298",
  {
    example: () => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              Dialog description goes here.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  }
)
