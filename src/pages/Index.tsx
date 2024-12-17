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
      <div className="p-3">
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full">
              <Skeleton className="h-4 w-3/4 bg-secondary/20" />
              <Skeleton className="h-3 w-1/2 mt-1 bg-secondary/20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary px-3 py-1">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-white">Jim's Blog</h1>
          <Link to="/aboutme" className="text-white hover:underline">
            About Me
          </Link>
        </div>
      </header>
      
      <main className="px-3">
        {posts?.map((post) => (
          <article key={post.post_id} className="py-2 border-b border-secondary/20">
            <h2 className="text-lg leading-relaxed">
              {post.title}
            </h2>
            <div className="text-xs text-secondary space-x-1">
              <span>{post.author?.username}</span>
              <span>|</span>
              <span>
                {post.published_at
                  ? format(new Date(post.published_at), "MMM d, yyyy")
                  : "Draft"}
              </span>
              {post.categories && (
                <>
                  <span>|</span>
                  <span>{post.categories.name}</span>
                </>
              )}
            </div>
            <p className="text-base text-secondary mt-1">
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
    </div>
  );
};

export default Index;