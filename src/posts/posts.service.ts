import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService
  ) {}
  async createPost(post: CreatePostDto) {
    const userFound = this.usersService.getUser(post.authorId);

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  getPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }
}
