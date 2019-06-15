import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Meta from '../ethereum/metadata';
import {Link} from '../routes';

class RequestRow extends Component {
	onApprove = async () => {
		const meta = Meta(this.props.address);
		const accounts = await web3.eth.getAccounts();
		await meta.methods.approveRequest(this.props.id).send({
			from: accounts[0]
		});
	};

	render() {
		const {Row, Cell} = Table;
		const {id, request} = this.props;

		return (
			<Row positive={request.approveStatus} negative={!request.approveStatus}>
				<Cell>{id}</Cell>
				<Cell>{request.description}</Cell>
				<Cell>{request.sender}</Cell>
				<Cell>
					{request.approveStatus ? null : (
						<Link route={`/metadatas/${this.props.address}/requests/manager`}>
							<a>
								<Button color="green" basic onClick={this.onApprove}>Approve</Button>
							</a>
						</Link>
					)}
				</Cell>
			</Row>
		);
	}
}

export default RequestRow;
