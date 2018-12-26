import { Component } from '@angular/core';
import {Post} from './posts/post.model'
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts : Post[]= []

  onPostAdded(post){
    this.posts.push(post)
  }
}
