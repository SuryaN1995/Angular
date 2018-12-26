import { Post } from './../post.model';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent {

    @Output() postEvent = new EventEmitter<Post>()

    onSendClick(form: NgForm) {
        if (form.invalid) {
            return
        }
        const post: Post = {
            title: form.value.title,
            content: form.value.content
        }
        this.postEvent.emit(post)
    }
}