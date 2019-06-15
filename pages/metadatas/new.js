import React, {Component} from 'react';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import center from '../../ethereum/center';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class MetaNew extends Component {
	state = {
		title: '',
		artist: '',
		genre: '',
		linkAudio: '',
		linkCover: '',
		moreInfo: '',
		errorMessage: '',
		loading: false
	};

	onSubmit = async event => {
		event.preventDefault(); //keep the browser from attampting to submit the form
		
		this.setState({loading: true, errorMessage: ''});

		try {
			if (this.state.title!='' && this.state.artist!='' && this.state.genre!='' && this.state.linkAudio!='' && this.state.linkCover!='') {
				const accounts = await web3.eth.getAccounts();
				await center.methods.createMeta(this.state.title, this.state.artist, this.state.genre, this.state.linkAudio, this.state.linkCover, this.state.moreInfo).send({from: accounts[0]});

				Router.pushRoute('/');
			}
			else {
				this.setState({errorMessage: 'Form can not be empty'});
			}
		} catch (err) {
			this.setState({errorMessage: err.message});
		}

		this.setState({loading: false});
	};

	render() {
		return (
			<Layout>			
				<h3>Create a Song Metadata</h3>
				
				<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Title</label>
						<Input placeholder='Song Title' value={this.state.title} onChange={event => this.setState({title: event.target.value})} />
					</Form.Field>

					<Form.Field>
						<label>Artist</label>
						<Input placeholder='Artist Name' value={this.state.artist} onChange={event => this.setState({artist: event.target.value})} />
					</Form.Field>

					<Form.Field>
						<label>Genre</label>
						<Input placeholder='Song Genre' value={this.state.genre} onChange={event => this.setState({genre: event.target.value})} />
					</Form.Field>

					<Form.Field>
						<label>Audio Link</label>
						<Input placeholder='Link of Song Audio' value={this.state.linkAudio} onChange={event => this.setState({linkAudio: event.target.value})} />
					</Form.Field>

					<Form.Field>
						<label>Cover Link</label>
						<Input placeholder='Link of Song Cover Picture' value={this.state.linkCover} onChange={event => this.setState({linkCover: event.target.value})} />
					</Form.Field>

					<Form.Field>
						<label>More</label>
						<Input placeholder='Additional Information (optional)' value={this.state.moreInfo} onChange={event => this.setState({moreInfo: event.target.value})} />
					</Form.Field>
					
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Button loading={this.state.loading} primary>Create</Button>
				</Form>
			</Layout>
		);
	}
}

export default MetaNew;
