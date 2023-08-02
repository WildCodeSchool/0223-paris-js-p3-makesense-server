-- MySQL Script generated by MySQL Workbench
-- Mon Jul 31 12:09:55 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema makesense
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `makesense` ;

-- -----------------------------------------------------
-- Schema makesense
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `makesense` DEFAULT CHARACTER SET utf8 ;
USE `makesense` ;

-- -----------------------------------------------------
-- Table `makesense`.`job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`job` ;

CREATE TABLE IF NOT EXISTS `makesense`.`job` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `makesense`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`role` ;

CREATE TABLE IF NOT EXISTS `makesense`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `makesense`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`user` ;

CREATE TABLE IF NOT EXISTS `makesense`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `avatar` LONGTEXT NOT NULL,
  `affiliated_site` VARCHAR(45) NULL,
  `tel` VARCHAR(45) NULL,
  `job_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `admin` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_job`
    FOREIGN KEY (`job_id`)
    REFERENCES `makesense`.`job` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `makesense`.`role` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_user_job_idx` ON `makesense`.`user` (`job_id` ASC) VISIBLE;

CREATE INDEX `fk_user_role1_idx` ON `makesense`.`user` (`role_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `makesense`.`post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`post` ;

CREATE TABLE IF NOT EXISTS `makesense`.`post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `createdDate` DATETIME NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `profit` LONGTEXT NOT NULL,
  `risk` LONGTEXT NOT NULL,
  `avatar` LONGTEXT NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `impact` LONGTEXT NOT NULL,
  `deadlineDate` DATETIME NOT NULL,
  `makeDecisionDate` DATETIME NOT NULL,
  `conflitDate` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `makesense`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_post_user1_idx` ON `makesense`.`post` (`user_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `makesense`.`user_post_avis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`user_post_avis` ;

CREATE TABLE IF NOT EXISTS `makesense`.`user_post_avis` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `text` LONGTEXT NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_post_avis_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `makesense`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_post_avis_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `makesense`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_user_post_avis_user1_idx` ON `makesense`.`user_post_avis` (`user_id` ASC) VISIBLE;

CREATE INDEX `fk_user_post_avis_post1_idx` ON `makesense`.`user_post_avis` (`post_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `makesense`.`user_post_vote`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`user_post_vote` ;

CREATE TABLE IF NOT EXISTS `makesense`.`user_post_vote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `vote` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_post_vote_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `makesense`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_post_vote_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `makesense`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_user_post_vote_user1_idx` ON `makesense`.`user_post_vote` (`user_id` ASC) VISIBLE;

CREATE INDEX `fk_user_post_vote_post1_idx` ON `makesense`.`user_post_vote` (`post_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `makesense`.`user_participant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`user_participant` ;

CREATE TABLE IF NOT EXISTS `makesense`.`user_participant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  `expert` TINYINT NOT NULL,
  `impacted` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_participant_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `makesense`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_participant_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `makesense`.`post` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_user_participant_user1_idx` ON `makesense`.`user_participant` (`user_id` ASC) VISIBLE;

CREATE INDEX `fk_user_participant_post1_idx` ON `makesense`.`user_participant` (`post_id` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `makesense`.`alert`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`alert` ;

CREATE TABLE IF NOT EXISTS `makesense`.`alert` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `makesense`.`user_alert`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `makesense`.`user_alert` ;

CREATE TABLE IF NOT EXISTS `makesense`.`user_alert` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alert_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_alert_alert1`
    FOREIGN KEY (`alert_id`)
    REFERENCES `makesense`.`alert` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_alert_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `makesense`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_user_alert_alert1_idx` ON `makesense`.`user_alert` (`alert_id` ASC) VISIBLE;

CREATE INDEX `fk_user_alert_user1_idx` ON `makesense`.`user_alert` (`user_id` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
