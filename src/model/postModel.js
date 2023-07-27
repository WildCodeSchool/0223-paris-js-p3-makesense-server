const db = require("../config/db");

const findAll = () => {
  return db
    .query(
      "select post.*, user.lastname, user.firstname ,user.avatar as photo from post join user on post.user_id = user.id"
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const countAll = () => {
    return db
        .query("select COUNT(*) as count from post")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const findPostFromUser = (id) => {
    return db
        .execute("select post.*, user.avatar as photo, user.lastname, user.firstname from post inner join user on post.user_id = user.id where post.user_id = ?", [id])
        .then(([data]) => {
            return data;
        });
    }

const createPost = (post) => {
  const {
    title,
    description,
    createdDate,
    status,
    profit,
    risk,
    avatar,
    user_id,
    location,
    impact,
    deadlineDate,
    makeDecisionDate,
    conflitDate,
  } = post;

  const formatedDeadlineDate = new Date(deadlineDate);
  const formatedMakeDecisionDate = new Date(makeDecisionDate);
  const formatedConflitDate = new Date(conflitDate);

  return db
    .execute(
      "insert into post (title, description, createdDate, status, profit, risk, avatar, user_id, location, impact, deadlineDate, makeDecisionDate, conflitDate) values (?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?)",
      [
        title,
        description,
        createdDate,
        status,
        profit,
        risk,
        avatar,
        user_id,
        location,
        impact,
        formatedDeadlineDate,
        formatedMakeDecisionDate,
        formatedConflitDate,
      ]
    )
    .then(([data]) => {
      return { id: data.insertId, ...post };
    })
    .catch((err) => {
      console.error("error", err);
      return err;
    });
};

const removePost = (id) => {
  return db
    .execute("delete from post where id = ?", [id])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const modifyPost = (post, id) => {
  return db
    .query("update post set ? where id = ?", [post, id])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findOnePost = (id) => {
  return db
    .execute(
      "select post.*, user.lastname, user.firstname, user.avatar as photo from post join user on post.user_id = user.id where post.id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const createVote = (addVote) => {
  const { user_id, post_id, vote } = addVote;

  return db
    .execute("insert into user_post_vote (user_id, post_id, vote) values (?, ?, ?)", [user_id, post_id, vote])
    .then(([data]) => {
      return { id: data.insertId, ...addVote };
    })
    .catch((err) => {
      console.error("error", err);
      return err;
    });
};

const selecIdVote = (userId, postId) => {
  return db
  .execute("SELECT id FROM user_post_vote WHERE user_id = ? AND post_id = ?", [userId, postId])
  .then(([data])=> {
    return data;
  })
  .catch((err) => {
    console.error("error", err);
    return err;
  });
}

const removeVote = (userId, postId) => {
  return db
  .execute("DELETE FROM user_post_vote WHERE user_id = ? AND post_id = ?", [userId, postId])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("error", err);
      return err;
    });
};

const findVoteFromPost = (id) => {
  return db
    .execute(
      "select u.firstname, u.lastname, upv.vote, upv.user_id from user as u inner join user_post_vote as upv on u.id = upv.user_id where post_id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findVoteFromUser = (id) => {
  return db
    .execute(
      "select p.title, upv.vote from post as p inner join user_post_vote as upv on p.id = upv.post_id where upv.user_id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const followVoteFromUser = (id) => {
  return db
    .execute("select p.*, upv.vote, u.firstname, u.lastname, u.avatar as photo from post as p inner join user_post_vote as upv on p.id = upv.post_id inner join (select id, firstname, lastname, avatar from user)as u on p.user_id = u.id where upv.user_id = ?", [id])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findVoteFromUserFromPostId = (id) => {
  return db
    .execute(
      "select upv.vote, p.id as post_id from post as p join user_post_vote as upv on p.id = upv.post_id join user as u on upv.user_id = u.id where u.id = ?",
      [id]
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findCountVote = (vote) => {
  return db
    .execute("select count(vote) from user_post_vote where vote = ?", [vote])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findCountAllVoteFromPost = (vote) => {
  return db
    .execute("select post_id, count(vote) from user_post_vote where vote = ? group by post_id;", [vote])
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findCountPositiveAndNegativeVote = (postId) => {
  return db
    .execute(
      "SELECT COUNT(*) AS total_votes, SUM(vote = 1) AS positive_vote, SUM(vote = 0) AS negative_vote FROM user_post_vote WHERE post_id = ?;",
      [postId]
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findExpertFromPost = (postId) => {
  return db
    .execute(
      "select u.firstname, u.lastname, u.avatar from user as u join user_participant as up on u.id = up.user_id join post as p on p.id = up.post_id where post_id= ? and expert= 1;",
      [postId]
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const findImpactedFromPost = (postId) => {
  return db
    .execute(
      "select u.firstname, u.lastname, u.avatar from user as u join user_participant as up on u.id = up.user_id join post as p on p.id = up.post_id where post_id= ? and impacted= 1;",
      [postId]
    )
    .then(([data]) => {
      return data;
    })
    .catch((err) => {
      console.error("Error ", err);
      return err;
    });
};

const createUserParticipant = (participant) => {
  const { user_id, post_id, expert, impacted } = participant;

  return db
    .execute("insert into user_participant (user_id, post_id, expert, impacted) values (?, ?, ?, ?)", [
      user_id,
      post_id,
      expert,
      impacted,
    ])
    .then(([data]) => {
      return { id: data.insertId, ...participant };
    })
    .catch((err) => {
      console.error("error", err);
      return err;
    });
};

module.exports = { findAll, findOnePost, findPostFromUser, createPost, removePost, modifyPost, createVote, removeVote, findVoteFromPost, findVoteFromUser, findCountVote, findCountAllVoteFromPost,findCountPositiveAndNegativeVote,findExpertFromPost,findImpactedFromPost, createUserParticipant, countAll, findVoteFromUserFromPostId, selecIdVote, findPostFromUser, followVoteFromUser};

