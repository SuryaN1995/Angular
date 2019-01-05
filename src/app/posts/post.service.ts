import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
    private posts: Post[] = []
    private postUpdated = new Subject<Post[]>()

    constructor(private httpClient: HttpClient) { }

    getPosts() {
        this.httpClient.get<{ message: String, posts: any }>('http://localhost:3000/posts')
            .pipe(map((posts) => {
                return posts.posts.map(post => {
                    let postMap: Post = { id: post._id, title: post.title, content: post.content }
                    return postMap
                })
            }))
            .subscribe((postData) => {
                this.posts = postData
                this.postUpdated.next([...this.posts])
            })
    }

    getPostUpdatedListener() {
        return this.postUpdated.asObservable()
    }

    getPost(postId:String){
        return {...this.posts.find(p=> p.id === postId)}
    }

    updatePost(id:String, title:String,content:String ){
        const post : Post = {id:id,title:title,content:content}
        this.httpClient.patch('http://localhost:3000/posts' + id,post)
        .subscribe((response)=>{
                console.log(response)
        })
    }

    deletePost(postId: String) {
        this.httpClient.delete('http://localhost:3000/posts' + postId)
            .subscribe(() => {
                const updateList = this.posts.filter(post => postId !== post.id)
                this.posts = updateList
                this.postUpdated.next([...this.posts])
            })
    }

    addPost(title: String, content: String) {
        let post: Post = { id: null, title: title, content: content }
        this.httpClient.post<{ message: String, postId: String }>('http://localhost:3000/posts', post)
            .subscribe((data) => {
                console.log(data.message)
                post.id = data.postId
                this.posts.push(post)
                this.postUpdated.next([...this.posts])
            })
    }

}