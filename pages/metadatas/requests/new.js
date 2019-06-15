import React, {Component} from 'react';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Meta from '../../../ethereum/metadata';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
	state = {
		description: '',
		loading: false,
		errorMessage: ''
	};

	static async getInitialProps(props) {
		const {address} = props.query;

		return {address};
	}

	onSubmit = async event => {
		event.preventDefault();
		const meta = Meta(this.props.address);
		const {description} = this.state;

		this.setState({loading: true, errorMessage: ''});

		try {
			if (this.state.description!='') {
				const accounts = await web3.eth.getAccounts();
				await meta.methods.createRequest(description).send({from: accounts[0]});

				Router.pushRoute(`/metadatas/${this.props.address}`);
			}
			else {
				this.setState({errorMessage: 'It can not be empty'});
			}
		} catch (err) {
			this.setState({errorMessage: err.message});
		}

		this.setState({loading: false});
	};

	render() {
		return (
			<Layout>
				<h3>Create a Request</h3>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Description</label>
						<Input value={this.state.description} onChange={event => this.setState({description: event.target.value})} />
					</Form.Field>
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button primary loading={this.state.loading}>Create</Button>
				</Form>
			</Layout>
		);
	}
}

export default RequestNew;
