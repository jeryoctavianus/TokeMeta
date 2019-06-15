import React, {Component} from 'react';
import {Card, Icon, Image, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Meta from '../../ethereum/metadata';
import {Link} from '../../routes';

class MetaShow extends Component {
	static async getInitialProps(props) {
		const meta = Meta(props.query.address);

		const summary = await meta.methods.getSummary().call();

		return {
			address: props.query.address,
			title: summary[0],
			artist: summary[1],
			genre: summary[2],
			linkAudio: summary[3],
			linkCover: summary[4],
			moreInfo: summary[5],
			manager: summary[6]
		};
	}

	renderCards() {
		const {
			title,
			artist,
			genre,
			linkAudio,
			linkCover,
			moreInfo,
			manager
		} = this.props;

		const items = [
			{
				header: title,
				description: 'Song Title',
				style: {overflowWrap: 'break-word'}
			},
			{
				header: artist,
				description: 'Artist Name',
				style: {overflowWrap: 'break-word'}
			},
			{
				header: genre,
				description: 'Song Genre',
				style: {overflowWrap: 'break-word'}
			},
			{
				header: moreInfo,
				description: 'Additional Information',
				style: {overflowWrap: 'break-word'}
			},
			{
				meta: linkAudio,
				description: 'Link of Song Audio',
				style: {overflowWrap: 'break-word'}
			}
/*			{
				meta: manager,
				description: 'Address of Metadata Creator',
				style: {overflowWrap: 'break-word'}
			}
*/
		];

		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<h3>Song Metadata Detail</h3>
				<Grid>
					<Grid.Row>
						<Grid.Column width={5}>
							<Card>
								<Image src={this.props.linkCover} />
							</Card>
						</Grid.Column>
						<Grid.Column width={10}>{this.renderCards()}</Grid.Column>
					</Grid.Row>

					<Grid.Row>
						<Grid.Column>
							<Link route={`/metadatas/${this.props.address}/requests`}>
								<a>
									<Button primary floated="right">View Requests</Button>
								</a>
							</Link>
							<Link route={`/metadatas/${this.props.address}/requests/new`}>
								<a>
									<Button primary floated="right">Add Request</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}

export default MetaShow;
