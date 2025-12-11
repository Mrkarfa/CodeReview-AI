"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  BookOpen,
  Pencil,
  Trash2,
  FileText,
  CheckCircle,
} from "lucide-react";

interface Guideline {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const initialGuidelines: Guideline[] = [
  {
    id: "1",
    title: "Error Handling Standards",
    content:
      "All async functions must include proper try/catch blocks. Errors should be logged and user-friendly messages displayed.",
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "React Best Practices",
    content:
      "Use React.memo for components that receive stable props. Prefer useMemo and useCallback for expensive computations and callback functions.",
    createdAt: "2024-12-05",
  },
  {
    id: "3",
    title: "Security Requirements",
    content:
      "Never store sensitive data in localStorage. Use httpOnly cookies for authentication tokens. Sanitize all user inputs.",
    createdAt: "2024-12-08",
  },
];

export default function GuidelinesPage() {
  const [guidelines, setGuidelines] = useState<Guideline[]>(initialGuidelines);
  const [isOpen, setIsOpen] = useState(false);
  const [editingGuideline, setEditingGuideline] = useState<Guideline | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingGuideline) {
      setGuidelines((prev) =>
        prev.map((g) =>
          g.id === editingGuideline.id ? { ...g, title, content } : g
        )
      );
    } else {
      const newGuideline: Guideline = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setGuidelines((prev) => [...prev, newGuideline]);
    }

    resetForm();
  };

  const handleEdit = (guideline: Guideline) => {
    setEditingGuideline(guideline);
    setTitle(guideline.title);
    setContent(guideline.content);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setGuidelines((prev) => prev.filter((g) => g.id !== id));
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingGuideline(null);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Guidelines"
        description="Define custom coding standards for AI reviews"
      />

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Info Card */}
          <Card className="border-teal-500/20 bg-teal-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
                  <BookOpen className="h-5 w-5 text-teal-400" />
                </div>
                <div>
                  <p className="font-medium">Custom Guidelines</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your team's coding standards and best practices. The AI
                    will consider these guidelines during code reviews and
                    provide feedback based on your specific requirements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add New Button */}
          <Dialog
            open={isOpen}
            onOpenChange={(open) => {
              if (!open) resetForm();
              setIsOpen(open);
            }}
          >
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800">
                <Plus className="mr-2 h-4 w-4" />
                Add New Guideline
              </Button>
            </DialogTrigger>
            <DialogContent className="border-white/10 bg-background">
              <DialogHeader>
                <DialogTitle>
                  {editingGuideline ? "Edit Guideline" : "Add New Guideline"}
                </DialogTitle>
                <DialogDescription>
                  {editingGuideline
                    ? "Update your coding guideline."
                    : "Create a new coding guideline for the AI to follow during reviews."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Error Handling Standards"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Guideline Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe the coding standard or best practice..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="bg-white/5 border-white/10 resize-none"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-teal-600 to-teal-700"
                  disabled={!title.trim() || !content.trim()}
                >
                  {editingGuideline ? "Update" : "Add"} Guideline
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Guidelines List */}
          <div className="space-y-4">
            {guidelines.length === 0 ? (
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium">No guidelines yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your first guideline to customize AI reviews.
                  </p>
                </CardContent>
              </Card>
            ) : (
              guidelines.map((guideline) => (
                <Card key={guideline.id} className="border-white/10 bg-white/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20">
                          <CheckCircle className="h-4 w-4 text-teal-400" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {guideline.title}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            Added on {guideline.createdAt}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(guideline)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => handleDelete(guideline.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {guideline.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
