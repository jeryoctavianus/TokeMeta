import React, {Component} from 'react';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Meta from '../../../ethereum/metadata';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';

class AuthUser extends Component {
	state = {
		password: '',
		loading: false,
		errorMessage: ''
	};

	static async getInitialProps(props) {
		const {address} = props.query;
		const meta = Meta(props.query.address);

		const summary = await meta.methods.getSummary().call();

		return {address, manager: summary[6]};
	}

	onSubmit = async event => {
		event.preventDefault();

		this.setState({loading: true, errorMessage: ''});

		try {
			if (this.state.password==this.props.manager) {
				Router.pushRoute(`/metadatas/${this.props.address}/requests/manager`);
			}
			else if (this.state.password=='') {
				this.setState({errorMessage: 'It can not be empty'});
			}
			else {
				this.setState({errorMessage: 'Wrong manager verification'});
			}
		} catch (err) {
			this.setState({errorMessage: err.message});
		}

		this.setState({loading: false});
	};

	render() {
		return (
			<Layout>
				<h3>Authentication Required</h3>
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Verify that you are the metadata manager</label>
						<Input value={this.state.password} onChange={event => this.setState({password: event.target.value})} />
					</Form.Field>
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button primary loading={this.state.loading}>Continue</Button>
				</Form>
			</Layout>
		);
	}
}

export default AuthUser;
