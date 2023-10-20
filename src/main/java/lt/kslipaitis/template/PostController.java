package lt.kslipaitis.template;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Post> getPosts() throws InterruptedException {
        Thread.sleep(2000);
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable Long id) {
        return postRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createPost(@RequestBody Post post) throws URISyntaxException {
        Post savedPost = postRepository.save(post);
        return ResponseEntity.created(new URI("/posts/" + savedPost.getId())).body(savedPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity updatePost(@PathVariable Long id, @RequestBody Post post) {
        Post currentPost = postRepository.findById(id).orElseThrow(RuntimeException::new);
        currentPost.setAuthor(post.getAuthor());
        currentPost.setBody(post.getBody());
        currentPost = postRepository.save(post);

        return ResponseEntity.ok(currentPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}