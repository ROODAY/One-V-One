import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InfiniteScroll from 'react-infinite-scroller'
import PostCard from './PostCard'
import { withFirebase } from '../Firebase';

class PostScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      hasMoreItems: true,
      nextHref: null
    };
  }

  loadItems(page) {
    this.props.firebase.posts().on('value', snapshot => {
      var posts = Object.values(snapshot.val());
      this.setState({ posts, hasMoreItems: false});
    });
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
                <div className="posts">
                  {this.state.posts.map((post, i) => {
                    return <PostCard key={i} user={post.username} title={post.title} description={post.description} audioURL={post.audioPath}/>
                  })}
                </div>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withFirebase(PostScroller);