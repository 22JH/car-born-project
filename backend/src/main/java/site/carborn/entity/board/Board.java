package site.carborn.entity.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_BOARD")
@Getter
@Setter
@NoArgsConstructor
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 200)
    private String title;

    private String content;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
