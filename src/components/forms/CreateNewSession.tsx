import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { BiSolidMessageSquareAdd } from "react-icons/bi"

interface CreateNewSessionProps {
  onSubmit: () => void;
}

export default function CreateNewSession({ onSubmit }: CreateNewSessionProps) {
  const [sessionName, setSessionName] = useState<string>('');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-0 bg-transparent hover:bg-transparent border-0">
          <BiSolidMessageSquareAdd className='text-3xl text-gray-500 hover:text-primary' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Session</DialogTitle>
          <DialogDescription>
            Start a new session with ChatIt.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="">
              Session Name
            </Label>
            <Input
              id="name"
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className=""
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={(e) => { e.preventDefault(); onSubmit() }}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
