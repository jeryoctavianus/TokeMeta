import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../../routes';
import Layout from '../../../../components/Layout';
import Meta from '../../../../ethereum/metadata';
import RequestRow from '../../../../components/RequestRow';

class RequestIndex extends Component {
	static async getInitialProps(props) {
		const {address} = props.query;
		const meta = Meta(address);
		const requestCount = await meta.methods.getRequestsCount().call();
		const requests = await Promise.all (
					Array(parseInt(requestCount)).fill().map((element, index) => {
						return meta.methods.requests(index).call()
					})
				);

		return {address, requests, requestCount};
	}

	renderRows() {
		return this.props.requests.map((request, index) => {
			return (
				<RequestRow key={index} id={index} request={request} address={this.props.address} />
			);
		});
	}
	
	render() {
		const {Header, Row, HeaderCell, Body} = Table;

		return (
			<Layout>
				<h3>Requests</h3>
				<Link route={`/metadatas/${this.props.address}/requests/new`}>
					<a>
						<Button primary floated="right" style={{marginBottom:10}}>Add Request</Button>
					</a>
				</Link>
				<Table>
					<Header>
						<Row>
							<HeaderCell>ID</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Sender Address</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
						</Row>
					</Header>
					<Body>
						{this.renderRows()}
					</Body>
				</Table>
				<div>
					Found {this.props.requestCount} request(s).
				</div>
			</Layout>
		);
	}
}

export default RequestIndex;
