import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          categories(name),
          author:users(username)
        `,
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full">
              <Skeleton className="h-6 w-3/4 bg-secondary/20" />
              <Skeleton className="h-4 w-1/2 mt-2 bg-secondary/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-black text-white py-5 px-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-xl font-bold">Jim's Blog</h1>
          <Link to="/aboutme" className="text-white hover:text-primary">
            About Me
          </Link>
        </div>
      </header>
      
      <nav className="bg-muted border-b border-border">
        <div className="max-w-5xl mx-auto py-3 px-4">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-foreground hover:text-primary">Latest</a>
            <a href="#" className="text-foreground hover:text-primary">Popular</a>
            <a href="#" className="text-foreground hover:text-primary">Categories</a>
          </div>
        </div>
      </nav>
      
      <main className="container max-w-5xl mx-auto px-4 py-8">
        {posts?.map((post) => (
          <article key={post.post_id} className="mb-8 pb-8 border-b border-input">
            <h2 className="text-xl font-bold text-black mb-2">
              {post.title}
            </h2>
            <div className="text-xs text-secondary space-x-2 mb-4">
              <span>{post.author?.username}</span>
              <span>•</span>
              <span>
                {post.published_at
                  ? format(new Date(post.published_at), "MMM d, yyyy")
                  : "Draft"}
              </span>
              {post.categories && (
                <>
                  <span>•</span>
                  <a href="#" className="text-primary hover:underline">
                    {post.categories.name}
                  </a>
                </>
              )}
            </div>
            <p className="text-base text-foreground">
              {post.excerpt || post.content.slice(0, 150) + "..."}
            </p>
          </article>
        ))}
        {posts?.length === 0 && (
          <div className="text-center text-secondary py-8">
            No posts found. Check back later!
          </div>
        )}
      </main>

      <footer className="bg-muted py-6 px-4 text-center text-sm text-secondary">
        <div className="max-w-5xl mx-auto">
          <p>&copy; {new Date().getFullYear()} Jim's Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;