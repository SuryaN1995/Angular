import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
    ngOnInit(){
        this.postService.getPosts()
        this.postSub = this.postService.getPostUpdatedListener()
        .subscribe((posts : Post[])=>{
            this.posts = posts
        })
    }

    ngOnDestroy(){
        this.postSub.unsubscribe()
    }

    
    
    onDelete(postId:String){
        this.postService.deletePost(postId)
    }

  posts : Post[] = []

  private postSub : Subscription ;

   constructor(public postService:PostService){}
}
