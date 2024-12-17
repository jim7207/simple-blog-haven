import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          categories(name),
          author:users(username)
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold text-center mb-8">Blog Haven</h1>
      <div className="space-y-6">
        {posts?.map((post) => (
          <Card key={post.post_id} className="w-full hover:shadow-lg transition-shadow border border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
                {post.categories && (
                  <span className="text-sm text-muted">
                    {post.categories.name}
                  </span>
                )}
              </div>
              <div className="flex gap-2 text-sm text-muted">
                <span>{post.author?.username}</span>
                <span>•</span>
                <span>
                  {post.published_at
                    ? format(new Date(post.published_at), "MMMM d, yyyy")
                    : "Draft"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted">
                {post.excerpt || post.content.slice(0, 150) + "..."}
              </p>
            </CardContent>
          </Card>
        ))}
        {posts?.length === 0 && (
          <div className="text-center text-muted py-12">
            No posts found. Check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;