import { useState } from "react";
const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}

const App = () => {
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [friends, setFriends] = useState(initialFriends);
	const [selectedfriend, setSelectedfriend] = useState(null);

	function handleAddFriend(friend) {
		setFriends((friends) => [...friends, friend]);
	}

	function handleShowFriend() {
		setShowAddFriend((show) => !show);
	}

	function handleSelectFriend(friend) {
		setSelectedfriend((currentFriend) => (currentFriend?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	}

	function handleAmount(value) {
		console.log(value);
		setFriends((friends) => friends.map((friend) => (selectedfriend.id === friend.id ? { ...friend, balance: friend.balance + value } : friend)));
	}
	return (
		<div className="app">
			<div className="sidebar">
				<FriendList friends={friends} onSelect={handleSelectFriend} selectedfriend={selectedfriend} />
				{showAddFriend && <FriendaddForm addFriend={handleAddFriend} />}
				<Button onClick={handleShowFriend}>{!showAddFriend ? "Add Friend" : "Close"}</Button>
			</div>
			{selectedfriend && <FormSplitBill friendDetails={selectedfriend} handleAmount={handleAmount} />}
		</div>
	);
};

function FriendList({ friends, onSelect, selectedfriend }) {
	return (
		<ul>
			{friends.map((friend, index) => (
				<Friend friend={friend} key={index} onSelect={onSelect} selectedfriend={selectedfriend} />
			))}
		</ul>
	);
}

function Friend({ friend, onSelect, selectedfriend }) {
	const isSelected = friend.id === selectedfriend?.id;
	return (
		<li className={isSelected ? "selected" : ""}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>
			{friend.balance < 0 && (
				<p className="red">
					Avan Thranum {friend.name} {Math.abs(friend.balance)}$
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} Nan Kodukanum {Math.abs(friend.balance)}$
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} Even</p>}
			<Button onClick={() => onSelect(friend)}>{!isSelected ? "Select" : "Close"}</Button>
		</li>
	);
}

function FriendaddForm({ addFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");
	function handleSubmit(e) {
		e.preventDefault();

		const id = crypto.randomUUID();
		const newFriend = {
			name,
			image: `${image}?u=${id}`,
			balance: 0,
			id,
		};

		setName("");
		setImage("https://i.pravatar.cc/48");
		addFriend(newFriend);
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label htmlFor="F_Name"> Friend Name </label>
			<input type="text" id="F_Name" value={name} onChange={(e) => setName(e.target.value)} />

			<label htmlFor="F_Img">image Url</label>
			<input type="text" id="F_Img" value={image} onChange={(e) => setImage(e.target.value)} />
			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({ friendDetails, handleAmount }) {
	const [bill, setBill] = useState("");
	const [userExpence, setUserExpence] = useState("");
	let friendExpence = bill ? bill - userExpence : "";
	const [whoPay, setwhoPay] = useState("user");

	function handleAmounts(e) {
		e.preventDefault();
		console.log(whoPay);
		if (!bill || !userExpence) return;
		const amount = whoPay === "user" ? -friendExpence : userExpence;
		handleAmount(amount);
	}

	return (
		<form className="form-split-bill" onSubmit={handleAmounts}>
			<h2>Split The Bill With {friendDetails.name}</h2>

			<label>Bill Value</label>
			<input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

			<label>Your Expense</label>
			<input type="text" value={userExpence} onChange={(e) => setUserExpence(Number(e.target.value) > bill ? userExpence : Number(e.target.value))} />

			<label>{friendDetails.name} Value</label>
			<input type="text" disabled value={friendExpence} />

			<label>Who Is Paying The Bill</label>
			<select value={whoPay} onChange={(e) => setwhoPay(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{friendDetails.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}

export default App;
