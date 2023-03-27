import { useEffect } from "react";
import { supabase } from "../utils/supabase";

export async function getServerSideProps({ params }) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, comments(*)")
    .eq("id", params.id)
    .single();
  if (error) throw new Error(error);
  return {
    props: {
      post: post,
    },
  };
}

export default function Post({ post }) {
  useEffect(() => {
    supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        payload => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();
    // return () => supabase.removeAllChannels();
  }, []);

  function createComment() {
    supabase
      .from("comments")
      .insert({ post_id: 2, content: "banana" })
      .then(({ data, error }) => {
        if (error) throw error;
        console.log("Comment created!", data);
      });
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={createComment}>Create comment</button>
      <pre>{JSON.stringify(post.comments, null, 2)}</pre>
    </div>
  );
}
