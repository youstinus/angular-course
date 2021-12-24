import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Title } from '@angular/platform-browser';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() { }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService
      .createPost(postData)
      .then(res => { }, err => { });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService
      .getPosts()
      .subscribe(res => {
        //console.log('wa')
        this.isFetching = false;
        this.loadedPosts = res.docs.map(x => {
          return { ...x.data(), id: x.id }
        })
      }, error => { // error not occur when no collection
        console.log(error)
        this.isFetching = false
      }
      )
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts(this.loadedPosts)
  }
}
