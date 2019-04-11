import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller'

import { withFirebase } from '../../Firebase';
import PostCard from './PostCard'

class PostScroller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      postScores: {},
      hasMoreItems: true,
      nextHref: null
    };
  }

  loadItems(page) {
    this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on('value', snapshot => {
      this.setState({
        postScores: snapshot.val().postScores || {}
      });

      this.props.firebase.posts().on('value', snapshot => {
        var posts = [];
        if (snapshot.val()) {
          posts = Object.values(snapshot.val())
                  .filter(post => post.genre === this.props.genre)
                  .sort((a, b) => (a.hotness > b.hotness) ? 1 : -1);
        }

        this.setState({posts});
      });
    })
    this.setState({ hasMoreItems: false});
  }

  render() {
    const loader = <div key="loader">Loading...</div>;
    return (
      <Container>
        <Row className="justify-content-center">
          <Col>
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                <div className="posts">
                  {this.state.posts.map((post, i) => {
                    return (
                      <PostCard 
                      key={i} 
                      id={post.id} 
                      user={post.username} 
                      title={post.title} 
                      description={post.description} 
                      listens={post.listens} 
                      rank={post.hotness || (i + 1)}
                      rating={post.rating || 0} 
                      userRating={this.state.postScores[post.id] ? this.state.postScores[post.id].value : 0}
                      genre={post.genre}
                      userId={post.userId}
                      currentUserId={this.props.firebase.auth.currentUser.uid}
                      timestamp={new Date(post.timestamp)}
                      audioURL={post.audioPath}/>
                    )
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