import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit{

    ngOnInit(){
        this.route.paramMap.subscribe((param:ParamMap)=>{
            if(param.has('postId')){
                this.mode = 'edit'
                this.postId = param.get('postId')
                this.post = this.postService.getPost(this.postId)
            }else{
                this.mode = 'create'
                this.postId = null
            }
        })
    }

    private mode = 'create'
    private postId:String
    post : Post

    constructor(public postService:PostService, public route : ActivatedRoute){}

    onSendClick(form: NgForm) {
        if (form.invalid) {
            return
        }
        if(this.mode =='create'){
            this.postService.addPost(form.value.title,form.value.content)
        }else{
            this.postService.updatePost(this.postId,form.value.title,form.value.content)
        }
        
        form.resetForm()

    }
}