import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient, private firestore: AngularFirestore) { }
    createPost(postData: { title: string; content: string }) {
        return this.firestore
            .collection("guide-18")
            .add(postData);
    }

    getPosts() {
        return this.firestore
            .collection("guide-18")
            .get()
            ;
    }

    deletePosts(posts) {
        for (let item of posts){this.firestore
        .collection("guide-18").doc(item.id).delete();
        }
    }
}