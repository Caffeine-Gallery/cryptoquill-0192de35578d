import Int "mo:base/Int";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";

actor {
  public type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  stable var posts : List.List<Post> = List.nil();

  public func createPost(title: Text, body: Text, author: Text) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := List.push(newPost, posts);
  };

  public query func getPosts() : async [Post] {
    List.toArray(posts)
  };
}
