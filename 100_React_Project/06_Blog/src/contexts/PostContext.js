import { useContext, useState } from "react";
import { faker } from "@faker-js/faker";
import { createContext } from "react";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	function createRandomPost() {
		return {
			title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
			body: faker.hacker.phrase(),
		};
	}

	const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()));
	const [searchQuery, setSearchQuery] = useState("");

	const searchedPosts =
		searchQuery.length > 0 ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())) : posts;

	function handleAddPost(post) {
		setPosts((posts) => [post, ...posts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}
	return (
		<PostContext.Provider
			value={{
				posts: searchedPosts,
				onClearPosts: handleClearPosts,
				searchQuery: searchQuery,
				setSearchQuery: setSearchQuery,
				onAddPost: handleAddPost,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

function usePost() {
	const usePost = useContext(PostContext);
	return usePost;
}
export { PostContextProvider, PostContext, usePost };
