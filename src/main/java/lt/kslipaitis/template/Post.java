package lt.kslipaitis.template;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "post")
@Data
public class Post {

    @Id
    @GeneratedValue
    private Long id;

    private String author;
    private String body;
}