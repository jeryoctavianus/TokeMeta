pragma solidity ^0.4.21;

contract MetaCenter{
	address[] public deployedMeta;
	
	function createMeta(string title, string artist, string genre, string linkAudio, string linkCover, string moreInfo) public {
		address newMeta = new Meta(msg.sender, title, artist, genre, linkAudio, linkCover, moreInfo);
		deployedMeta.push(newMeta);
	}
	
	function getDeployedMeta() public view returns (address[]) {
		return deployedMeta;
	}	
}

contract Meta{
	struct Request{
		string description;
		address sender;
		bool approveStatus;
	}
	
	Request[] public requests;
	string public title;
	string public artist;
	string public genre;
	string public linkAudio;
	string public linkCover;
	string public moreInfo;
	address public manager;
	mapping(address=>bool) public contributors;
	address[] public contributorList;
	
	modifier restricted(){
		require(msg.sender==manager);
		_;
	}
	
	function Meta(address creator, string judul, string penyanyi, string jenis, string link1, string link2, string infoLain) public{
		manager=creator;
		title=judul;
		artist=penyanyi;
		genre=jenis;
		linkAudio=link1;
		linkCover=link2;
		moreInfo=infoLain;
	}
	
	function createRequest(string description) public{
		Request memory newRequest=Request({
			description: description,
			sender: msg.sender,
			approveStatus: false
		});
		
		requests.push(newRequest);
		
		if (!contributors[msg.sender]) {
			contributorList.push(msg.sender);
			contributors[msg.sender] = true;
		}
	}
	
	function approveRequest(uint index) public restricted {
		requests[index].approveStatus=true;
	}

	function getRequestsCount() public view returns(uint) {
		return requests.length;
	}
	
	function getSummary() public view returns (string, string, string, string, string, string, address) {
		return (
			title,
			artist,
			genre,
			linkAudio,
			linkCover,
			moreInfo,
			manager
		);
	}
}
