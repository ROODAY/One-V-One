import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InfiniteScroll from 'react-infinite-scroller'
import BattleCard from './BattleCard'

function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

class BattleScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      battles: ["first"],
      hasMoreItems: true,
      nextHref: null
    };
  }

  loadItems(page) {
    const self = this;
    var battles = this.state.battles;
    for (var i = 0; i < 10; i++) {
      battles.push(makeid(6))
    }
    setTimeout(function(){
      if (battles.length < 100) {
        self.setState({ battles });
      } else {
        self.setState({ battles, hasMoreItems: false});
      }
    }, 750);
  }

  render() {
    const loader = <div key="loader">Loading...</div>;
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                <div className="battles">
                    {this.state.battles.map((battle, i) => <BattleCard key={i} battleId={battle}/>)}
                </div>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BattleScroller;
