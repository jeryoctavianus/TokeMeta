import React, {Component} from 'react';
import {Card, Button} from 'semantic-ui-react';
import center from '../ethereum/center';
import Layout from '../components/Layout';
import {Link} from '../routes';

class MetaIndex extends Component {
	static async getInitialProps() {
		const metas = await center.methods.getDeployedMeta().call();

		return {metas};
	}
	
	renderMetas() {
		const items = this.props.metas.map(address => {
			return {
				header: address,
				description: (
					<Link route={`/metadatas/${address}`}>
						<a>View Metadata</a>
					</Link>
				),
				style: {overflowWrap: 'break-word'},
				fluid: true
			};
		});

		return <Card.Group items={items} />;
	}
	
	render() {
		return (
			<Layout>
				<div>
					<h3>List of Song Metadata</h3>

					<Link route="/metadatas/new">
						<a>
							<Button floated="right" content="Create Metadata" icon="add" primary />
						</a>
					</Link>

					{this.renderMetas()}
				</div>
			</Layout>
		);
	}
}

export default MetaIndex;
