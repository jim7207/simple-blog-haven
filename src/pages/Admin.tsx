import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (!session) {
      navigate("/admin/login");
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create posts",
        variant: "destructive",
      });
      return;
    }

    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const { error } = await supabase.from("posts").insert({
        title,
        content,
        slug,
        status: isPublished ? "published" : "draft",
        author_id: session.user.id,
        published_at: isPublished ? new Date().toISOString() : null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      setTitle("");
      setContent("");
      setIsPublished(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Create New Post</h1>
        <Button variant="outline" onClick={() => navigate("/")}>
          View Blog
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write your post content"
            className="min-h-[300px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="published"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <Label htmlFor="published">Publish immediately</Label>
        </div>

        <Button type="submit" className="w-full">
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default Admin;